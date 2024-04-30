import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "~/components/ui/button";
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
        <div key={image.id} className="flex flex-col gap-2 overflow-hidden">
          <Link href={`/img/${image.id}`}>
            <Image
              src={image.url}
              alt={image.name}
              width={210}
              height={364}
              className={"aspect-square rounded-md object-cover object-top"}
            />
          </Link>
          <div className="flex gap-2 rounded-md bg-neutral-100 p-3 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4 w-4"
            >
              <path
                fillRule="evenodd"
                d="M1 5.25A2.25 2.25 0 0 1 3.25 3h13.5A2.25 2.25 0 0 1 19 5.25v9.5A2.25 2.25 0 0 1 16.75 17H3.25A2.25 2.25 0 0 1 1 14.75v-9.5Zm1.5 5.81v3.69c0 .414.336.75.75.75h13.5a.75.75 0 0 0 .75-.75v-2.69l-2.22-2.219a.75.75 0 0 0-1.06 0l-1.91 1.909.47.47a.75.75 0 1 1-1.06 1.06L6.53 8.091a.75.75 0 0 0-1.06 0l-2.97 2.97ZM12 7a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
                clipRule="evenodd"
              />
            </svg>

            <h3 className="font-medium leading-none">{image.name}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};
