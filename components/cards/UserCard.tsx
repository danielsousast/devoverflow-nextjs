import { getTopInteractedTags } from "@/lib/actions/tag.actions";
import { IUser } from "@/models/user.model";
import Image from "next/image";
import Link from "next/link";
import { Tag } from "../shared/tag/Tag";
import { Badge } from "../ui/badge";

interface Props {
  user: IUser;
}

export async function UserCard({ user }: Props) {
  const interactedTags = await getTopInteractedTags({ userId: user._id });
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
        {interactedTags?.length > 0 ? (
          <div className="flex items-center gap-2 mt-4">
            {interactedTags.map((tag) => (
              <Tag key={tag} _id={tag._id} name={tag.name} />
            ))}
          </div>
        ) : (
          <Badge>No tags yet</Badge>
        )}
      </article>
    </Link>
  );
}
