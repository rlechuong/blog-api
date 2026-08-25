const formatDate = (isoString: string) => {
  return new Date(isoString).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatDateShort = (isoString: string) => {
  return new Date(isoString).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const formatDateTime = (isoString: string) => {
  return new Date(isoString).toLocaleString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

export { formatDate, formatDateShort, formatDateTime };
