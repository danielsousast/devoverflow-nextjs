// import { Container } from './styles';

import { Question } from "@/components/forms/Question";

export default function AskQuestions() {
  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">As a question</h1>
      <div className="mt-9">
        <Question />
      </div>
    </div>
  );
}
