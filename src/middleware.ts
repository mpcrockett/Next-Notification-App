import { NextResponse } from 'next/server'

export function middleware() {
  // return NextResponse.json(
  //   { message: 'Authorization Denied' },
  //   { status: 401}
  // )
  return NextResponse.next();
};

