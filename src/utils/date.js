const DateBR = () => {
  return new Date().toLocaleString("pt-BR");
};

const DateISO = () => {
  return new Date().toISOString();
};

export { DateBR, DateISO };