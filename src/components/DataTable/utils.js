const findMaxLength = arr => {
  return arr.reduce((maxLength, string) => {
    const currentLength = string.length - string.indexOf(" ");
    return currentLength > maxLength ? currentLength : maxLength;
  }, 0);
};

export const calculateMinWidths = (cols, rows) => {
  return cols.reduce((minWidths, col) => {
    if (!col.minWidth) {
      const maxLength = findMaxLength(rows.map(row => row[col.key]));
      minWidths.push(maxLength);
    } else {
      minWidths.push(col.minWidth);
    }

    return minWidths;
  }, []);
};

export const generateGridTemplate = minWidths => {
  return minWidths.reduce((gridTemplateColumns, minWidth) => {
    gridTemplateColumns += `minmax(${minWidth}ch, 1fr)`;
    return gridTemplateColumns;
  }, "");
};
