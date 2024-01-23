import Image from "next/image";
import Link from "next/link";

export function SidebarItem({
  item,
  isActive,
}: {
  item: any;
  isActive: boolean;
}) {
  const activeLinkClass = (active: boolean) => {
    if (active) return "primary-gradient rounded-lg text-light-900";
    return "text-dark300_light900";
  };
  return (
    <Link
      href={item.route}
      className={`${activeLinkClass(
        isActive
      )} flex items-center justify-start gap-4 bg-transparent p-4`}
    >
      <Image
        src={item.imgURL}
        alt={item.label}
        width={20}
        height={20}
        className={`${isActive ? "" : "invert-colors"}`}
      />
      <p className={`${isActive ? "base-bold" : "base-medium"} max-lg:hidden`}>
        {item.label}
      </p>
    </Link>
  );
}
