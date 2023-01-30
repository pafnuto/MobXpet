import {makeObservable,observable,computed,action,autorun,runInAction} from "mobx";
import { Car, User } from './types';

class CarUserStore {
  cars: Array<any> = [];
  users: Array<any> = [];

  constructor() {
    makeObservable(this, {
      cars: observable,
      users: observable,
      totalUsers: computed,
      totalСars: computed,
      storeDetails: computed,
      getCarsByUser: action,
      getUser: action,
      createСar: action,
      createUser: action,
      updateСar: action,
      updateUser: action,
      deleteСar: action,
      deleteUser: action,
      assignUserToCar: action,
    });
    autorun(this.logStoreDetails);
    runInAction(this.prefetchData);
  }

  //подсчитываем итоговое количество пользователей
  get totalUsers() {
    return this.users.length;
  }

  //подсчитываем итоговое количество машин
  get totalСars() {
    return this.cars.length;
  }

  //фильтруем машины с помощью UserId
  getCarsByUser(userId) {
    return this.cars.filter((car) => {
      return car.user.id === userId;
    });
  }

  //задаем юзеру ид
  getUser(userId) {
    console.log(`getUser - INIT`);
    let user = this.users.find((user) => user.id === userId);
    console.log(this.users);
    console.log({ user });
    return `${user ? user.firstName + " " + user.lastName : "пользователь не найден"}`;
  }

  createСar(car) {
    this.cars.push(car);
    return car;
  }

  createUser(user) {
    this.users.push(user);
    return user;
  }

  updateUser(userId, update) {
    const userIndexAtId = this.users.findIndex(
      (user) => user.id === userId
    );
    if (userIndexAtId > -1 && update) {
      this.users[userIndexAtId] = update;
      return this.users[userIndexAtId];
    }
  }

  updateСar(carId, update) {
    const carIndexAtId = this.cars.findIndex((car) => car.id === carId);
    if (carIndexAtId > -1 && update) {
      this.cars[carIndexAtId] = update;
      return this.cars[carIndexAtId];
    }
  }

  deleteСar(carId) {
    const carIndexAtId = this.cars.findIndex((car) => car.id === carId);
    if (carIndexAtId > -1) {
      this.cars.splice(carIndexAtId, 1);
    }
  }

  deleteUser(userId) {
    const userIndexAtId = this.users.findIndex(
      (user) => user.id === userId
    );
    if (userIndexAtId > -1) {
      this.users.splice(userIndexAtId, 1);
      this.cars = this.cars.map((car) => {
        if (car.user === userId) {
          car.user = null;
        }
        return car;
      });
    }
  }

  //задаем ид юзеру и машине
  assignUserToCar(userId, carId) {
    const carAtIndex = this.cars.find(
      (car) => parseInt(car.id) === parseInt(carId)
    );
    if (carAtIndex) {
      carAtIndex.User = userId;
    }
  }

//выводим массив в консоль
  get storeDetails() {
    this.cars.forEach((x) => console.log("Машина: ", x.name, x.user));
    this.users.forEach((x) => console.log("Пользователь: ", x.firstName, x.id));
    return `У нас ${this.totalСars} машин и ${this.totalUsers} пользователей`;
  }

  logStoreDetails = () => {
    console.log(this.storeDetails);
  };

  prefetchData = () => {
    const users = [{ id: 1,  firstName: "Кеша", lastName: "Шниперсон"}];

    const cars = [
      {
        id: 1,
        mark: "Лада",
        model: "Гранда",
        userId: 1,
      }
    ];

    setTimeout(() => {
      users.map((car) => this.createUser(car));
      cars.map((car) => {
        this.createСar(car);
        this.assignUserToCar(car.userId, car.id);
        return car;
      });
    }, 1000);
  };
}

export default CarUserStore;
