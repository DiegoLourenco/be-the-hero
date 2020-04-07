import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useToasts } from "react-toast-notifications";
import { Link } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

import api from "../../services/api";
import auth from "../../utils/auth";

import "./styles.css";

import logoImg from "../../assets/logo.svg";
import heroesImg from "../../assets/heroes.png";

export default function Logon({ history }) {
  const [id, setId] = useState("");
  const { register, handleSubmit, errors } = useForm();
  const { addToast } = useToasts();

  useEffect(() => {
    if (auth()) history.push("/profile");
  }, [history]);

  async function handleLogin() {
    try {
      const response = await api.post("login", { id });

      localStorage.setItem("ongId", id);
      localStorage.setItem("ongName", response.data.name);

      addToast("Login efetuado com sucesso!", {
        appearance: "success",
        autoDismiss: true
      });

      history.push("/profile");
    } catch (err) {
      console.error(err);

      addToast("Falha no login, tente novamente!", {
        appearance: "error",
        autoDismiss: true
      });
    }
  }

  return (
    <div className="logo-container">
      <section className="form">
        <img src={logoImg} alt="Be The Hero" />

        <form onSubmit={handleSubmit(handleLogin)}>
          <h1>Faça seu Logon</h1>

          <input
            name="id"
            placeholder="Sua ID"
            className={errors.id && "invalid-feedback"}
            value={id}
            onChange={e => setId(e.target.value)}
            ref={register({ required: true })}
          />
          <button className="button" type="submit">
            Entrar
          </button>

          <Link to="/register" className="button-link">
            <FiLogIn size={16} color="#E02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>
      <img src={heroesImg} alt="Heroes" />
    </div>
  );
}
