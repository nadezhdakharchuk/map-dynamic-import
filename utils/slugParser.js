const inverse = string => {
  return string
    .toLowerCase()
    .split('-')
    .map(i => i[0].toUpperCase() + i.substr(1))
    .join(' ');
};

export default inverse;
