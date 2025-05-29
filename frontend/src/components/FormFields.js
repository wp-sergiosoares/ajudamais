import { useState } from "react";
import { useInfo } from "../context/InfoContext";
import { useGeolocation } from "../hooks/useGeolocation";
import { useTicketsContext } from "../hooks/useTicketsContext";
import { useAuthContext } from "../hooks/useAuthContext";

// componentes

import TypeSelector from "./form/TypeSelector";
import CategorySelector from "./form/CategorySelector";
import DescriptionField from "./form/DescriptionField";
import ContactField from "./form/ContactField";

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

  const [validInput, setValidInput] = useState(false);
  const [contactoError, setContactoError] = useState("");
  const [temp, setTemp] = useState("");
  const [contactTouched, setContactTouched] = useState(false);

  const handleEmailInput = (e) => {
    const value = e.target.value;

    setTemp(value);
    setContactTouched(true); // agora sabemos que o usuário tocou no campo

    const emailRegex =
      /^([A-Za-z\d\.-]+)@([A-Za-z\d-]+)\.([A-Za-z]{2,6})(\.[A-Za-z]{2,6})?$/;

    const phoneRegex = /^\+?[0-9\s\-()]{9}$/;

    //setValidInput(emailRegex.test(value) || phoneRegex.test(value));

    if (emailRegex.test(value)) {
      setValidInput(true);
      setContactoError("");
      setFormData({ ...formData, formaContacto: value });
    } else {
      setValidInput(false);
      setContactoError("Introduza um email ou número de telefone válido.");
      setFormData({ ...formData, formaContacto: "" });
    }
  };

  console.log(formData.formaContacto);

  const validateForm = () => {
    if (
      !formData.description ||
      !formData.type ||
      !formData.category ||
      !formData.formaContacto
    ) {
      setError("Por favor, preencha todos os campos obrigatórios.");
      return false;
    }

    if (!validInput) {
      setError("Por favor, introduza um contacto válido (email ou telefone).");
      return false;
    }

    return true;
  };

  const handleAddTicket = async (e) => {
    e.preventDefault();

    setIsLoading(true);

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

        setTemp("");
        setContactTouched(false);
        setValidInput(false);
        setContactoError("");

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
            <TypeSelector
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
              disabled={isLoading}
            />

            <CategorySelector
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              disabled={isLoading}
              categorias={categorias}
            />
          </div>

          <DescriptionField
            disabled={isLoading}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder={
              "Ex. Preciso de roupas de bébé. Agradecia toda a ajuda possível."
            }
          />

          <div className="form-fields">
            <ContactField
              placeholder="Número de telemóvel ou email..."
              onChange={(e) => handleEmailInput(e)}
              value={temp}
              contactTouched={contactTouched}
              validInput={validInput}
              contactoError={contactoError}
            />
          </div>

          {/* <div className="form-field form-field-radio">
              <input type="radio" value="" id="radio" />
              <label htmlFor="radio">Quero permanecer anónimo</label>
            </div> */}

          {error && <div className="error">{error}</div>}
          {locationError && <div className="error">{locationError}</div>}

          {createdTicket && (
            <div className="success-message">
              <p>
                Pedido criado com sucesso!
                <a
                  href={`/pedido/${createdTicket._id}`}
                  className="link-detalhes"
                >
                  Ver detalhes
                </a>
              </p>
            </div>
          )}

          <div className="form-action">
            <button
              disabled={isLoading}
              className="btn btn-primary btn-form-add"
            >
              {isLoading ? <span>A enviar...</span> : <span>Enviar</span>}
            </button>
          </div>
        </div>
      </form>

      <div className="info-panel no-bg">
        <p>
          Através da tua descrição irá ser gerado um pequeno título com recurso
          a inteligência artificial.
        </p>
      </div>
    </div>
  );
};

export default FormFields;
