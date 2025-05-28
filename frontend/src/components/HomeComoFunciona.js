const HomeComoFunciona = () => {
  return (
    <div className="section section-como-funciona">
      <div className="container">
        <div className="section-header">
          <h3>Como funciona</h3>
          <p>Três passos simples para pedir ou oferecer ajuda no teu bairro.</p>
        </div>
        <div className="section-content card-items">
          <div className="card-item">
            <span className="material-symbols-outlined">contract_edit</span>
            <div className="card-number">1.</div>
            <div className="card-title">Escreve um pedido ou oferta</div>
            <div className="card-description">
              Diz o que precisas ou como podes ajudar.
            </div>
          </div>
          <div className="card-item">
            <span className="material-symbols-outlined">search</span>
            <div className="card-number">2.</div>
            <div className="card-title">A comunidade vê</div>
            <div className="card-description">
              O teu pedido aparece no mural do bairro.
            </div>
          </div>
          <div className="card-item">
            <span className="material-symbols-outlined">partner_exchange</span>
            <div className="card-number">3.</div>
            <div className="card-title">Recebe apoio ou faz a diferença</div>
            <div className="card-description">
              Combinem diretamente de forma segura e anónima.
            </div>
          </div>
        </div>

        <div className="section-footer">
          <button className="btn btn-primary">
            <span className="material-symbols-outlined">favorite</span>
            Vamos fazer a diferença
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeComoFunciona;
