const ContactFieldEmail = ({
  emailTouched,
  validInputEmail,
  placeholder,
  onChange,
  contactoError,
  value,
}) => {
  return (
    <div
      className={`form-field ${
        emailTouched ? (validInputEmail ? "valid" : "invalid") : ""
      }`}
    >
      <label>
        <span>Quero ser contactado por:</span>
        <input
          type="text"
          id="email"
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
        <span>Insira um e-mail válido.</span>
      </label>

      {contactoError && <div className="error no-bg">{contactoError}</div>}
    </div>
  );
};

export default ContactFieldEmail;
