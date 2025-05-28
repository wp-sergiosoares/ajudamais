import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAuthContext } from "../hooks/useAuthContext";

const UserListAll = () => {
  const { user } = useAuthContext();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await fetch("/api/user/all", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const json = await response.json();

        if (!response.ok) {
          throw new Error(json.message || "Erro ao buscar o pedido");
        }

        setUsers(json);
        console.log("Utilizadores chegaram!", json);
        setError(null);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setUsers([]);
      }
    };

    if (user) {
      fetchAllUsers();
    }
  }, [user]);

  console.log(users);

  return (
    <div className="page-center">
      <h1>List All Users</h1>

      {loading && <p>A carregar...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && users.length === 0 && (
        <p>Sem utilizadores para mostrar.</p>
      )}

      <ul>
        {users.map((u) => (
          <li key={u._id}>
            <Link to={`/user/${u._id}`}>
              {u._id} | {u.email}
            </Link>
          </li> // ou qualquer outro dado que tiver
        ))}
      </ul>
    </div>
  );
};

export default UserListAll;
