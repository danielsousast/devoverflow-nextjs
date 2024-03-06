// import { Container } from './styles';

import { formatAndDivideNumber } from "@/lib/numberUtils";
import Image from "next/image";
import Link from "next/link";

interface Props {
  imgUrl: string;
  alt: string;
  value: number | string;
  title: string;
  textStyles: string;
  isAuthor?: boolean;
  href?: string;
}

export function Metric({
  imgUrl,
  alt,
  value,
  title,
  textStyles,
  href,
  isAuthor = false,
}: Props) {
  function getValue() {
    if (typeof value === "number") {
      return formatAndDivideNumber(value);
    }
    return value;
  }

  function renderContent() {
    return (
      <>
        <Image
          src={imgUrl}
          alt={alt}
          width={16}
          height={16}
          className={`
          object-contain ${href ? "rounded-full" : ""}`}
        />
        <p className={`${textStyles} flex items-center gap-1`}>
          {getValue()}

          <span
            className={`small-regular line-clamp-1 ${
              isAuthor ? "mas-sm:hidden" : ""
            }`}
          >
            {title}
          </span>
        </p>
      </>
    );
  }

  if (href) {
    return (
      <Link href={href} className="flex-center gap-1">
        {renderContent()}
      </Link>
    );
  }

  return <div className="flex-center flex-wrap gap-1">{renderContent()}</div>;
}
