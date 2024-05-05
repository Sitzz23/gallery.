/* eslint-disable @next/next/no-img-element */
import { clerkClient } from "@clerk/nextjs/server";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { deleteImage, getImage } from "~/server/queries";

const FullImageView = async ({ photoId }: { photoId: number }) => {
  const image = await getImage(Number(photoId));
  const userInfo = await clerkClient.users.getUser(image.userId);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(image.url);
    toast(`Copied to clipboard!`, {
      description: `Url for ${image.name}`,
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      },
    });
  };

  return (
    <div className=" flex max-w-full justify-between gap-4 p-4">
      <div className="flex grow flex-col items-end gap-4">
        <div className="flex w-full items-center justify-between gap-2  text-sm">
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
            <span className="font-medium">✦</span>
            <h3 className="font-medium leading-none">{userInfo.fullName}</h3>
          </div>
        </div>
        <div className="flex items-center justify-end gap-4">
          {image && (
            <Button
              variant={"default"}
              className="flex items-center gap-1"
              onClick={copyToClipboard}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 9.50006C1 10.3285 1.67157 11.0001 2.5 11.0001H4L4 10.0001H2.5C2.22386 10.0001 2 9.7762 2 9.50006L2 2.50006C2 2.22392 2.22386 2.00006 2.5 2.00006L9.5 2.00006C9.77614 2.00006 10 2.22392 10 2.50006V4.00002H5.5C4.67158 4.00002 4 4.67159 4 5.50002V12.5C4 13.3284 4.67158 14 5.5 14H12.5C13.3284 14 14 13.3284 14 12.5V5.50002C14 4.67159 13.3284 4.00002 12.5 4.00002H11V2.50006C11 1.67163 10.3284 1.00006 9.5 1.00006H2.5C1.67157 1.00006 1 1.67163 1 2.50006V9.50006ZM5 5.50002C5 5.22388 5.22386 5.00002 5.5 5.00002H12.5C12.7761 5.00002 13 5.22388 13 5.50002V12.5C13 12.7762 12.7761 13 12.5 13H5.5C5.22386 13 5 12.7762 5 12.5V5.50002Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span>Copy Url</span>
            </Button>
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
              className="flex items-center gap-1 rounded-md"
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span>Delete</span>
            </Button>
          </form>
        </div>
      </div>
      <img
        src={image.url}
        alt={image.name}
        className={"h-[88.5vh] w-auto rounded-md object-contain object-top"}
      />
    </div>
  );
};

export default FullImageView;
