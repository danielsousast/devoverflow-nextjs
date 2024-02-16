import { IUser } from "@/models/user.model";
import Image from "next/image";
import Link from "next/link";

interface Props {
  user: IUser;
}

export function UserCard({ user }: Props) {
  return (
    <Link
      href={`/profile/${user.clerkId}`}
      className="shadow-light100_darkone w-fill max-xs:min-w-fill xs:w-[260px]"
    >
      <article className="background-light900_dark200 light-border flex w-full flex-col items-center justify-center rounded-2xl border p-8">
        <Image
          src={user.picture}
          alt="user picture"
          width={100}
          height={100}
          className="rounded-full"
        />
        <div className="mt-4 text-center">
          <h3 className="h3-bold text-dark200_light900 line-clamp-1">
            {user.name}
          </h3>
          <p className="body-regular text-dark500_light500 mt-2">
            @{user.username}
          </p>
        </div>
      </article>
    </Link>
  );
}
