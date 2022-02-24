import { useCallback, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import QuestionItem from "../Components/QuestionItem";

const QUESTION = [
  { id: "1", question: "Which one is animal" },
  { id: "2", question: "Which one isn't IT gadgets" },
  { id: "3", question: "Which one isn't Apple's products" },
  { id: "4", question: "Which one is Meta's products" },
  { id: "5", question: "What is result of 1 plus 3" },
];

type QUESTION_TYPE = {
  id: string;
  question: string;
};

const QuestionDnd = () => {
  const [_questions, setQuestions] = useState<QUESTION_TYPE[]>(QUESTION);

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setQuestions((questionList: QUESTION_TYPE[]) => {
      const result = Array.from(questionList);
      const [removed] = result.splice(dragIndex, 1);
      result.splice(hoverIndex, 0, removed);
      return result;
    });
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        {_questions.map((item, index) => (
          <QuestionItem
            key={item.id}
            moveCard={moveCard}
            index={index}
            {...item}
          />
        ))}
      </div>
    </DndProvider>
  );
};

export default QuestionDnd;
