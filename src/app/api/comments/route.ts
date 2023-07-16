import { NextRequest, NextResponse } from 'next/server';
import { addComment } from '@/app/service/posts';
import { withSessionUser } from '@/app/util/session';

export async function POST(req: NextRequest) {
  return withSessionUser(async (user) => {
    const { id, comment } = await req.json();

    if (!id || comment === '') {
      return new Response('Bad Request', { status: 400 });
    }

    return addComment(id, user.id, comment) //
      .then((res) => NextResponse.json(res))
      .catch((err) => new Response(JSON.stringify(err), { status: 500 }));
  });
}
