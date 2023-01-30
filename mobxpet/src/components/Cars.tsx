import React from 'react';
import { observer } from "mobx-react-lite";
import "./style.css"

function carList ({ store }) {

//задаем действия
  const handleAddCar = () => {
    const mark = prompt("Марка машины");
    const model = prompt("Модель машины");
    const userId = prompt("Владелец машины");
    const car = store.createCar({ id: Date.now(), mark, model });
    store.assignUserToCar(userId, car.id);
  };
//добавляем машину
  const handleUpdateCar = (car) => {
    car.mark = prompt("Марка машины", car.mark);
    car.model = prompt("Модель машины", car.model);
    const userId = prompt("Id владельца машины", car.user?.id);
    store.updateCar(car.id, car);
    
    if (userId !== car.user?.id) {
      store.assignUserToCar(userId, car.id);
    }
  };
//удаляем машину
  const handleDeleteCar = (car) => {
    store.deleteCar(car.id);
  };

  return (
    <div className='carsBody'>
      <p>{store.storeDetails}</p>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Марка машины</th>
            <th>Модель машины</th>
          </tr>
        </thead>
        <tbody>
          {store.cars.map((car) => {
            return (
              <tr key={car.id}>
                <td>{car.id}</td>
                <td>{car.mark}</td>
                <td>{car.model}</td>
                <td>
                  {car.user? `${store.getUser(car.user)}`:""}
                </td>
                <td>
                  <button onClick={() => handleDeleteCar(car)}>Удалить</button>
                  <button onClick={() => handleUpdateCar(car)}>Обновить</button>
                </td>
              </tr>
            );
          })}
      </tbody>
      </table>
      <button onClick={handleAddCar}>+ Новая машина</button>
    </div>
  );
}

export default observer(carList);