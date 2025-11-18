import { NextRequest, NextResponse } from 'next/server';
import { getConfig, getSession, clientConfig } from '@/server/codeforces/lib';
import { headers } from 'next/headers';
import * as client from 'openid-client';

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

  const { access_token } = tokenSet;
  const claims = tokenSet.claims()!;

  session.isLoggedIn = true;
  session.access_token = access_token;
  session.userInfo = {
    sub: claims.sub,
    handle: claims.handle as string,
    avatar: claims.avatar as string,
    rating: claims.rating as number,
  };

  await session.save();
  return Response.redirect(clientConfig.post_login_route);
}
