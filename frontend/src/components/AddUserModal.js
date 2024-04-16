import React, { useState } from "react";
import { addUser } from "../pages/home/requests/addUser";

export default function AddUserModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("jwt");
      const response = await addUser(
        token,
        formData.name,
        formData.email,
        formData.password
      );
      if (response.status) {
        onClose();
        window.location.reload()
      } else {
        console.error("Erro ao cadastrar usuário:", response.message);
      }
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
    }
  };

  return (
    <div className={isOpen ? "modal" : "hidden"}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <form className="form_register" onSubmit={handleSubmit}>
          <label>
            Nome:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Senha:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </label>
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}
