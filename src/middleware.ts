import { NextResponse } from 'next/server'
import type { NextRequest} from 'next/server';

export function middleware(req: NextRequest) {
  // return NextResponse.json(
  //   { message: 'Authorization Denied' },
  //   { status: 401}
  // )
  return NextResponse.next();
};

