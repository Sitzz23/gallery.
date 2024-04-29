import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
// import { Dialog, DialogTrigger } from "~/components/ui/dialog";
import { getImages } from "~/server/queries";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <main className="p-4">
      <SignedOut>
        <div className="flex h-[86vh]  items-center justify-center">
          <div className="flex flex-col gap-4">
            <p>Sign in to view content!</p>
            <Button variant={"default"}>
              <SignInButton />
            </Button>
          </div>
        </div>
      </SignedOut>
      <SignedIn>
        <div className="flex items-center justify-start">
          <Images />
        </div>
      </SignedIn>
    </main>
  );
}

const Images = async () => {
  const images = await getImages();

  return (
    <div className="flex flex-wrap justify-start gap-4">
      {images.map((image) => (
        <div
          key={image.id}
          className="overflow-hidden rounded-md bg-neutral-100"
        >
          <Link href={`/img/${image.id}`}>
            <Image
              src={image.url}
              alt={image.name}
              width={210}
              height={364}
              className={cn("object-cover object-top", "aspect-square")}
            />
          </Link>
          <div className="flex gap-2 p-4 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
            <h3 className="font-medium leading-none">{image.name}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};
