const truncate = (text: string, maxLength = 200) => {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trimEnd()}...`;
};

export { truncate };
