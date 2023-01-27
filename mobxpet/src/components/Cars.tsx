import React from 'react';
import { observer } from "mobx-react-lite";

function carList({ store }) {
//задаем действия
  const handleAddCar = () => {
    const model = prompt("Модель машины");
    const type = prompt("Тип машины");
    const userId = prompt("Владелец машины");

    const car = store.createCar({ id: Date.now(), model, type });
    store.assignUserToCar(userId, car.id);
  };

  const handleUpdateCar = (car) => {
    car.model = prompt("Тип машины", car.type);
    car.type = prompt("Breed of the car", car.breed);
    const userId = prompt("Owner's Id of the car", car.owner?.id);
    store.updateCar(car.id, car);
    if (userId !== car.owner?.id) {
      store.assignOwnerToCar(userId, car.id);
    }
  };

  const handleDeleteCar = (car) => {
    store.deleteCar(car.id);
  };

  return (
    <div>
      <p>{store.storeDetails}</p>
      <table>
        <thead>
          <tr>
            <th>Марка машины</th>
            <th>Модель машины</th>
            <th>Тип машины</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {store.cars.map((car) => {
            return (
              <tr key={car.id}>
                <td>{car.id}</td>
                <td>{car.name}</td>
                <td>{car.type}</td>
                <td>
                  {car.user? `${store.getUser(car.user)}`:"---"}
                </td>
                <td>
                  <button onClick={() => handleDeleteCar(car)}>
                    Удалить{car.name}
                  </button>
                  <button onClick={() => handleUpdateCar(car)}>
                    Обновить{car.name}
                  </button>
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