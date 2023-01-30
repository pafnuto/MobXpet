import React from 'react';
import { observer } from "mobx-react-lite";
import "./style.css"

 function Users({ store }) {
    
    //задаем константы с действиями
    const handleAddUser = () => {
      const firstName = prompt("Имя?");
      const lastName = prompt("Фамилия?");
      store.createUser({ id: Date.now(), firstName, lastName });
      };

//добавляем пользователя
    const handleUpdateUser = (user) => {
        user.firstName = prompt("Имя?", user.firstName);
        user.lastName = prompt("Фамилия?", user.lastName);
        store.updateUser(user.id, user);
        };
//удаляем пользоваителя      
    const handleDeleteUser = (user) => {
          store.deleteUser(user.id);
          };   

  return (
    <div className="usersBody">
      <p>{store.storeDetails}</p>
    <table>
        <thead>
        <tr>
            <th>Id</th>
            <th>Имя</th>
            <th>Фамилия</th>
          </tr>
          </thead>
          <tbody>
          {store.users.map((user) => {
            return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>
                <button onClick={() => handleDeleteUser(user)}>Удалить</button>
                <button onClick={() => handleUpdateUser(user)}>Обновить</button>
                  </td>
                </tr>
            );
        })}
        </tbody>
        </table>
        <button onClick={handleAddUser}>+ Новый пользователь</button>
    </div>
  );
}

export default observer(Users);