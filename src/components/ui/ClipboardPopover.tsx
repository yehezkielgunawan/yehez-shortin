import {
  Popover,
  PopoverTrigger,
  IconButton,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
} from "@chakra-ui/react";
import React from "react";
import { FaClipboard } from "react-icons/fa";

type ClipboardPopoverProps = {
  urlRes: string;
};

const ClipboardPopover = ({ urlRes }: ClipboardPopoverProps) => {
  const copyToClipboard = (text: string) => {
    return navigator.clipboard.writeText(text);
  };

  return (
    <Popover trigger="click">
      <PopoverTrigger>
        <IconButton
          aria-label="Clipboard"
          icon={<FaClipboard />}
          onClick={() => copyToClipboard(urlRes)}
        />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverHeader>Copied!</PopoverHeader>
      </PopoverContent>
    </Popover>
  );
};

export default ClipboardPopover;
