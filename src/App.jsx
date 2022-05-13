import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Shop from './pages/Shop'
import ProtectedPages from './pages/ProtectedPages'
import Product from './pages/Product'
import SignUp from './pages/SignUp'
import Cart from './pages/Cart'

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Public Routes */}
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        {/* Private Routes */}
        <Route element={<ProtectedPages/>}>
          <Route path='/' element={<h1>HOla</h1>}/>
          <Route path='/shop' element={<Shop/>}/>
          <Route path='/shop/:id' element={<Product/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/cart/succes' element={<h1>Arigato</h1>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
