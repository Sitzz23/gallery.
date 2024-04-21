import { getImage } from "~/server/queries";
import Image from "next/image";

const FullImageView = async ({ photoId }: { photoId: number }) => {
  const image = await getImage(Number(photoId));
  return (
    <Image
      src={image.url}
      height={480}
      width={480}
      alt="image"
      style={{ objectFit: "contain" }}
    />
  );
};

export default FullImageView;
