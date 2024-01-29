import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import Cookies from "js-cookie";

export async function middleware(request: NextRequest) {
    let token = Cookies.get('a_t');
    console.log("TKNS", token);
    if(token!==null){
        return NextResponse.next()
    }
    return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
    matcher: ['/account/:path*', '/login/:path*'],
  }