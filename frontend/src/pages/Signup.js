import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(email, password);
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Criar uma conta</h3>
      <p>
        É rápido e fácil criar a sua conta. Junte-se ao Ajuda+ e faça a
        diferença na vida de alguém.
      </p>
      <div className="form-field">
        <label>
          Email:
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
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
        </label>
      </div>

      <div className="form-action">
        <button className="btn btn-normal btn-primary" disabled={isLoading}>
          Sign up
        </button>
      </div>

      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;
