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
        <span>Quero ser contactado por:</span>
        <input
          type="text"
          id="phone"
          placeholder={placeholder}
          // onChange={(e) =>
          //   setFormData({
          //     ...formData,
          //     formaContacto: e.target.value,
          //   })
          // }
          onChange={onChange}
          value={value}
        />

        <span className="tick material-symbols-outlined">check</span>
      </label>

      {phoneError && <div className="error no-bg">{phoneError}</div>}
    </div>
  );
};

export default ContactFieldPhone;
