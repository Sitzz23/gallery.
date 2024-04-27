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
      <div className="flex h-[86vh] w-screen items-center justify-center">
        <SignedOut>
          <div className="flex flex-col gap-4">
            <p>Sign in to view content!</p>
            <Button variant={"default"}>
              <SignInButton />
            </Button>
          </div>
        </SignedOut>
      </div>
      <div>
        <SignedIn>
          <Images />
        </SignedIn>
      </div>
    </main>
  );
}

const Images = async () => {
  const images = await getImages();

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {images.map((image) => (
        <div key={image.id} className="flex h-48 w-48 flex-col">
          <Link href={`/img/${image.id}`}>
            <Image
              src={image.url}
              style={{ objectFit: "contain" }}
              width={192}
              height={192}
              alt={image.name}
            />
          </Link>
          <div>{image.name}</div>
        </div>
      ))}
    </div>
  );
};
