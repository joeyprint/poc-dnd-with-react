import { useState, useCallback, useRef } from "react";
import { DndProvider, useDrop, useDrag } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { XYCoord, Identifier } from "dnd-core";

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

enum ItemTypes {
  QUESTION = "QUESTION",
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

const QuestionItem = ({
  id,
  question,
  index,
  moveCard,
}: {
  id: string;
  question: string;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: ItemTypes.QUESTION,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.QUESTION,
    item: () => {
      return { id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <div ref={ref} data-handler-id={handlerId} style={{ opacity }}>
      <p style={{ fontSize: 16 }}>{`${index + 1} ${question}`}</p>
    </div>
  );
};

const ReactDnd = () => {
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

export default ReactDnd;
