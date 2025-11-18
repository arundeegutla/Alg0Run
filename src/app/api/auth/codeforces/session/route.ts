import { defaultSession, getSession } from '@/server/codeforces/lib';

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return Response.json({ defaultSession });
    }
    return Response.json({
      isLoggedIn: session.isLoggedIn,
      userInfo: session.userInfo,
    });
  } catch (e) {
    console.error('Error fetching Codeforces session:', e);
    return Response.json({ error: e }, { status: 500 });
  }
}
