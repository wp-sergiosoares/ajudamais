import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Iniciar Sessão</h3>
      <div className="form-field">
        <label>
          Email:
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <span>bla bla bla</span>
        </label>
      </div>

      <div className="form-field">
        <label>
          Password:
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <span>Insira a sua password</span>
        </label>
      </div>
      <div className="form-action">
        <button className="btn btn-normal btn-primary" disabled={isLoading}>
          Login
        </button>
      </div>

      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Login;
