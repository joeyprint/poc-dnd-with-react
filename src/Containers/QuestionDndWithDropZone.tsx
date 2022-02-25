import { Fragment, useCallback, useState } from "react";
import { groupBy, summarize, tidy } from "@tidyjs/tidy";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import DropZone from "../Components/DropZone";
import { mockUpData } from "../Utils/mockUpData";
import SectionRowGroup from "../Components/SectionRowGroup";
import { handleMoveWithinParent } from "../Utils/functions";

const QuestionDndWithDropZone = () => {
  const { questions } = mockUpData;

  const splitGroups = tidy(
    questions,
    groupBy(["section", "indicator"], summarize({ items: (items) => items }))
  );

  const sectionGroups = tidy(
    splitGroups,
    groupBy(
      ["section"],
      summarize({
        items: (items) =>
          items.map((item) => ({
            indicator: item.indicator,
            items: item.items,
          })),
      })
    )
  );

  const [_sectionGroup, setSectionGroup] = useState(sectionGroups);

  const handleDropItem = useCallback(
    (dropZone, item) => {
      console.log("dropZone", dropZone);
      console.log("item", item);

      const splitDropZonePath = dropZone.path.split("-");
      const pathToDropZone = splitDropZonePath.slice(0, -1).join("-");

      const newItem = {
        id: item.id,
        section: item.section,
        items: item.items,
        type: item.type,
      };

      // Drop Section & Question
      if (item.type === "Section" || item.type === "Question") {
        newItem.items = item.items;
      }

      // move down here since sidebar items dont have path
      const splitItemPath = item.path.split("-");
      const pathToItem = splitItemPath.slice(0, -1).join("-");

      // Pure move (no create)
      if (splitItemPath.length === splitDropZonePath.length) {
        if (pathToItem === pathToDropZone) {
          setSectionGroup(
            handleMoveWithinParent(
              _sectionGroup,
              splitDropZonePath,
              splitItemPath
            )
          );
          return;
        }
      }

      return;
    },
    [_sectionGroup]
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        {_sectionGroup.map((section, sectionIndex) => {
          const currentPath = `${sectionIndex}`;

          return (
            <Fragment key={`section-${sectionIndex}`}>
              <DropZone
                data={{
                  path: currentPath,
                  childrenCount: _sectionGroup.length,
                }}
                onDropItem={handleDropItem}
              />
              <SectionRowGroup
                data={section}
                onDropItem={handleDropItem}
                path={currentPath}
              />
            </Fragment>
          );
        })}
        <DropZone
          data={{
            path: `${_sectionGroup.length}`,
            childrenCount: _sectionGroup.length,
          }}
          isLast
          onDropItem={handleDropItem}
        />
      </div>
    </DndProvider>
  );
};

export default QuestionDndWithDropZone;
