import { useInfo } from "../context/InfoContext";
import { Link } from "react-router-dom";
const Footer = () => {
  const { info } = useInfo();
  return (
    <footer>
      <div className="container">
        <p>{info.title}</p>
        <p>{info.description}</p>
        <nav>
          <ul className="menu">
            <li>
              <Link to="/sobre-o-ajuda-mais/">Sobre o Ajuda +</Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
