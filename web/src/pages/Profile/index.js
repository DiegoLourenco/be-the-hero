import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { FiPower, FiEdit2, FiTrash2 } from "react-icons/fi";

import api from "../../services/api";

import "./styles.css";
import logoImg from "../../assets/logo.svg";

import auth from "../../utils/auth";

export default function Profile({ history }) {
  const ongId = localStorage.getItem("ongId");
  const ongName = localStorage.getItem("ongName");
  const [incidents, setIncidents] = useState([]);

  const { addToast } = useToasts();

  useEffect(() => {
    if (!auth()) {
      addToast("Autenticação obrigatória!", { appearance: "error" });
      history.push("/");
    }

    api
      .get("profile", {
        headers: {
          Authorization: ongId
        }
      })
      .then(response => {
        setIncidents(response.data);
      });
  }, [history, addToast, ongId]);

  async function handleEditIncident(incident) {
    history.push(`incidents/${incident.id}`, incident);
  }

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: { Authorization: ongId }
      });

      setIncidents(incidents.filter(incident => incident.id !== id));
      addToast("Caso removido com sucesso!", {
        appearance: "success",
        autoDismiss: true
      });
    } catch (error) {
      addToast("Erro ao deletar o caso, tente novamente.", {
        appearance: "error",
        autoDismiss: true
      });
    }
  }

  function handleLogout() {
    localStorage.clear();
    history.push("/");
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero" />
        <span>
          Bem vindo, {ongName} <br />
          <small>Seu ID: {ongId}</small>
        </span>

        <Link to="/incidents/new" className="button">
          Cadastrar novo caso
        </Link>
        <button type="button" onClick={handleLogout}>
          <FiPower size={18} color="#e02041" />
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>

            <strong>VALOR:</strong>
            <p>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL"
              }).format(incident.value)}
            </p>

            <div className="actions">
              <button
                type="button"
                title="Editar"
                onClick={() => handleEditIncident(incident)}
              >
                <FiEdit2 size={20} color="#a8a8b3" />
              </button>
              <button
                type="button"
                title="Remover"
                onClick={() => handleDeleteIncident(incident.id)}
              >
                <FiTrash2 size={20} color="#a8a8b3" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
