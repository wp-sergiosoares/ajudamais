const DescriptionField = ({ disabled, value, onChange, placeholder }) => {
  return (
    <div className="form-field">
      <label>
        <span>Descreva o que precisa ou o que oferece *</span>
        <textarea
          disabled={disabled}
          id="description"
          value={value}
          onChange={onChange}
          rows={3}
          style={{ overflow: "hidden", resize: "none" }}
          placeholder={placeholder}
        />
        <span>
          Através da tua descrição irá ser gerado um pequeno título com recurso
          a inteligência artificial.
        </span>
      </label>
    </div>
  );
};

export default DescriptionField;
