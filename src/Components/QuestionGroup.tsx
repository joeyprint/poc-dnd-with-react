import { useMemo, useRef } from "react";
import { useDrop, useDrag } from "react-dnd";

import { XYCoord, Identifier } from "dnd-core";
import QuestionItem from "./QuestionItem";

interface DragItem {
  index: number;
  id: string;
  type: string;
}

type QuestionGroupProps = {
  groupIndex: number;
  section: {
    section: string;
    items: any[];
  };
  moveSectionCard: (dragIndex: number, hoverIndex: number) => void;
  moveQuestionCard: (dragIndex: number, hoverIndex: number) => void;
};

const QuestionGroup = (props: QuestionGroupProps) => {
  const { groupIndex, section, moveQuestionCard, moveSectionCard } = props;
  const { section: sectionName, items } = useMemo(() => section, [section]);

  const questionGroupRef = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag, preview] = useDrag({
    type: "QuestionGroup",
    item: () => ({ section: sectionName, groupIndex }),
    collect: (monitor: any) => ({ isDragging: monitor.isDragging() }),
  });

  const [{ handlerId: handlerSectionGroupId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: "QuestionGroup",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!questionGroupRef.current) return;

      const dragIndex = item.index;
      const hoverIndex = groupIndex;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) return;
      console.log({ dragIndex, hoverIndex });

      // // Determine rectangle when hover on screen
      // const hoverRectBounding =
      //   questionGroupRef.current?.getBoundingClientRect();
      // // console.log({ hoverRectBounding });

      // // Set vertical middle rectangle
      // const hoverMiddleRect =
      //   (hoverRectBounding.bottom - hoverRectBounding.top) / 2;
      // // console.log({ hoverMiddleRect });

      // // Determine mouse positioning
      // const clientOffset = monitor.getClientOffset();
      // // console.log({ clientOffset });

      // // Get pixels to the top
      // const hoverClient = (clientOffset as XYCoord).y - hoverRectBounding.top;
      // // console.log({ hoverClient });

      // // // Dragging downwards
      // if (dragIndex < hoverIndex && hoverClient < hoverMiddleRect) {
      //   return;
      // }

      // // // Dragging upwards
      // if (dragIndex > hoverIndex && hoverClient > hoverMiddleRect) {
      //   return;
      // }

      // Time to actually perform the action
      moveSectionCard(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  const opacity = isDragging ? 0 : 1;
  const cursor = isDragging ? "grabbing" : "grab";

  drag(drop(questionGroupRef));

  return (
    <div
      ref={preview}
      data-handler-id={handlerSectionGroupId}
      style={{ opacity, cursor, background: "white", padding: "16px" }}
    >
      <p ref={questionGroupRef} style={{ fontSize: 20, fontWeight: 600 }}>
        {sectionName}
      </p>
      {items.map((item: any, index: number) => (
        <div key={`indicator-${index}`}>
          <p style={{ fontSize: 16, fontWeight: 600 }}>{item.indicator}</p>
          {item.questions.map((question: any, questionIndex: number) => (
            <QuestionItem
              key={question.id}
              moveCard={moveQuestionCard}
              index={questionIndex}
              {...question}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default QuestionGroup;
