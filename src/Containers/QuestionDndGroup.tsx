import { tidy, groupBy, summarize } from "@tidyjs/tidy";
import { useCallback, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import QuestionGroup from "../Components/QuestionGroup";
import { mockUpData } from "../Utils/mockUpData";

const QuestionDndGroup = () => {
  const { questions } = mockUpData;

  const splitGroups = tidy(
    questions,
    groupBy(
      ["section", "indicator"],
      summarize({ questions: (items) => items })
    )
  );

  const sectionGroups = tidy(
    splitGroups,
    groupBy(
      ["section"],
      summarize({
        items: (items) =>
          items.map((item) => ({
            indicator: item.indicator,
            questions: item.questions,
          })),
      })
    )
  );

  const [_sectionGroup, setSectionGroup] = useState(sectionGroups);
  // const [_questions, setQuestions] = useState(sectionGroups);

  console.log({ sectionGroups: _sectionGroup });

  const moveSectionCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      setSectionGroup((sectionList) => {
        const result = Array.from(sectionList);
        const [removed] = result.splice(dragIndex, 1);
        result.splice(hoverIndex, 0, removed);
        return result;
      });
    },
    []
  );

  const moveQuestionCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      // setQuestions((questionList) => {
      //   const result = Array.from(questionList);
      //   const [removed] = result.splice(dragIndex, 1);
      //   result.splice(hoverIndex, 0, removed);
      //   return result;
      // });
    },
    []
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        {_sectionGroup.map((section, index) => (
          <QuestionGroup
            key={`section-${index}`}
            section={section}
            moveQuestionCard={moveQuestionCard}
            moveSectionCard={moveSectionCard}
            groupIndex={index}
          />
        ))}
      </div>
    </DndProvider>
  );
};

export default QuestionDndGroup;
