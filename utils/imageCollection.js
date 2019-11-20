export const getCollection = data => {
  let arr = [];
  const newArr = [];

  if (!Array.isArray(data)) {
    arr.push(data);
  } else {
    arr = data;
  }

  arr.map(item => {
    if (!!item.lazy.url && !!item.medium.url) {
      newArr.push({
        lazy: item.lazy.url,
        medium: item.medium.url,
      });
    }
    return newArr;
  });

  return newArr;
};

export const setCollection = photo => {
  let srcSets;
  if (photo.url !== null) {
    srcSets = getCollection(photo);
  } else {
    srcSets = [
      {
        lazy: '/static/images/parking_default_lazy.jpg',
        medium: '/static/images/parking_default.jpg',
      },
    ];
  }

  return srcSets;
};
