const CategorySelector = ({ disabled, value, onChange, categorias }) => {
  return (
    <div className="form-field">
      <label>
        <span>Categorias</span>

        <select
          disabled={disabled}
          id="category"
          value={value}
          onChange={onChange}
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
  );
};

export default CategorySelector;
