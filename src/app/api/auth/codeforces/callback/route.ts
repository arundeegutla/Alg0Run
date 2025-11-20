import { NextRequest, NextResponse } from 'next/server';
import { getConfig, getSession, clientConfig } from '@/server/codeforces/lib';
import { headers } from 'next/headers';
import * as client from 'openid-client';
import { admin } from '@/server/trpc/util/db'; // <-- add this

export async function GET(req: NextRequest) {
  const session = await getSession();
  console.log('Session in callback:', session);

  const openIdClientConfig = await getConfig();
  const headerList = await headers(); // no need for await

  const host =
    headerList.get('x-forwarded-host') || headerList.get('host') || 'localhost';

  const protocol = headerList.get('x-forwarded-proto') || 'https';

  const currentUrl = new URL(
    `${protocol}://${host}${req.nextUrl.pathname}${req.nextUrl.search}`
  );

  const tokenSet = await client.authorizationCodeGrant(
    openIdClientConfig,
    currentUrl,
    {
      pkceCodeVerifier: session.code_verifier,
      expectedState: session.state,
    }
  );

  const { access_token } = tokenSet;
  const claims = tokenSet.claims()!;

  console.log('Codeforces Claims:', claims);

  const handle = claims.handle as string;
  const avatar = claims.avatar as string;
  const rating = claims.rating as number;

  // -------- Firebase user + custom token ----------

  // Use a deterministic uid for Codeforces users
  const uid = `codeforces:${handle}`;

  try {
    await admin.auth().getUser(uid);
  } catch (err: unknown) {
    if (
      typeof err === 'object' &&
      err !== null &&
      'code' in err &&
      (err as { code?: string }).code === 'auth/user-not-found'
    ) {
      await admin.auth().createUser({
        uid,
        displayName: handle,
        photoURL: avatar,
      });
    } else {
      throw err;
    }
  }

  // Optional: pass some Codeforces info as custom claims
  const customToken = await admin.auth().createCustomToken(uid, {
    codeforcesHandle: handle,
    codeforcesRating: rating,
  });

  // -------- Keep your existing session if you still want it ----------
  session.isLoggedIn = true;
  session.access_token = access_token;
  session.userInfo = {
    sub: claims.sub,
    handle,
    avatar,
    rating,
  };

  await session.save();

  // -------- Redirect back to client with Firebase custom token --------
  const redirectUrl = new URL(
    clientConfig.post_login_route,
    `${protocol}://${host}`
  );
  redirectUrl.searchParams.set('token', customToken);

  return NextResponse.redirect(redirectUrl.toString());
}
