import React, { useState, useEffect } from "react";
import Player from "./components/Player";
import Notification from "./components/Notification";
import playerService from "./services/players";
import LoginForm from "./components/LoginForm";
import PlayerForm from "./components/PlayerForm";

function App() {
  const [players, setPlayers] = useState([]);

  const [errorMsg, setErrorMsg] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    playerService.getAll().then((initialPlayers) => {
      setPlayers(initialPlayers);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedPlayerAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      // console.log("user");
      // console.log(user);
      setUser(user);
      playerService.setToken(user.token);
    }
  }, []);

  const handleLogout = () => {
    setUser(null);
    playerService.setToken(user.token);
    window.localStorage.removeItem("loggedPlayerAppUser");
  };

  const addPlayer = (playerObject) => {
    playerService
      .create(playerObject)
      .then((returnedPlayer) => {
        setPlayers(players.concat(returnedPlayer));
      })
      .catch((e) => {
        const { response } = e;
        const { status } = response;
        //console.log(status);
        if (status === 401) {
          handleLogout();
        }
      });
  };



  const Login = (user) => {
    try {
      console.log(user)
      window.localStorage.setItem("loggedPlayerAppUser", JSON.stringify(user));

      playerService.setToken(user.token);

      setUser(user);

    } catch (error) {
      console.log('error');
      setErrorMsg(
        "problemas al autenticar, ingrese usuario y/o contraseña válidos"
      );

      setTimeout(() => {
        setErrorMsg(null);
      }, 5000);
    }
  };

  return (
    <div>
      <h1>Players</h1>
      <Notification message={errorMsg} />
      {user === null ? (
        <LoginForm
          Login={Login}
        />
      ) : (
        <PlayerForm
           addPlayer={addPlayer}
           handleLogout={handleLogout}
        />
      )}
      {/*console.log(players)*/}
      <ul>
        {players.map((player, id) => (
          <Player key={id} player={player} />
        ))}
      </ul>
    </div>
  );
}

export default App;
