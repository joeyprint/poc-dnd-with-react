export const reorder = (list: any, startIndex: number, endIndex: number) => {
  console.log({ list });
  const result = Array.from(list);
  console.log("result array ftom >>>", { result });
  const [removed] = result.splice(startIndex, 1);

  if (endIndex === 0) {
    result.splice(endIndex, 0, removed);
  } else {
    result.splice(endIndex - 1, 0, removed);
  }
  console.log({ result });
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
