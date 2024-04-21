import { getImage } from "~/server/queries";

export default async function PhotoModal({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  const image = await getImage(Number(photoId));

  return (
    <div>
      <img src={image.url} className="w-28" alt="image from t3-gallery" />
    </div>
  );
}
