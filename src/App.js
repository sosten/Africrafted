import Navbar from './components/Navbar';
import Home from './components/Home';
import ShoppingCart from './components/ShoppingCart';
import ProductDetail from './components/ProductDetail';
import AllProducts from './components/AllProducts';
import Login from './components/Login';
import Register from './components/Register';
import Shipping from './components/Shipping';
import PressOrder from './components/PressOrder';
import Order from './components/Order';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/shopping_cart' element={<ShoppingCart />} />
          <Route path='/product_detail' element={<ProductDetail />}/>
          <Route path='/all_products' element={<AllProducts />}/>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/shipping' element={<Shipping />} />
          <Route path='/press_order' element={<PressOrder />} />
          <Route path='/order' element={<Order />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
