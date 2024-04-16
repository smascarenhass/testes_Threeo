import React, { useState, useEffect } from "react";
import "./styles/index.css";
import Header from "../../components/header";
import { getAllUsers } from "./requests/getAllUsers";
import AddUserModal from "../../components/AddUserModal";
import { removeUser } from "./requests/removeUser";

export default function HomePage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const token = localStorage.getItem("jwt");
  const userAuthenticado = localStorage.getItem("userLogado");

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await getAllUsers(token);

        if (response.status) {
          setUsers(response.users);
        } else {
          console.log("error");
        }

        setLoading(false);
      } catch (error) {
        console.log("Falha no fetch");
      }
    };

    fetchData();
  }, []);

  const handleAddUser = (formData) => {
    console.log("Novo usuário adicionado:", formData);
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (userAuthenticado) {
    return (
      <div className="home_page">
        <Header />
        <button className="bnt_add_user" onClick={toggleModal}>Adicionar usuário</button>
        <AddUserModal
          isOpen={modalOpen}
          onClose={toggleModal}
          onAddUser={handleAddUser}
        />
        <div className="container_cards">
          {users.map((user) => (
            <div className="card" key={user.id_}>
              <p>Nome: {user.name}</p>
              <p>Email: {user.email}</p>
              <button
                onClick={async () => {
                  await removeUser(token, user.id_)
                  setUsers(users.filter(u => u.id_ !== user.id_));
                }}
              >
                Remover
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return (window.location.href = "/");
  }
}
