import { Fragment, useRef } from "react";
import { useDrag } from "react-dnd";

import DropZone from "./DropZone";
import QuestionRowGroup from "./QuestionRowGroup";

type RowProps = {
  data: any;
  onDropItem: (data: any, item: any) => void;
  path: string;
};

const SectionRowGroup = (props: RowProps) => {
  const { data, onDropItem, path } = props;

  const rowRef = useRef(null);

  const [{ isDragging }, drag, preview] = useDrag({
    type: "Section",
    item: {
      type: "Section",
      section: data.section,
      items: data.items,
      path,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(rowRef);

  return (
    <div ref={preview} style={{ opacity }} className="base draggable row">
      <p ref={rowRef} style={{ fontSize: 20, fontWeight: 600 }}>
        {data.section}
      </p>
      {data.items.map((indicator: any, indicatorIndex: number) => (
        <Fragment key={`indicator-${indicatorIndex}`}>
          <p style={{ fontSize: 16, fontWeight: 600 }}>{indicator.indicator}</p>
          <div style={{ padding: "0px 16px" }}>
            {indicator.items.map((question: any, questionIndex: number) => {
              const currentPath = `${path}-${indicatorIndex}-${questionIndex}`;

              return (
                <Fragment key={`indicator-${questionIndex}`}>
                  <DropZone
                    data={{
                      path: currentPath,
                      childrenCount: indicator.items.length,
                    }}
                    onDropItem={onDropItem}
                  />
                  <QuestionRowGroup data={question} path={currentPath} />
                </Fragment>
              );
            })}
            <DropZone
              data={{
                path: `${path}-${indicatorIndex}-${indicator.items.length}`,
                childrenCount: indicator.items.length,
              }}
              isLast
              onDropItem={onDropItem}
            />
          </div>
        </Fragment>
      ))}
    </div>
  );
};

export default SectionRowGroup;
