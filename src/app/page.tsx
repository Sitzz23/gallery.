import { SignedIn, SignedOut } from "@clerk/nextjs";
import { db } from "~/server/db";
import { UploadDropzone } from "~/utils/uploadthing";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <main className="p-4">
      <div>
        <SignedOut>
          <p>please sign in</p>
        </SignedOut>
        <SignedIn>
          <div className="flex flex-col items-center justify-center gap-4">
            <UploadDropzone endpoint="imageUploader" />
            <Images />
          </div>
        </SignedIn>
      </div>
    </main>
  );
}

const Images = async () => {
  const images = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });
  return (
    <div className="flex flex-wrap gap-4 ">
      {[...images, ...images].map((image, index) => (
        <div key={image.id + "-" + index} className="flex w-48  flex-col ">
          <img src={image.url} alt="image" />
          <p>{image.name}</p>
        </div>
      ))}
    </div>
  );
};
