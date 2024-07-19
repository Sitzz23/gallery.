"use client";
import React from "react";
import { Button } from "./ui/button";
import { Maximize } from "lucide-react";

const ExpandButton = () => {
  const handleClick = () => {
    try {
      window.location.reload();
      //   console.log("ho rha hai na");
    } catch (error) {
      console.error("Error refreshing page:", error);
    }
  };
  return (
    <Button className="" variant={"secondary"} onClick={handleClick}>
      <Maximize className="" size={16} />
    </Button>
  );
};

export default ExpandButton;
