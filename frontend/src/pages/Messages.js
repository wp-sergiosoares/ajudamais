import React, { useEffect, useState } from "react";

function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const tokenn = localStorage.getItem("user"); // ou onde estiver salvo
    let token = null;

    if (tokenn) {
      const userObj = JSON.parse(tokenn);
      token = userObj.token;
    }

    console.log(token);
    if (!token) {
      setError("Usuário não autenticado");
      setLoading(false);
      return;
    }

    fetch("/api/messages", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Falha ao buscar mensagens");
        }
        return res.json();
      })
      .then((data) => {
        setMessages(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Carregando mensagens...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Mensagens</h2>
      {messages.length === 0 && <p>Nenhuma mensagem encontrada.</p>}
      <ul>
        {messages.map((msg) => (
          <li
            key={msg._id}
            style={{ marginBottom: "1em", borderBottom: "1px solid #ccc" }}
          >
            <p>
              <b>De:</b> {msg.sender}
            </p>
            <p>
              <b>Para:</b> {msg.recipient}
            </p>
            <p>{msg.text}</p>
            <p>
              <small>{new Date(msg.createdAt).toLocaleString()}</small>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Messages;
