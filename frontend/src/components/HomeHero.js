import { Link } from "react-router-dom";

const HomeHero = () => {
  return (
    <div className="section section-hero">
      <div className="container">
        <div className="hero-section-text">
          <h2 className="section-title">Precisas de ajuda ou queres ajudar?</h2>
          <p>Ajuda+ liga vizinhos dispostos a fazer a diferença.</p>
          <div className="buttons">
            <Link to="/adicionar/" className="btn btn-primary">
              Pedir Ajuda
            </Link>
            <Link to="/adicionar/" className="btn btn-secondary">
              Oferecer Ajuda
            </Link>
          </div>
        </div>
        <div className="hero-section-image">
          <span class="material-symbols-outlined">assist_walker</span>
        </div>
      </div>
    </div>
  );
};

export default HomeHero;
