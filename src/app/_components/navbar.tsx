import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

import { Button } from "~/components/ui/button";
import { CustomUploadButton } from "./customUploadButton";

const Navbar = () => {
  return (
    <nav className="bg-background/60 sticky top-0 z-10 flex h-16 items-center gap-10 px-4 backdrop-blur-xl transition-all">
      <Link href="/" className="flex items-center space-x-2">
        <span className="flex items-center justify-start gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="mt-1 h-5 w-5"
          >
            <path d="M11.983 1.907a.75.75 0 0 0-1.292-.657l-8.5 9.5A.75.75 0 0 0 2.75 12h6.572l-1.305 6.093a.75.75 0 0 0 1.292.657l8.5-9.5A.75.75 0 0 0 17.25 8h-6.572l1.305-6.093Z" />
          </svg>
          <span className="inline-block rounded-md py-0.5 text-left text-2xl font-black tracking-tighter  ">
            gallery.
          </span>
        </span>
      </Link>
      <div className="ml-auto flex items-center space-x-4">
        <SignedOut>
          <Button variant={"default"}>
            <SignInButton />
          </Button>
        </SignedOut>
        <SignedIn>
          <div className="flex items-center justify-center gap-4">
            <CustomUploadButton />
          </div>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
