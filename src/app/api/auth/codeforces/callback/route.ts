import { NextRequest, NextResponse } from 'next/server';
import { getConfig, getSession, clientConfig } from '@/server/codeforces/lib';
import { headers } from 'next/headers';
import * as client from 'openid-client';
import { admin } from '@/server/trpc/util/db';

export async function GET(req: NextRequest) {
  const session = await getSession();
  console.log('Session in callback:', session);

  const openIdClientConfig = await getConfig();
  const headerList = await headers();

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

  const claims = tokenSet.claims()!;

  console.log('Codeforces Claims:', claims);

  const handle = claims.handle as string;
  const avatar = claims.avatar as string;

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

  const customToken = await admin.auth().createCustomToken(uid);

  const redirectUrl = new URL(
    clientConfig.post_login_route,
    `${protocol}://${host}`
  );
  redirectUrl.searchParams.set('token', customToken);

  return NextResponse.redirect(redirectUrl.toString());
}
