"use client";

import { Input } from "@/components/ui/input";
import Image from "next/image";

interface LocalSearchProps {
  route: string;
  iconPosition?: string;
  placeholder: string;
  otherClasses?: string;
  imageSrc: string;
}

export function LocalSearch({
  route,
  otherClasses,
  imageSrc,
  iconPosition = "left",
  placeholder,
}: LocalSearchProps) {
  return (
    <div
      className={`background-light800_darkgradient flex min-h-[56px] flex-1 grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}
    >
      {iconPosition === "left" && (
        <Image
          src={imageSrc}
          width={24}
          height={24}
          alt="search"
          className="cursor-pointer"
        />
      )}

      <Input
        type="text"
        placeholder={placeholder}
        value=""
        onChange={() => {}}
        className="paragraph-regular no-focus placeholder text-dark400_light700 flex-1 border-none bg-transparent shadow-none outline-none"
      />

      {iconPosition === "right" && (
        <Image
          src={imageSrc}
          width={24}
          height={24}
          alt="search"
          className="cursor-pointer"
        />
      )}
    </div>
  );
}
