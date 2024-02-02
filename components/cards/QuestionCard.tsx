import { getTimestamp } from "@/lib/dateUtils";
import { Question } from "@/types/models/Question";
import Link from "next/link";
import { Metric } from "../shared/Metric";
import { Tag } from "../shared/tag/Tag";

interface Props {
  question: Question;
}

export function QuestionCard({ question }: Props) {
  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimestamp(question.createdAt)}
          </span>
          <Link href={`/question/${question._id}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {question?.title}
            </h3>
          </Link>
        </div>
      </div>
      <div className="mt-3.5 flex flex-wrap gap-2">
        {question.tags?.map((tag) => (
          <Tag key={tag._id} name={tag.name} _id={tag._id} totalQuestions={0} />
        ))}
      </div>
      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl="/assets/icons/avatar.svg"
          alt="User"
          value={question.author.name}
          title={`  - asked ${getTimestamp(question.createdAt)}`}
          href={`/profile/${question.author._id}`}
          textStyles="body-medium text-dark400_light700"
        />
        <Metric
          imgUrl="/assets/icons/like.svg"
          alt="Upvotes"
          value={question.upvotes}
          title=" Votes"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="Eye"
          value={question.answers.length}
          title=" Answers"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="Views"
          value={question.views}
          title=" Views"
          textStyles="small-medium text-dark400_light800"
        />
      </div>
    </div>
  );
}