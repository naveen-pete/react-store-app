const API_URL = 'http://localhost:3001/products';

export const getAll = () => {
  return fetch(API_URL).then(response => response.json() || []);
};

export const get = id => {
  return fetch(`${API_URL}/${id}`).then(response => {
    const product = response.ok ? response.json() : {};
    return product;
  });
};

export const add = product => {
  return fetch(`${API_URL}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product)
  }).then(response => response.json() || {});
};

export const update = product => {
  return fetch(`${API_URL}/${product.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product)
  }).then(response => response.json() || {});
};

export const remove = id => {
  return fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  }).then(response => response.json() || {});
};
