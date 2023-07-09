import axios from 'axios';

const baseUrl = '';

const token = () => {
  if (localStorage.getItem('token')) {
    return `token ${localStorage.getItem('tokens')}`;
  }
  return undefined;
};

export const Post = (domain, Params) =>
  axios
    .post(baseUrl + domain, Params, {
      headers: {
        Authorization: token(),
      },
      origin: '127.0.0.1.8000',
    })
    .then((res) => res.data);

export const Get = (domain) =>
  axios
    .get(baseUrl + domain, {
      headers: {
        Authorization: token(),
      },
      origin: '127.0.0.1.8000',
    })
    .then((res) => res.data);

export const Delete = (domain, Params) =>
  axios
    .delete(baseUrl + domain, {
      headers: {
        Authorization: token(),
      },
      data: Params,
    })
    .then((res) => res.data);

export const Put = (domain, Params) =>
  axios
    .put(baseUrl + domain, Params, {
      headers: {
        Authorization: token(),
      },
    })
    .then((res) => res.data);
