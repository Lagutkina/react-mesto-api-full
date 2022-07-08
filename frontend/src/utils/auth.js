export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = ({ email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      password,
      email,
    }),
  })
    .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

export const authorize = ({ email, password }) => {
  return (
    fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      // .then((response) => {
      //   return response.json();
      // })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
        }
        return data;
      })
      .catch((err) => {
        console.log(err);
        throw err;
      })
  );
};

export const getMe = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
      throw err;
    });
};
