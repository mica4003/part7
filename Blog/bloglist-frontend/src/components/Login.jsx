import { useState } from "react";
import styled from 'styled-components'

const Input = styled.input`
  margin: 0.5em;
  padding: 5px;
`

const Login = ({ doLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    doLogin({ username, password });
    setUsername("");
    setPassword("");
  };

  return (
    <form onSubmit={handleLogin}>
      <label>
        Username:
        <Input
          type="text"
          data-testid="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </label>
      <label>
        Password:
        <Input
          type="password"
          value={password}
          data-testid="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </label>
      <Input type="submit" value="Login" />
    </form>
  );
};

export default Login;
