// import { Container } from './styles';

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function SignInButton() {
  return (
    <Link href="/sign-in">
      <Button
        className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3
    shadow-none"
      >
        <Image
          src={"/assets/icons/account.svg"}
          alt="Login"
          width={20}
          height={20}
          className="invert-colors lg:hidden"
        />
        <span className="primary-text-gradient max-lg:hidden">Log In</span>
      </Button>
    </Link>
  );
}
