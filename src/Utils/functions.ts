export const reorder = (list: any, startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);

  if (startIndex <= endIndex) {
    result.splice(endIndex - 1, 0, removed);
  } else {
    result.splice(endIndex, 0, removed);
  }

  return result;
};

export const reorderChildren = (
  children: any,
  splitDropZonePath: string[],
  splitItemPath: string[]
) => {
  if (splitDropZonePath.length === 1) {
    const dropZoneIndex = Number(splitDropZonePath[0]);
    const itemIndex = Number(splitItemPath[0]);
    console.log({ itemIndex, dropZoneIndex });
    return reorder(children, itemIndex, dropZoneIndex);
  }

  const updatedChildren = [...children];

  const curIndex = Number(splitDropZonePath.slice(0, 1));

  // Update the specific node's children
  const splitDropZoneChildrenPath = splitDropZonePath.slice(1);
  const splitItemChildrenPath = splitItemPath.slice(1);
  const nodeChildren = updatedChildren[curIndex];
  updatedChildren[curIndex] = {
    ...nodeChildren,
    items: reorderChildren(
      nodeChildren.items,
      splitDropZoneChildrenPath,
      splitItemChildrenPath
    ),
  };

  return updatedChildren;
};

export const handleMoveWithinParent = (
  sectionGroup: any,
  splitDropZonePath: string[],
  splitItemPath: string[]
) => {
  return reorderChildren(sectionGroup, splitDropZonePath, splitItemPath);
};
