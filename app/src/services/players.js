import axios from "axios";
const baseUrl = "/api/players";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const req = axios.get(baseUrl);
  return req.then((res) => res.data);
};

const create = (newObject) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const req = axios.post(baseUrl, newObject, config) /*.catch(e => {
    const {response} = e;
    const {status} = response;
    
  });*/
  return req.then((res) => res.data)
};

const update = (id, newObject) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const req = axios.put(`${baseUrl}/${id}`, newObject, config);
  return req.then((res) => res.data);
};

export default { getAll, create, update, setToken };
