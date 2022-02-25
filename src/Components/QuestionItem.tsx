import { useRef } from "react";
import { useDrop, useDrag } from "react-dnd";
import { Identifier } from "dnd-core";

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
  order,
  question,
  index,
  moveCard,
}: {
  id: string;
  order: number;
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
  const cursor = isDragging ? "grabbing" : "grab";

  drag(drop(ref));

  return (
    <div ref={ref} data-handler-id={handlerId} style={{ opacity, cursor }}>
      <p style={{ fontSize: 16 }}>{`${order} ${question}`}</p>
    </div>
  );
};

export default QuestionItem;
