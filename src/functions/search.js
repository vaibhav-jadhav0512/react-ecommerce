export const searched = (keyword) => (c) =>
  c.name.toLowerCase().includes(keyword);
