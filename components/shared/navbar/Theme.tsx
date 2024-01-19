"use client";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useTheme } from "@/context/ThemeProvider";
import Image from "next/image";
import { useMemo } from "react";

const themes = [
  {
    value: "light",
    label: "Light",
    icon: "/assets/icons/sun.svg",
  },
  {
    value: "dark",
    label: "Dark",
    icon: "/assets/icons/moon.svg",
  },
  {
    value: "system",
    label: "System",
    icon: "/assets/icons/computer.svg",
  },
];

export default function Theme() {
  const { setMode, mode } = useTheme();

  const labelClass = useMemo(() => {
    if (mode === "light") return "text-dark100_light900";
    if (mode === "dark") return "text-light-500";
    return "text-light-500";
  }, [mode]);

  function onItemClicked(item: (typeof themes)[0]) {
    setMode(item.value);
    if (item.value !== "system") {
      localStorage.theme = item.value;
    } else {
      localStorage.removeItem("theme");
    }
  }

  return (
    <Menubar className="relative border-none bg-transparent shadow-none">
      <MenubarMenu>
        <MenubarTrigger
          className="focus:bg-light-900 data-[state=open]:bg-light-900
        dark:focus:bg-dark-200 dark:data-[state=open]:bg-dark-200"
        >
          {mode === "dark" ? (
            <Image
              src="/assets/icons/moon.svg"
              width={20}
              height={20}
              alt="Dark Mode"
              className="active-theme"
            />
          ) : (
            <Image
              src="/assets/icons/sun.svg"
              width={20}
              height={20}
              alt="Light Mode"
              className="active-theme"
            />
          )}
        </MenubarTrigger>
        <MenubarContent
          className="absolute right-[-3rem] mt-3 min-w-[120px]
        rounded border py-2 dark:border-dark-400 dark:bg-dark-300"
        >
          {themes.map((theme) => (
            <MenubarItem
              key={theme.value}
              className="flex items-center gap-4 rounded-sm px-3 py-2
            hover:bg-light-900 dark:hover:bg-dark-400"
              onSelect={() => onItemClicked(theme)}
            >
              <Image
                src={theme.icon}
                width={20}
                height={20}
                alt={theme.label}
                className={`${mode === theme.value && "active-theme"}`}
              />
              <p className={`body-semibold text-light-500 ${labelClass}`}>
                {theme.label}
              </p>
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
