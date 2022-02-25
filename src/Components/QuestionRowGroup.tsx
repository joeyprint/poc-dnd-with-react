import { useRef } from "react";
import { useDrag } from "react-dnd";

type RowProps = {
  data: any;
  path: string;
};

const QuestionRowGroup = (props: RowProps) => {
  const { data, path } = props;

  const rowRef = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: "Question",
    item: {
      type: "Question",
      id: data.id,
      path,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(rowRef);

  return (
    <div ref={rowRef} style={{ opacity }} className="base draggable row">
      <p
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          color: "gray",
        }}
      >{`${data.order}. ${data.question}`}</p>
    </div>
  );
};

export default QuestionRowGroup;
