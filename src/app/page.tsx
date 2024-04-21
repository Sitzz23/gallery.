import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import { getImages } from "~/server/queries";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <main className="p-4">
      <div>
        <SignedOut>
          <p>please sign in</p>
        </SignedOut>
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
    <div className="flex flex-wrap gap-4 ">
      {images.map((image) => (
        <div key={image.id} className="flex h-48 w-48 flex-col ">
          <Image
            src={image.url}
            height={480}
            width={480}
            alt="image"
            style={{ objectFit: "contain" }}
          />
          <p>{image.name}</p>
        </div>
      ))}
    </div>
  );
};
