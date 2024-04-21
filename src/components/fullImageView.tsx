/* eslint-disable @next/next/no-img-element */
import { getImage } from "~/server/queries";

const FullImageView = async ({ photoId }: { photoId: number }) => {
  const image = await getImage(Number(photoId));
  return (
    <div className="flex h-[90vh] w-screen min-w-0 flex-col items-center justify-center gap-8 ">
      <img src={image.url} className="w-[20%] object-center" alt="image" />
      <div className="font-bold">{image.name}</div>
    </div>
  );
};

export default FullImageView;
