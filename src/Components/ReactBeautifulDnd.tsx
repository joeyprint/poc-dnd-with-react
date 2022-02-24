import { useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";

const QUESTION = [
  { id: "1", question: "Which one is animal" },
  { id: "2", question: "Which one isn't IT gadgets" },
  { id: "3", question: "Which one isn't Apple's products" },
  { id: "4", question: "Which one is Meta's products" },
  { id: "5", question: "What is result of 1 plus 3" },
];

const ReactBeautifulDnd = () => {
  const [_questions, setQuestions] =
    useState<{ id: string; question: string }[]>(QUESTION);

  const reorder = (
    list: { id: string; question: string }[],
    startIndex: number,
    endIndex: number
  ) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result: DropResult) => {
    // the only one that is required
    if (!result.destination) {
      return;
    }

    const reorderQuestions = reorder(
      _questions,
      result.source.index,
      result.destination.index
    );

    setQuestions(reorderQuestions);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={"question-1"} type={"DEFAULT"}>
        {(provided, snapshot) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {_questions.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <p style={{ fontSize: 16 }}>
                      {`${index + 1} ${item.question}`}
                    </p>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ReactBeautifulDnd;
