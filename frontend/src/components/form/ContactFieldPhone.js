const ContactFieldPhone = ({
  phoneTouched,
  validInputPhone,
  placeholder,
  onChange,
  phoneError,
  value,
}) => {
  return (
    <div
      className={`form-field ${
        phoneTouched ? (validInputPhone ? "valid" : "invalid") : ""
      }`}
    >
      <label>
        <span>Aceito ser contactado pelo nr:</span>
        <input
          type="text"
          id="phone"
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        />
        <span>Ex. 91xxxxxxx</span>
        <span className="tick material-symbols-outlined">check</span>
      </label>

      {phoneError && <div className="error no-bg">{phoneError}</div>}
    </div>
  );
};

export default ContactFieldPhone;
