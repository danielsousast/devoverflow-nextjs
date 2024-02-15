"use server";

import { QuestionCard } from "@/components/cards/QuestionCard";
import { HomeFilters } from "@/components/home/HomeFilters";
import { NoResult } from "@/components/shared/NoResults";
import { Filter } from "@/components/shared/filter/Filter";
import { LocalSearch } from "@/components/shared/search/LocalSearch";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import { getQuestions } from "@/lib/actions/get-questions.action";
import Link from "next/link";

export default async function Home() {
  const response = await getQuestions({
    page: 1,
    pageSize: 10,
  });

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route="/"
          iconPosition="left"
          placeholder="Search for questions"
          otherClasses="flex-1"
          imageSrc="/assets/icons/search.svg"
        />
        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px"
          containerClasses="hidden max-md:flex"
        />
      </div>
      <HomeFilters />
      <div className="mt-10 flex w-full flex-col gap-6">
        {response?.questions?.map((question) => (
          <QuestionCard key={question._id} question={question as any} />
        ))}
        {response?.questions?.length === 0 && (
          <NoResult
            title="There`s no question to show"
            description="Be the first to break the silence! Ask a Question and kickstart the discussion. Our query could be the next big thing others learn. Get involved"
            linkTitle="Ask a Question"
            link="/ask-question"
          />
        )}
      </div>
    </>
  );
}
