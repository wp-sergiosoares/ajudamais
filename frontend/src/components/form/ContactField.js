const ContactField = ({
  contactTouched,
  validInput,
  placeholder,
  onChange,
  contactoError,
  value,
}) => {
  return (
    <div
      className={`form-field ${
        contactTouched ? (validInput ? "valid" : "invalid") : ""
      }`}
    >
      <label>
        <span>Como prefere ser contactado?</span>
        <input
          type="text"
          id="contacto"
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

      {contactoError && <div className="error no-bg">{contactoError}</div>}
    </div>
  );
};

export default ContactField;
