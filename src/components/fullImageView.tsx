/* eslint-disable @next/next/no-img-element */
import { clerkClient } from "@clerk/nextjs/server";
import { Button } from "~/components/ui/button";
import { deleteImage, getImage, getOtherImages } from "~/server/queries";
import CopyToClipboardButton from "~/app/_components/copyToClipboard";
import Link from "next/link";
import Image from "next/image";
import { Trash } from "lucide-react";

const FullImageView = async ({ photoId }: { photoId: number }) => {
  const image = await getImage(Number(photoId));
  const userInfo = await clerkClient.users.getUser(image.userId);

  return (
    <div className=" flex h-full max-w-full justify-between gap-6 p-4">
      <img
        src={image.url}
        alt={image.name}
        className={
          "aspect-square max-h-[88.5vh] max-w-[45%] rounded-md object-cover object-center"
        }
      />
      <div className="flex grow flex-col justify-between">
        <div className="flex flex-col items-start justify-between gap-4">
          <div className="flex w-full items-center gap-4">
            <div className="flex items-center gap-2 rounded-md bg-neutral-200 p-3">
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
            <div className="flex items-center gap-2 rounded-md bg-neutral-200 p-3">
              <span className="text-xs font-medium">✦</span>
              <h3 className="font-medium leading-none">{userInfo.fullName}</h3>
            </div>
          </div>
          <div className="flex items-center justify-start gap-4">
            {image && (
              <CopyToClipboardButton
                stringToCopy={image.url}
                itemCopied={image.name}
              />
            )}

            <form
              action={async () => {
                "use server";
                await deleteImage(photoId);
              }}
            >
              <Button
                type="submit"
                variant="destructive"
                className="flex items-center gap-2 rounded-md"
              >
                <Trash size={15} />
                <span>Delete</span>
              </Button>
            </form>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <OtherImages imageId={image.id} />
        </div>
      </div>
    </div>
  );
};

const OtherImages = async ({ imageId }: { imageId: number }) => {
  const images = await getOtherImages(imageId);

  return (
    <>
      {images.length > 0 && (
        <div className="flex flex-col gap-2">
          <span className="text-2xl font-black tracking-tighter">
            More Images.
          </span>
          <div className="flex flex-wrap justify-start gap-4 overflow-y-scroll">
            {images.map((image) => (
              <div
                key={image.id}
                className="flex w-[23%] flex-col items-center gap-2 overflow-hidden"
              >
                <Link href={`/img/${image.id}`}>
                  <Image
                    src={image.url}
                    alt={image.name}
                    width={180}
                    height={364}
                    className={
                      "aspect-square rounded-md object-cover object-top"
                    }
                  />
                </Link>
                <div className="flex w-full max-w-[180px] gap-2 rounded-md bg-neutral-100 p-3 text-sm">
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

                  <h3 className=" grow truncate font-medium leading-none">
                    {image.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default FullImageView;
