import { IronSession, SessionOptions, getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import * as openidClient from 'openid-client';
import { CodeForcesOAuthSession } from '../trpc/types';

export const clientConfig = {
  url: process.env.NEXT_codeforces_issuer,
  audience: process.env.NEXT_codeforces_issuer,
  client_id: process.env.NODE_codeforces_client_id,
  client_secret: process.env.NODE_codeforces_client_secret,
  scope: process.env.NEXT_PUBLIC_SCOPE,
  redirect_uri: process.env.NEXT_CODEFORCES_CALLBACK_URL,
  post_logout_redirect_uri: process.env.NEXT_DOMAIN_URL,
  response_type: 'code',
  grant_type: 'authorization_code',
  post_login_route: process.env.NEXT_CODEFORCES_POST_LOGIN_ROUTE,
  code_challenge_method: 'S256',
};

export const sessionOptions: SessionOptions = {
  password: 'complex_password_at_least_32_characters_long',
  cookieName: 'next_js_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
  ttl: 60 * 60 * 24 * 7,
};

export async function getSession(): Promise<
  IronSession<CodeForcesOAuthSession>
> {
  const cookiesList = await cookies();
  const session = await getIronSession<CodeForcesOAuthSession>(
    cookiesList,
    sessionOptions
  );
  return session;
}

export async function getConfig() {
  const SERVER_METADATA = {
    issuer: 'https://codeforces.com',
    authorization_endpoint: 'https://codeforces.com/oauth/authorize',
    token_endpoint: 'https://codeforces.com/oauth/token',
    response_types_supported: ['code'],
    scopes_supported: ['openid'],
    claims_supported: [
      'sub',
      'iss',
      'aud',
      'exp',
      'iat',
      'handle',
      'avatar',
      'rating',
    ],
    subject_types_supported: ['public'],
    id_token_signing_alg_values_supported: ['HS256'],
    token_endpoint_auth_methods_supported: ['client_secret_post'],
    end_session_endpoint: clientConfig.post_logout_redirect_uri,
  };
  const openIdClientConfig = new openidClient.Configuration(
    SERVER_METADATA,
    clientConfig.client_id!,
    clientConfig.client_secret!
  );
  return openIdClientConfig;
}
