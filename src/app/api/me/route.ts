import { NextResponse } from 'next/server';
import { getUserByUsername } from '@/app/service/user';
import { withSessionUser } from '@/app/util/session';

export async function GET() {
  return withSessionUser(async (user) =>
    getUserByUsername(user.username).then((data) => NextResponse.json(data)),
  );
}
