import React from 'react';
import { observer } from "mobx-react-lite";

 function Users({ store }) {
    
    //задаем константы с действиями
    const handleAddUser = () => {
      const firstName = prompt("Имя?");
      const lastName = prompt("Фамилия?");
      store.createUser({ id: Date.now(), firstName, lastName });
      };

        const handleUsers = () => {
          const firstName = prompt("Имя?");
          const lastName = prompt("Фамилия?");
          store.createUsers({ id: Date.now(), firstName, lastName });
        };
      
    const handleUpdateUser = (user) => {

        user.firstName = prompt("Имя?", user.firstName);
        user.lastName = prompt("Фамилия?", user.lastName);
        store.updateUser(user.id, user);
        };
        
    const handleDeleteUser = (user) => {
          store.deleteUser(user.id);
          };   

  return (
    <div className="usersBody">
    <table>
        <thead>
        <tr>
            <th>Имя</th>
            <th>Фамилия</th>
            <th>Владелец</th>
          </tr>
          </thead>
      {store.users.map((user) => {
            return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>
                <button onClick={() => handleDeleteUser(user)}>Удалить {user.firstName}</button>
                <button onClick={() => handleUpdateUser(user)}>Обновить {user.firstName}</button>
                  </td>
                </tr>
            );
        })}
        </table>
        <button onClick={handleAddUser}>+ Новый пользователь</button>
    </div>
  );
}
export default observer(Users);