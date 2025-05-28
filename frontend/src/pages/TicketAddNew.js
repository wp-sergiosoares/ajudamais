import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

import { useTicketsContext } from "../hooks/useTicketsContext";

import { useInfo } from "../context/InfoContext";

import { useGeolocation } from "../hooks/useGeolocation";

const TicketAddNew = () => {
  const { categorias } = useInfo();

  const navigate = useNavigate(); // hook de navegaçã

  const { user } = useAuthContext();

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    description: "",
    type: "pedido",
    category: "",
    formaContacto: "",
  });

  const [createdTicket, setCreatedTicket] = useState(null);
  const { dispatch } = useTicketsContext();
  const { location, locationError } = useGeolocation();

  const validateForm = () => {
    if (!formData.description || !formData.type || !formData.category) {
      setError("por favor, preencha todos os campos obrigatórios.");
      return false;
    }
    return true;
  };

  const handleAddTicket = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    if (!validateForm()) return;

    const ticket = {
      typeOfTicket: formData.type,
      description: formData.description,
      location,
      formaContacto: formData.formaContacto,
      category: formData.category,
    };

    setIsLoading(true);

    try {
      const response = await fetch("/api/tickets/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(ticket),
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.message || "Erro ao criar ticket.");
        return;
      }

      if (response.ok) {
        console.log("JSON da resposta:", json);

        setCreatedTicket(json);
        dispatch({ type: "CREATE_TICKET", payload: json });

        setFormData({
          description: "",
          type: "",
          category: "",
          formaContacto: "",
        });

        setIsLoading(false);
      }
    } catch (error) {
      setError("Erro ao conectar com o servidor");
      setIsLoading(false);
    }
  };

  return (
    <div className="page-center page-center-small">
      <div className="page-header">
        <h1>Adicione</h1>
        <button
          onClick={() => navigate(-1)}
          className="btn btn-small btn-secondary"
        >
          <span class="material-symbols-outlined">keyboard_arrow_left</span>
        </button>
      </div>
      <div className="contact-container">
        <form onSubmit={handleAddTicket} className="form-add-inputs">
          <div className="form-content">
            <div className="form-fields">
              <div className="form-field">
                <label htmlFor="type" className="sr-only">
                  <span>Pedido ou oferta?</span>

                  <select
                    id="type"
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                    disabled={isLoading}
                  >
                    <option value="">Selecione o tipo</option>
                    <option value="pedido">Pedido</option>
                    <option value="oferta">Oferta</option>
                  </select>
                </label>
              </div>
              <div className="form-field">
                <label htmlFor="category" className="sr-only">
                  <span>Categorias</span>

                  <select
                    disabled={isLoading}
                    id="category"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                  >
                    <option value="">Todas as Categorias</option>
                    {categorias.map((cat, index) => (
                      <option key={index} value={cat.id}>
                        {cat.nome}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="description">
                <span>Descrição</span>
                <textarea
                  disabled={isLoading}
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                  style={{ overflow: "hidden", resize: "none" }}
                  placeholder="Descreve o teu pedido..."
                />
              </label>
            </div>

            <div className="form-fields">
              <div className="form-field">
                <label htmlFor="contacto">
                  <span>Forma de Contacto</span>
                  <input
                    type="text"
                    id="contacto"
                    placeholder="Número de telemóvel ou email..."
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        formaContacto: e.target.value,
                      })
                    }
                    value={formData.formaContacto}
                  />
                </label>
              </div>
              <div className="form-field"></div>
            </div>

            {/* <div className="form-field form-field-radio">
              <input type="radio" value="" id="radio" />
              <label htmlFor="radio">Quero permanecer anónimo</label>
            </div> */}

            <div className="form-action">
              {/* <select name="" id="">
                <option value="">Pedir Ajuda</option>
                <option value="">Oferecer Ajuda</option>
              </select> */}

              <button
                disabled={isLoading}
                className="btn btn-primary btn-form-add"
              >
                {isLoading ? <span>⏳ Enviando...</span> : <span>Enviar</span>}
              </button>
            </div>
          </div>
        </form>
      </div>

      {createdTicket && (
        <div className="success-message">
          <p>
            ✅ Pedido criado com sucesso!{" "}
            <a href={`/pedido/${createdTicket._id}`} className="link-detalhes">
              Ver detalhes
            </a>
          </p>
        </div>
      )}

      {error && <div className="error">{error}</div>}
      {locationError && <div className="error">{locationError}</div>}
      {/* {ticketNovo && (
        <div className="mt-6 p-4 border rounded bg-green-50">
          <h3 className="text-lg font-semibold">Pedido Criado:</h3>
          <p>{ticketNovo.title}</p>
          <p>
            <strong>Descrição:</strong> {ticketNovo.description}
          </p>
          {ticketNovo.category}
          {ticketNovo.cidade}
          <p>
            <strong>Status:</strong> {ticketNovo.status}
          </p>
          <p>{ticketNovo.location.coordinates[0]}</p>
          <p>{ticketNovo.location.coordinates[1]}</p>
        </div>
      )} */}
    </div>
  );
};

export default TicketAddNew;
