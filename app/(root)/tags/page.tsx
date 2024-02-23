import { TagCard } from "@/components/cards/TagCard";
import { NoResult } from "@/components/shared/NoResults";
import { Filter } from "@/components/shared/filter/Filter";
import { LocalSearch } from "@/components/shared/search/LocalSearch";
import { Title } from "@/components/shared/typo/title";
import { UserFilters } from "@/constants/filters";
import { getAllTags } from "@/lib/actions/tag.actions";

export default async function TagsPage() {
  const tags = await getAllTags();
  return (
    <>
      <Title>All Tags</Title>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route="/tags"
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
        {tags?.length === 0 && (
          <NoResult
            title={"No Tags Found"}
            description={"It looks like there are no tags no found"}
            linkTitle={"Ask a question"}
            link={"/ask-question"}
          />
        )}
        {tags?.map((tag) => (
          <TagCard key={tag._id} tag={tag} />
        ))}
      </section>
    </>
  );
}
