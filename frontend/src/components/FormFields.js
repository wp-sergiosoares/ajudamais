// componentes

import { useFormFields } from "../hooks/useFormFields";
import TypeSelector from "./form/TypeSelector";
import CategorySelector from "./form/CategorySelector";
import DescriptionField from "./form/DescriptionField";
import ContactFieldPhone from "./form/ContactFieldPhone";

const FormFields = () => {
  const {
    categorias,
    locationError,
    handleAddTicket,
    formData,
    setFormData,
    handlePhoneInput,
    phoneError,
    phoneTouched,
    validInputPhone,
    error,
    isLoading,
    createdTicket,
  } = useFormFields();

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
            <ContactFieldPhone
              placeholder="Número de telemóvel..."
              onChange={(e) => handlePhoneInput(e)}
              value={formData.phone}
              phoneTouched={phoneTouched}
              validInputPhone={validInputPhone}
              phoneError={phoneError}
            />
            <div className="form-field"></div>
          </div>

          {/* <div className="form-field form-field-radio">
              <input type="radio" value="" id="radio" />
              <label htmlFor="radio">Quero permanecer anónimo</label>
            </div> */}

          {error && <div className="error">{error}</div>}
          {locationError && <div className="error">{locationError}</div>}

          {createdTicket && (
            <div className="success-message">
              Pedido criado com sucesso!
              <a
                href={`/pedido/${createdTicket._id}`}
                className="link-detalhes"
              >
                Ver detalhes
              </a>
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
    </div>
  );
};

export default FormFields;
