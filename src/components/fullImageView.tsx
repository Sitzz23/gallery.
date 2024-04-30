/* eslint-disable @next/next/no-img-element */
import { clerkClient } from "@clerk/nextjs/server";
import { Button } from "~/components/ui/button";
import { deleteImage, getImage } from "~/server/queries";

const FullImageView = async ({ photoId }: { photoId: number }) => {
  const image = await getImage(Number(photoId));

  const userInfo = await clerkClient.users.getUser(image.userId);
  return (
    <div>
      <p>hola</p>
    </div>
    // <div className="flex h-full w-screen min-w-0 items-center justify-center">
    //   <div className="flex-shrink flex-grow">
    //     <img src={image.url} className="object-contain" alt={image.name} />
    //   </div>
    //   <div className="flex h-full flex-shrink-0 flex-col border-l">
    //     <div className="border-b p-2 text-center text-base">{image.name}</div>

    //     <div className="p-2 text-base">
    //       <div>Uploaded By:</div>
    //       <div>{userInfo.fullName}</div>
    //     </div>

    //     <div className="p-2 text-base">
    //       <div>Created On:</div>
    //       <div>{image.createdAt.toLocaleDateString()}</div>
    //     </div>

    //     <div className="p-2">
    //       <form
    //         action={async () => {
    //           "use server";

    //           await deleteImage(photoId);
    //         }}
    //       >
    //         <Button type="submit" variant="destructive">
    //           Delete
    //         </Button>
    //       </form>
    //     </div>
    //   </div>
    // </div>
  );
};

export default FullImageView;
