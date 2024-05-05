"use client";

import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { UploadButton } from "~/utils/uploadthing";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="bg-background/60 sticky top-0 z-10 flex h-16 items-center gap-10 px-4 backdrop-blur-xl transition-all">
      <Link href="/" className="flex items-center space-x-2">
        <span className="inline-block rounded-md py-0.5 pr-2 text-left text-3xl font-black tracking-tighter underline">
          gallery.
        </span>
      </Link>
      <div className="ml-auto flex items-center space-x-4">
        {/* <Link href="/signin">
          <Button className="relative rounded-lg">Sign In</Button>
        </Link> */}
        <SignedOut>
          <Button variant={"default"}>
            <SignInButton />
          </Button>
        </SignedOut>
        <SignedIn>
          <div className="flex items-center justify-center gap-4">
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={() => {
                router.refresh();
              }}
            />
          </div>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
