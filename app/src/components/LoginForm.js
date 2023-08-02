import React, { useState } from "react";
import Togglable from "./Togglable";
import loginService from "../services/login";
import PropTypes from "prop-types";

export default function LoginForm({Login}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      Login(user);
    } catch (error) {
      console.log("");
      Login(null);
    }

    setUsername("");
    setPassword("");
  };

  return (
    <Togglable btnLabel="Mostrar Login" btnCancel="Ocultar Login">
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={username}
            name="username"
            placeholder="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            name="password"
            placeholder="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="formLoginButton" type="submit">
          Login
        </button>
      </form>
    </Togglable>
  );
}

LoginForm.propType = {
  handleSubmit: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};
