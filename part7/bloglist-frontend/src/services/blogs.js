import axios from "axios";

const baseUrl = "/api/blogs";

/* To be used when switching to redux */
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
/** To be used when switching to redux */

function getToken() {
  return `Bearer ${JSON.parse(window.localStorage.getItem("loggedBlogappUser"))?.token}`;
}

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: getToken() },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async ({ id, newObject }) => {
  const config = {
    headers: { Authorization: getToken() },
  };

  const response = await axios.put(`${baseUrl}/${id}`, newObject, config);
  return response.data;
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: getToken() },
  };

  await axios.delete(`${baseUrl}/${id}`, config);
  return id;
};

export default { getAll, create, update, remove, setToken };
