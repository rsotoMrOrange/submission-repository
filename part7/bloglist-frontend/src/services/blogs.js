import axios from "axios";

const baseUrl = "/api/blogs";

let store;
let token = null;

export const injectStore = (_store) => {
  store = _store;
  store.subscribe(listener);
};

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

function listener() {
  let newToken = store?.getState().user.token;
  setToken(newToken);
}

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.put(`${baseUrl}/${id}`, newObject, config);
  return response.data;
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };

  await axios.delete(`${baseUrl}/${id}`, config);
};

export default { getAll, create, update, remove, setToken };
