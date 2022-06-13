export const getToDoList = () =>
  fetch("../data.json").then((response) => response.json());
