// import { Container } from './styles';

import { Question } from "@/components/forms/Question/Question";
import { getUserById } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";

export default async function AskQuestions() {
  const userId = "clerk123";

  if (!userId) {
    redirect("/sign-in");
  }

  const mongoUser = await getUserById({ userId });
  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">As a question</h1>
      <div className="mt-9">
        <Question mongoUserId={JSON.stringify(mongoUser._id)} />
      </div>
    </div>
  );
}
