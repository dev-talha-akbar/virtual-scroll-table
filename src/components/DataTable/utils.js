const findMaxLength = (arr, breakAt) => {
  return arr.reduce((maxLength, string) => {
    const breakCharacter = breakAt || " ";
    const breakCharacterIndex = string.indexOf(breakCharacter);
    const currentLength =
      breakCharacterIndex === -1 ? string.length : breakCharacterIndex + 1;
    return currentLength > maxLength ? currentLength : maxLength;
  }, 0);
};

export const calculateMinWidths = (cols, rows, summary) => {
  return cols.reduce((minWidths, col) => {
    if (!col.minWidth) {
      const maxLength = findMaxLength(
        rows.map(row => row[col.key]),
        col.breakAt
      );
      minWidths.push(2 + Math.max(maxLength, summary[col.key].length));
    } else {
      minWidths.push(col.minWidth);
    }

    return minWidths;
  }, []);
};

export const generateGridTemplate = (minWidths, maxWidths) => {
  return minWidths.reduce((gridTemplateColumns, minWidth, i) => {
    gridTemplateColumns += `minmax(${minWidth}ch, ${
      maxWidths[i] ? `${maxWidths[i]}` : "1fr"
    })`;
    return gridTemplateColumns;
  }, "");
};
