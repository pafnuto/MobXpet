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
      getcarsByUser: action,
      getUser: action,
      createСar: action,
      createUser: action,
      updateСar: action,
      updateUser: action,
      deleteСar: action,
      deleteUser: action,
      assignUserTocar: action,
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
  getcarsByUser(UserId) {
    return this.cars.filter((car) => {
      return car.User.id === UserId;
    });
  }

  //задаем юзеру ид
  getUser(UserId) {
    console.log(`getUser - INIT`);
    let User = this.users.find((User) => User.id === UserId);
    console.log(this.users);
    console.log({ User });
    return `${
      User ? User.firstName + " " + User.lastName : "пользователь не найден"
    }`;
  }

  createСar(car) {
    this.cars.push(car);
    return car;
  }

  createUser(User) {
    this.users.push(User);
    return User;
  }

  updateUser(UserId, update) {
    const UserIndexAtId = this.users.findIndex(
      (User) => User.id === UserId
    );
    if (UserIndexAtId > -1 && update) {
      this.users[UserIndexAtId] = update;
      return this.users[UserIndexAtId];
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

  deleteUser(UserId) {
    const UserIndexAtId = this.users.findIndex(
      (User) => User.id === UserId
    );
    if (UserIndexAtId > -1) {
      this.users.splice(UserIndexAtId, 1);
      this.cars = this.cars.map((car) => {
        if (car.User === UserId) {
          car.User = null;
        }
        return car;
      });
    }
  }

  //задаем ид юзеру и машине
  assignUserTocar(UserId, carId) {
    const carAtIndex = this.cars.find(
      (car) => parseInt(car.id) === parseInt(carId)
    );
    if (carAtIndex) {
      carAtIndex.User = UserId;
    }
  }
//сверяемся в консоли
  get storeDetails() {
    this.cars.forEach((x) => console.log("Машина: ", x.name, x.User));
    this.users.forEach((x) => console.log("Пользователь: ", x.firstName, x.id));
    return `У нас ${this.totalСars} машин и ${this.totalUsers} пользователей`;
  }

  logStoreDetails = () => {
    console.log(this.storeDetails);
  };

  prefetchData = () => {
    const users = [{ firstName: "Кеша", lastName: "Шниперсон", id: 1 }];

    const cars = [
      {
        id: 1,
        name: "Лада",
        model: "Гранда",
        UserId: 1,
      }
    ];

    setTimeout(() => {
      users.map((car) => this.createUser(car));
      cars.map((car) => {
        this.createСar(car);
        this.assignUserTocar(car.UserId, car.id);
        return car;
      });
    }, 3000);
  };
}

export default CarUserStore;
