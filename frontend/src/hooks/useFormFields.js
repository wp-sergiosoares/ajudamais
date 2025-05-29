import { useState } from "react";
import { useInfo } from "../context/InfoContext";
import { useGeolocation } from "./useGeolocation";
import { useTicketsContext } from "./useTicketsContext";
import { useAuthContext } from "./useAuthContext";

export const useFormFields = () => {
  const { categorias } = useInfo();
  const { user } = useAuthContext();
  const { dispatch } = useTicketsContext();
  const { location, locationError } = useGeolocation();

  const [formData, setFormData] = useState({
    description: "",
    type: "pedido",
    category: "",
    email: "",
    phone: "",
  });

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [createdTicket, setCreatedTicket] = useState(null);

  const [validInputEmail, setValidInputEmail] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [tempEmail, setTempEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);

  const [validInputPhone, setValidInputPhone] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [tempPhone, setTempPhone] = useState("");

  const handleEmailInput = (e) => {
    let value = e.target.value;
    setTempEmail(value);
    setEmailTouched(true);

    const emailRegex =
      /^([A-Za-z\d\.-]+)@([A-Za-z\d-]+)\.([A-Za-z]{2,6})(\.[A-Za-z]{2,6})?$/;
    const phoneRegex = /^(\+351)?\s?(\d{3})[\s.-]?(\d{3})[\s.-]?(\d{3})$/;

    if (emailRegex.test(value) || phoneRegex.test(value)) {
      setValidInputEmail(true);
      setEmailError("");
      setFormData({ ...formData, email: value });

      console.log(formData.email);
    } else {
      setValidInputEmail(false);
      setEmailError("Introduza um email válido.");
      //   setFormData({ ...formData, email: "" });
    }
  };

  const handlePhoneInput = (e) => {
    let value = e.target.value;
    setTempPhone(value);
    setPhoneTouched(true);

    const phoneRegex = /^(\+351)?\s?(\d{3})[\s.-]?(\d{3})[\s.-]?(\d{3})$/;

    if (phoneRegex.test(value)) {
      setValidInputPhone(true);
      setPhoneError("");
      setFormData({ ...formData, phone: value });
      console.log(formData.phone);
    } else {
      setValidInputPhone(false);
      setPhoneError("Introduza um número de telefone válido.");
      //   setFormData({ ...formData, phone: "" });
    }
  };

  const validateForm = () => {
    if (
      !formData.description ||
      !formData.type ||
      !formData.category ||
      (!formData.email && !formData.phone)
    ) {
      setError("Por favor, preencha todos os campos obrigatórios.");
      return false;
    }

    if (!validInputEmail && !validInputPhone) {
      setError("Por favor, introduza um contacto válido (email ou telefone).");
      return false;
    }

    return true;
  };

  const handleAddTicket = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!user) {
      setError("Você precisa estar autenticado.");
      setIsLoading(false);
      return;
    }

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    const ticket = {
      typeOfTicket: formData.type,
      description: formData.description,
      location,
      email: formData.email,
      phone: formData.phone,
      category: formData.category,
    };

    try {
      const response = await fetch("/api/tickets/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(ticket),
      });

      const json = await response.json();
      console.log("Resposta da API:", json, response.status);
      if (!response.ok) {
        setError(json.message || "Erro ao criar o pedido.");
        return;
      }

      setCreatedTicket(json);
      dispatch({ type: "CREATE_TICKET", payload: json });

      // Reset
      setFormData({
        description: "",
        type: "pedido",
        category: "",
        email: "",
        phone: "",
      });
      setTempEmail("");
      setTempPhone("");
      setEmailTouched(false);
      setPhoneTouched(false);
      setEmailError("");
      setPhoneError("");
      setValidInputEmail(false);
      setValidInputPhone(false);

      setError(null);
    } catch (err) {
      setError("Erro ao conectar com o servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    categorias,
    locationError,
    handleAddTicket,
    formData,
    setFormData,
    handleEmailInput,
    handlePhoneInput,
    emailError,
    phoneError,
    tempEmail,
    tempPhone,
    emailTouched,
    phoneTouched,
    validInputEmail,
    validInputPhone,
    error,
    isLoading,
    createdTicket,
  };
};
