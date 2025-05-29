const TypeSelector = ({ value, onChange, disabled }) => {
  return (
    <div className="form-field">
      <label>
        <span>O que pretende publicar?</span>
        <select id="type" value={value} onChange={onChange} disabled={disabled}>
          <option value="">Selecione o tipo</option>
          <option value="pedido">Pedido</option>
          <option value="oferta">Oferta</option>
        </select>
      </label>
    </div>
  );
};

export default TypeSelector;
