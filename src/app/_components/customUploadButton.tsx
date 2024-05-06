"use client";

import { useRouter } from "next/navigation";
import { usePostHog } from "posthog-js/react";
import { toast } from "sonner";
import { useUploadThing } from "~/utils/uploadthing";

// inferred input off useUploadThing
type Input = Parameters<typeof useUploadThing>;

const useUploadThingInputProps = (...args: Input) => {
  const $ut = useUploadThing(...args);

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);
    const result = await $ut.startUpload(selectedFiles);

    console.log("uploaded files", result);
    // TODO: persist result in state maybe?
  };

  return {
    inputProps: {
      onChange,
      multiple: ($ut.permittedFileInfo?.config?.image?.maxFileCount ?? 1) > 1,
      accept: "image/*",
    },
    isUploading: $ut.isUploading,
  };
};

export const CustomUploadButton = () => {
  const router = useRouter();
  const posthog = usePostHog();

  const { inputProps } = useUploadThingInputProps("imageUploader", {
    onUploadError() {
      toast.error("something went wrong!");
      posthog.capture("error in uploading image");
    },
    onUploadBegin() {
      posthog.capture("Click on upload button");
      toast.loading("uploading...", {
        id: "upload-sonner",
      });
    },
    onClientUploadComplete() {
      posthog.capture("uploaded successfully");
      toast.dismiss("upload-sonner");
      toast.success("upload complete!");
      router.refresh();
    },
  });
  return (
    <div>
      <label
        htmlFor="upload-button"
        className="mx-2 flex cursor-pointer items-center gap-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="mb-0.5 h-5 w-5"
        >
          <path
            fillRule="evenodd"
            d="M13.75 7h-3V3.66l1.95 2.1a.75.75 0 1 0 1.1-1.02l-3.25-3.5a.75.75 0 0 0-1.1 0L6.2 4.74a.75.75 0 0 0 1.1 1.02l1.95-2.1V7h-3A2.25 2.25 0 0 0 4 9.25v7.5A2.25 2.25 0 0 0 6.25 19h7.5A2.25 2.25 0 0 0 16 16.75v-7.5A2.25 2.25 0 0 0 13.75 7Zm-3 0h-1.5v5.25a.75.75 0 0 0 1.5 0V7Z"
            clipRule="evenodd"
          />
        </svg>
        <p className="text-xl font-black tracking-tighter">upload.</p>
      </label>
      <input
        id="upload-button"
        type="file"
        className="sr-only"
        {...inputProps}
      />
    </div>
  );
};
