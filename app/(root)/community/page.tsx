import { UserCard } from "@/components/cards/UserCard";
import { Filter } from "@/components/shared/filter/Filter";
import { LocalSearch } from "@/components/shared/search/LocalSearch";
import { Title } from "@/components/shared/typo/title";
import { UserFilters } from "@/constants/filters";
import { getAllUsers } from "@/features/user/actions";
import Link from "next/link";

export default async function CommunityPage() {
  const users = await getAllUsers({
    page: 1,
    pageSize: 10,
  });

  return (
    <>
      <Title>All Users</Title>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route="/community"
          iconPosition="left"
          placeholder="Search for amazing minds"
          otherClasses="flex-1"
          imageSrc="/assets/icons/search.svg"
        />
        <Filter
          filters={UserFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px"
        />
      </div>
      <section className="mt-12 flex flex-wrap gap-4">
        {users?.length === 0 && (
          <div className="paragrath-regular text-dark200_light800 mx-auto max-w4xl text-center">
            <p>No users yet</p>
            <Link href="/sign-up" className="mt-2 font-bold text-accent-blue">
              Joint to be the first
            </Link>
          </div>
        )}
        {users?.map((user) => (
          <UserCard key={user._id} user={user} />
        ))}
      </section>
    </>
  );
}
