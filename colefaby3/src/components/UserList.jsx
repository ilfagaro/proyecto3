// UserList.jsx

import React, { useState, useEffect } from 'react';
import { UserService } from '../userService';
import './index.css';

const UserList = () => {
  const [user, setUser] = useState({
    userName: '',
    userSurname: '',
    userEmail: '',
    userPhone: ''
  });

  const [userList, setUserList] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      let response = await UserService.getAllUsers();
      setUserList(response.data);
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  }

  function handleInputChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  async function handleAddUserToList() {
    try {
      // Validaciones básicas
      if (!user.userName || !user.userSurname || !user.userEmail || !user.userPhone) {
        alert('Por favor, complete todos los campos.');
        return;
      }

      await UserService.submitUser(user);
      getData();
      setUser({
        userName: '',
        userSurname: '',
        userEmail: '',
        userPhone: ''
      });
    } catch (error) {
      console.error('Error al agregar usuario:', error);
    }
  }

  return (
    <>
      <h1>Lista de Alumnos</h1>

      <label htmlFor="userName">Nombre</label>
      <input type="text" name="userName" value={user.userName} onChange={handleInputChange} />

      <label htmlFor="userSurname">Apellido1</label>
      <input type="text" name="userSurname" value={user.userSurname} onChange={handleInputChange} />

      <label htmlFor="userSurname">Apellido2</label>
      <input type="text" name="userSurname" value={user.userSurname} onChange={handleInputChange} />

      <label htmlFor="userEmail">Email de contacto</label>
      <input type="email" name="userEmail" value={user.userEmail} onChange={handleInputChange} />

      <label htmlFor="userPhone">Teléfono</label>
      <input type="tel" name="userPhone" value={user.userPhone} onChange={handleInputChange} />

      <button onClick={handleAddUserToList}>Añadir alumno</button>

      <ul>
        {userList.map((userData, index) => (
          <li key={index}>
            {userData.userName} {userData.userSurname}- {userData.userSurname}- {userData.userEmail} - {userData.userPhone}
          </li>
        ))}
      </ul>
    </>
  );
}

export default UserList;
