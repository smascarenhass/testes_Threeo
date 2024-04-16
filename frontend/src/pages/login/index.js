import React, { useState } from "react";
import "./styles/index.css";
import { loginUser } from "./requests/login";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser(email, password);
      if (response.status) {
        localStorage.setItem("userLogado", true);
        localStorage.setItem("jwt", response.access_token);
        window.location.href = "./home";
      } else {
        setErrorMessage("Credenciais inválidas!");
      }
    } catch (error) {
      console.error("Erro no processo de login:", error);
    }
  };

  return (
    <div className="App">
      <form className="form_login" onSubmit={handleSubmit}>
        <p className="title_login">Login Threeo</p>
        <div className="flex_column">
          <label>Email</label>
        </div>
        <div className="inputForm">

          <input
            type="text"
            className="input"
            name="email"
            placeholder="Email"
            required
            value={email}
            onChange={handleChangeEmail}
          />
        </div>

        <div className="flex_column">
          <label>Senha</label>
        </div>
        <div className="inputForm">
          <input
            type="password"
            className="input"
            name="password"
            placeholder="Senha"
            required
            value={password}
            onChange={handleChangePassword}
          />
        </div>

        <button className="button_submit" type="submit">
          Entrar
        </button>
        
        {errorMessage && <p className="error_message">{errorMessage}</p>}
      </form>
    </div>
  );
}
