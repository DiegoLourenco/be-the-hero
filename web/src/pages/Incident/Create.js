import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useToasts } from "react-toast-notifications";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import api from "../../services/api";
import "./styles.css";

import logoImg from "../../assets/logo.svg";

export default function NewIncident({ history }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");

  const ongId = localStorage.getItem("ongId");
  const { register, handleSubmit, errors } = useForm();
  const { addToast } = useToasts();

  async function handleStoreIncident() {
    try {
      const data = {
        title,
        description,
        value
      };

      await api.post("incidents", data, {
        headers: {
          Authorization: ongId
        }
      });

      addToast("Caso salvo com sucesso!", {
        appearance: "success",
        autoDismiss: true
      });

      history.push("/profile");
    } catch (err) {
      console.error(err);
      addToast("Erro ao salvar o caso, tente novamente!", {
        appearance: "error",
        autoDismiss: true
      });
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />

          <h1>Cadastrar novo caso</h1>
          <p>
            Desecreva o caso detalhadamente para encontrar um herói para
            resolver isso.
          </p>

          <Link to="/profile" className="button-link">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar
          </Link>
        </section>
        <form onSubmit={handleSubmit(handleStoreIncident)}>
          <input
            name="title"
            className={errors.title && "invalid-feedback"}
            placeholder="Título do caso"
            value={title}
            onChange={e => setTitle(e.target.value)}
            ref={register({ required: true })}
          />
          <textarea
            name="description"
            className={errors.description && "invalid-feedback"}
            placeholder="Descrição"
            value={description}
            onChange={e => setDescription(e.target.value)}
            ref={register({ required: true })}
          ></textarea>
          <input
            name="value"
            className={errors.value && "invalid-feedback"}
            placeholder="Valor em reais"
            value={value}
            onChange={e => setValue(e.target.value)}
            ref={register({ required: true })}
          />

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
