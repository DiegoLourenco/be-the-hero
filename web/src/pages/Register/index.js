import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import { useToasts } from "react-toast-notifications";
import { useForm } from "react-hook-form";

import api from "../../services/api";
import "./styles.css";

import logoImg from "../../assets/logo.svg";

export default function Register({ history }) {
  const { addToast } = useToasts();
  const { register, handleSubmit, errors } = useForm();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [city, setCity] = useState("");
  const [uf, setUf] = useState("");

  async function handleRegister() {
    const data = { name, email, whatsapp, city, uf };

    try {
      let response = await api.post("ongs", data);
      const { id } = response.data;

      addToast(`Seu ID de acesso é ${id}`, {
        appearance: "success"
      });

      history.push("/");
    } catch (err) {
      console.error(err);
      addToast("Não foi possível completar seu cadastro, tente novamente!", {
        appearance: "error"
      });
    } finally {
      setName("");
      setEmail("");
      setWhatsapp("");
      setCity("");
      setUf("");
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />

          <h1>Cadastro</h1>
          <p>
            Faço seu cadastro, entre na plataforma e ajude pessoas a encontrarem
            os casos da sua ONG.
          </p>

          <Link to="/" className="button-link">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para o logon
          </Link>
        </section>
        <form onSubmit={handleSubmit(handleRegister)}>
          <input
            className={errors.name && "invalid-feedback"}
            name="name"
            placeholder="Nome da ONG"
            value={name}
            onChange={e => setName(e.target.value)}
            ref={register({ required: true })}
          />
          <input
            className={errors.email && "invalid-feedback"}
            name="email"
            type="email"
            placeholder="E-mail"
            value={email}
            ref={register({ required: true })}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            className={errors.Whatsapp && "invalid-feedback"}
            name="Whatsapp"
            placeholder="Whatsapp"
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
            ref={register({ required: true })}
          />
          <div className="input-group">
            <input
              className={errors.city && "invalid-feedback"}
              name="city"
              placeholder="Cidade"
              value={city}
              onChange={e => setCity(e.target.value)}
              ref={register({ required: true })}
            />
            <input
              className={errors.uf && "invalid-feedback"}
              name="uf"
              placeholder="UF"
              style={{ width: 80 }}
              value={uf}
              onChange={e => setUf(e.target.value)}
              ref={register({ required: true })}
            />
          </div>

          <button className="button" type="submit">
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
}
