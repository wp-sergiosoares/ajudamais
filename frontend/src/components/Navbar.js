import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <header>
      <div className="container">
        <div className="logo">
          <Link to="/lista-pedidos/">
            <h1>
              Ajuda <span>+</span>
            </h1>
          </Link>
        </div>

        <nav className="site-menu">
          <ul className="menu">
            {/* {user && (
              <li>
                <Link to="">Sobre</Link>
              </li>
            )} */}

            <li>
              <Link to="/adicionar/">
                <span>Pede ou Oferece Ajuda</span>
                <span class="material-symbols-outlined">north</span>
              </Link>
            </li>
            {/* <li>
              <Link to="/messages">Messages</Link>
            </li> */}

            {/* <li>
              <Link to="/alltickets">GET ALL</Link>
            </li> */}
            {/* {user && (
              <li>
                <Link to="/perfil">Os meus pedidos</Link>
              </li>
            )} */}
          </ul>
        </nav>

        <nav>
          {user && (
            <ul className="menu">
              {/* <li>
                <span>{user.email}</span>
              </li> */}

              <li>
                <button onClick={handleClick}>Log out</button>
              </li>
            </ul>
          )}
          {!user && (
            <div>
              <Link to="/login">Iniciar Sessão</Link>
              <Link to="/signup">Criar Conta</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
