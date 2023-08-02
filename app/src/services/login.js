import axios from "axios";

//const baseUrl = "http://localhost:3030/api/login";

const baseUrl = "/api/login"; //como ya  todo se corre en el mismo puerto no es necesario el localhost:XXXX

const login = async (credentials) => {
  //console.log(credentials);
  const { data } = await axios.post(baseUrl, credentials);
//   console.log("data");
//   console.log(data);
  return data;
};

export default { login };
