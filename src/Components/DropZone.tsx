import React from "react";
import { DropTargetMonitor, useDrop } from "react-dnd";

const ACCEPTS = ["Section", "Question"];

type DropZoneProps = {
  data: {
    path: string;
    childrenCount: number;
  };
  onDropItem: (data: any, item: any) => void;
  isLast?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

const DropZone = (props: DropZoneProps) => {
  const { data, onDropItem, isLast, ...restProps } = props;
  const [{ isOver, canDrop }, drop] = useDrop(() => {
    return {
      accept: ACCEPTS,
      drop: (item: any) => {
        onDropItem(data, item);
      },
      canDrop: (item: any) => {
        const dropZonePath = data.path;
        const splitDropZonePath = dropZonePath.split("-");
        const itemPath = item.path;

        if (!itemPath) {
          return true;
        }

        const splitItemPath = itemPath.split("-");

        // Invalid (Can't drop a parent element (row) into a child (column))
        // const parentDropInChild = splitItemPath.length < splitDropZonePath.length;
        // if (parentDropInChild) return false;

        // Current item can't possible move to it's own location
        if (itemPath === dropZonePath) return false;

        // Current area
        if (splitItemPath.length === splitDropZonePath.length) {
          const pathToItem = splitItemPath.slice(0, -1).join("-");
          const currentItemIndex = Number(splitItemPath.slice(-1)[0]);

          const pathToDropZone = splitDropZonePath.slice(0, -1).join("-");
          const currentDropZoneIndex = Number(splitDropZonePath.slice(-1)[0]);

          if (pathToItem === pathToDropZone) {
            const nextDropZoneIndex = currentItemIndex + 1;
            if (nextDropZoneIndex === currentDropZoneIndex) return false;
          }
        }

        return true;
      },
      collect: (monitor: DropTargetMonitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    };
  }, [onDropItem]);

  const isActive = isOver && canDrop;

  return (
    <div
      className={`dropZone ${isActive || (isActive && isLast) ? "active" : ""}`}
      ref={drop}
      {...restProps}
    />
  );
};

export default DropZone;
