"use client";

import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className="bg-background/60 sticky top-0 z-10 flex h-16 items-center gap-10 border-b px-4 backdrop-blur-xl transition-all">
      <Link href="/" className="flex items-center space-x-2">
        <span className="font-urban inline-block text-xl font-bold">
          T3 Gallery
        </span>
      </Link>
      <div className="ml-auto flex items-center space-x-4">
        {/* <Link href="/signin">
          <Button className="relative rounded-lg">Sign In</Button>
        </Link> */}
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
