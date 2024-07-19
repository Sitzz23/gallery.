"use client";
import { Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "~/components/ui/button";

const CopyToClipboardButton = ({
  stringToCopy,
  itemCopied,
}: {
  stringToCopy: string;
  itemCopied: string;
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(stringToCopy);
      setIsCopied(true);
      toast(`Copied to clipboard!`, {
        description: `Url for ${itemCopied}`,
        action: {
          label: "Undo",
          onClick: () => {
            void navigator.clipboard.writeText("");
            setIsCopied(false);
          },
        },
      });
    } catch (error) {
      toast(`Failed to copy text to clipboard`, {
        description: `Error`,
      });
    }
  };

  return (
    <div>
      <Button
        variant={"default"}
        className="flex items-center gap-2"
        onClick={handleCopyClick}
      >
        <Copy size={15} />
        <span> {isCopied ? "Copied!" : "Copy to Clipboard"}</span>
      </Button>
    </div>
  );
};

export default CopyToClipboardButton;
