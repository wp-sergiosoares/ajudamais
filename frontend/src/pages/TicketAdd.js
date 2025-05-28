import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

import FormFields from "../components/FormFields";

import { useTicketsContext } from "../hooks/useTicketsContext";

const TicketAddNew = () => {
  const navigate = useNavigate(); // hook de navegaçã

  const { user } = useAuthContext();

  return (
    <div className="page-center page-center-small">
      <div className="page-header">
        <div>
          <h1>Novo pedido ou oferta</h1>
          <p>Ajude ou peça ajuda à sua comunidade — partilhar é cuidar!</p>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="btn btn-small btn-secondary"
        >
          <span class="material-symbols-outlined">keyboard_arrow_left</span>
        </button>
      </div>

      {user ? (
        <FormFields />
      ) : (
        <div className="info-panel">
          <h3>É necessário iniciar sessão</h3>
          <div className="info-panel-text">
            Para pedir ou oferecer ajuda, por favor faça login na sua conta.
          </div>
          <Link to="/login" className="btn btn-small btn-secondary">
            Iniciar Sessão
          </Link>
          <Link to="/signup" className="btn btn-small btn-secondary">
            Criar Conta
          </Link>
        </div>
      )}
    </div>
  );
};

export default TicketAddNew;
