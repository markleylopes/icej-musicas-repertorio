export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export const getFilteredMusics = (arrayValues, filter) =>
  arrayValues
    .filter((i) => i.title.toLowerCase().includes(filter.toLowerCase()))
    .map((i) => {
      return { ...i, title: capitalizeFirstLetter(i.title) };
    });
