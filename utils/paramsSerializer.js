import qs from 'qs';

const paramsSerializer = params => {
  return qs.stringify(params, {
    arrayFormat: 'brackets',
  });
};

export default paramsSerializer;
