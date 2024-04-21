import FullImageView from "~/components/fullImageView";

export default async function PhotoModal({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  return <FullImageView photoId={Number(photoId)} />;
}
