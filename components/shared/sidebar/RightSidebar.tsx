// import { Container } from './styles';

import Image from "next/image";
import Link from "next/link";
import { Tag } from "../tag/Tag";

const hotQuestions = [
  {
    _id: "1",
    title: "How to use Next.js?",
  },
  {
    _id: "2",
    title: "How to use Next.js?",
  },
  {
    _id: "3",
    title: "How to use Next.js?",
  },
  {
    _id: "4",
    title: "How to use Next.js?",
  },
  {
    _id: "5",
    title: "How to use Next.js?",
  },
];

const popularTags = [
  {
    _id: "1",
    title: "Next.js",
    totalQuestions: 10,
  },
  {
    _id: "2",
    title: "Redux",
    totalQuestions: 4,
  },
  {
    _id: "3",
    title: "React",
    totalQuestions: 10,
  },
  {
    _id: "4",
    title: "Vue.js",
    totalQuestions: 3,
  },
  {
    _id: "5",
    title: "Node.js",
    totalQuestions: 1,
  },
];

export function RightSidebar() {
  return (
    <section className="background-light900_dark200 light-border custom-scrollbar sticky right-0 top-0 flex h-screen w-[350px] flex-col overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden">
      <div>
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
      </div>
      <div className="mt-7 flex w-full flex-col gap-[30px]">
        {hotQuestions.map((question) => (
          <Link
            href={`/questions/${question._id}`}
            key={question._id}
            className="flex cursor-pointer items-center justify-between gap-7"
          >
            <p className="body-medium text-dark500_light700">
              {question.title}
            </p>
            <Image
              src="/assets/icons/chevron-right.svg"
              alt="Arrow Right"
              width={20}
              height={20}
              className="invert-colors"
            />
          </Link>
        ))}
      </div>
      <div>
        <h3 className="h3-bold text-dark200_light900 mt-10">Popular Tags</h3>
        <div className="mt-7 flex w-full flex-col gap-4">
          {popularTags.map((tag) => (
            <Tag
              key={tag._id}
              _id={tag._id}
              name={tag.title}
              totalQuestions={tag.totalQuestions}
              showCount
            />
          ))}
        </div>
      </div>
    </section>
  );
}
