import axios from "axios";

const baseUrl = "/api/users";

let store;
let token = null;

export const injectUserStore = (_store) => {
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

const getById = (id) => {
  const request = axios.get(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

export default { getAll, getById, setToken };
