import './App.css';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductDetails from './pages/ProductDetail';
import { useState } from 'react';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Cart from './pages/Cart';
function App() {
  const [cartitems , setcartitems]=useState([])
  return (
    <div className="App">
      <Router>
        <div>
          <ToastContainer theme='dark'position='bottom-center'/>
          <Header cartitems={cartitems} />

          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/search' element={<Home/>}/>
            <Route path='/product/:id' element={<ProductDetails cartitems={cartitems} setcartitems={setcartitems}/>}/>
            <Route path='/cart' element={<Cart cartitems={cartitems} setcartitems={setcartitems}/>}/>
          </Routes>
        </div>

      </Router>
      <Footer />
    </div>
  );
}

export default App;
