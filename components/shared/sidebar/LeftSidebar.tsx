"use client";

import { sidebarLinks } from "@/constants";
import { SignedOut } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { SignInButton } from "../buttons/SignInButton";
import { SignUpButton } from "../buttons/SignUpButton";
import { SidebarItem } from "../menu/SidebarItem";

export function LeftSidebar() {
  const pathname = usePathname();
  return (
    <section className="background-light900_dark200 light-border custom-scrollbar sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px]">
      <div className="flex flex-1 flex-col gap-6">
        {sidebarLinks.map((item) => (
          <SidebarItem
            key={item.route}
            item={item}
            isActive={pathname === item.route}
          />
        ))}
      </div>
      <SignedOut>
        <div className="flex flex-col gap-3">
          <SignInButton />
          <SignUpButton />
        </div>
      </SignedOut>
    </section>
  );
}
