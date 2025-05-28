import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

// pages

import Home from "./pages/Home";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import UserProfile from "./pages/UserProfile";

import UserListAll from "./pages/UserListAll";
import TicketSingle from "./pages/TicketSingle";

import TicketAddNew from "./pages/TicketAddNew";

import TicketNearby from "./pages/TicketNearby";

import Messages from "./pages/Messages";

import Footer from "./components/Footer";

// components
import Navbar from "./components/Navbar";

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <Routes>
          {/* <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          /> */}

          <Route path="/" element=<Home /> />

          <Route path="/ticket/:id" element=<TicketSingle /> />

          <Route path="/adicionar/" element=<TicketAddNew /> />

          {/* <Route path="/" element=<Home /> /> */}
          {<Route path="/pedidos/" element=<TicketNearby /> />}
          {<Route path="/pedido/:id" element=<TicketSingle /> />}

          <Route path="/messages" element=<Messages /> />

          <Route path="/perfil" element=<UserProfile /> />
          <Route path="/user/:id" element=<UserProfile /> />
          <Route path="/all-users/" element=<UserListAll /> />

          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/" />}
          />
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
