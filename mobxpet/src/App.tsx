import { useState } from 'react'
import './App.css'
import Users from './components/Users';
import Cars from './components/Cars';
import CarUsersStore from './store/CarUsers'

function App() {
  const store = new CarUsersStore();
  
  return (
<div className="app">
<h3>Список машин</h3>
< Cars store={store}/>
<h3>Список пользователей</h3>
< Users store={store}/>
</div>
  )
}

export default App;
