import { Modal } from "./modal";
import FullImageView from "~/components/fullImageView";

export default async function PhotoModal({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  return (
    <Modal>
      <FullImageView photoId={Number(photoId)} />
    </Modal>
  );
}
