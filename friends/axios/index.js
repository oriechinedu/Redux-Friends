import axios from 'axios';

export default function () {
  const token = localStorage.getItem('token')
    ? localStorage.getItem('token')
    : '';

  const instance = axios.create({
    headers: {
      Authorization: token,
    },
  });

  return instance;
}