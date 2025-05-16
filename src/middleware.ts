import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
import getOrCreateDB from "./models/server/dbSetup";
import getOrCreateStorage from "./models/server/storageSetup";

//as this is my middleware this function can everywhere we want
export async function middleware(){

    await Promise.all([
        getOrCreateDB(),
        getOrCreateStorage()
    ])
    
    return NextResponse.next();
}

//wherever the matcher matches the path our code will not run there
export const config = {
    /*
    match all req path except for the ones start with
    - api
    - next/static
    - next/image
    - favicon
    */
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico).*)"
    ]
}