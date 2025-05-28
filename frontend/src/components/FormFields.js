import { useState } from "react";
import { useInfo } from "../context/InfoContext";
import { useGeolocation } from "../hooks/useGeolocation";
import { useTicketsContext } from "../hooks/useTicketsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const FormFields = () => {
  const { categorias } = useInfo();

  const { user } = useAuthContext();

  const [formData, setFormData] = useState({
    description: "",
    type: "pedido",
    category: "",
    formaContacto: "",
  });

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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
    <div className="contact-container">
      <form onSubmit={handleAddTicket} className="form-add-inputs">
        <div className="form-content">
          <div className="form-fields">
            <div className="form-field">
              <label>
                <span>O que pretende publicar?</span>

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
              <label>
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
            <label>
              <span>Descreva o que precisa ou o que oferece</span>
              <textarea
                disabled={isLoading}
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={3}
                style={{ overflow: "hidden", resize: "none" }}
                placeholder='Ex.: "Preciso de boleia para o centro médico"'
              />
            </label>
          </div>

          <div className="form-fields">
            <div className="form-field">
              <label>
                <span>Como prefere ser contactado?</span>
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
              <span>Pode indicar um número de telefone ou e-mail.</span>
            </div>
          </div>

          {/* <div className="form-field form-field-radio">
              <input type="radio" value="" id="radio" />
              <label htmlFor="radio">Quero permanecer anónimo</label>
            </div> */}

          <div className="form-action">
            <button
              disabled={isLoading}
              className="btn btn-primary btn-form-add"
            >
              {isLoading ? <span>Enviando...</span> : <span>Enviar</span>}
            </button>
          </div>
        </div>
      </form>

      {createdTicket && (
        <div className="success-message">
          <p>
            Pedido criado com sucesso!
            <a href={`/pedido/${createdTicket._id}`} className="link-detalhes">
              Ver detalhes
            </a>
          </p>
        </div>
      )}

      {error && <div className="error">{error}</div>}
      {locationError && <div className="error">{locationError}</div>}
    </div>
  );
};

export default FormFields;
