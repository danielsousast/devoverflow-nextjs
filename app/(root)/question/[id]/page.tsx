import { AnswerForm } from "@/components/forms/Answer";
import { AllAnswers } from "@/components/shared/AllAnswers";
import { Metric } from "@/components/shared/Metric";
import { ParseHTML } from "@/components/shared/ParseHTML";
import { Tag } from "@/components/shared/tag/Tag";
import { getQuestionById } from "@/features/question/actions";
import { getUserById } from "@/features/user/actions";
import { getTimestamp } from "@/lib/dateUtils";
import { formatAndDivideNumber } from "@/lib/numberUtils";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

interface Props {
  params: {
    id: string;
  };
}

export default async function QuestionPage({ params }: Props) {
  const { id: questionId } = params;
  const { userId: clerkId } = auth();
  const question = await getQuestionById({ questionId });

  let mongoUser;

  if (clerkId) {
    mongoUser = await getUserById({ userId: clerkId });
  }

  return (
    <>
      <div className="flex-start w-full flex-col">
        <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <Link
            href={`/profile/${question.author.clerkId}`}
            className="flex items-center justify-start gap-1"
          >
            <Image
              src={question.author.picture}
              alt="Edit"
              width={22}
              height={22}
              className="rounded-full"
            />
            <p className="paragraph-semibold text-dark300_light700">
              {question.author.name}
            </p>
          </Link>
          <div className="flex justify-end">VOTING COMPONENT</div>
        </div>
        <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
          {question?.title}
        </h2>
      </div>
      <ParseHTML data={question.content} />
      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <Metric
          imgUrl="/assets/icons/clock.svg"
          alt="clock icon"
          value={` asked ${getTimestamp(question.createdAt)}`}
          title=" Asked"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="message"
          value={formatAndDivideNumber(question.answers.length)}
          title=" Answers"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="eye"
          value={formatAndDivideNumber(question.views)}
          title=" Views"
          textStyles="small-medium text-dark400_light800"
        />
      </div>
      <div className="mt-8 flex flex-wrap gap-2">
        {question.tags.map((tag: any) => (
          <Tag key={tag._id} _id={tag._id} name={tag.name} showCount={false} />
        ))}
      </div>
      <AllAnswers
        questionId={question._id}
        userId={mongoUser?._id}
        totalAnswers={question.answers?.length}
      />
      <AnswerForm questionId={questionId} authorId={mongoUser?._id as string} />
    </>
  );
}
