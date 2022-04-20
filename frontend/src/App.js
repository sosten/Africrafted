import Navbar from './components/Navbar';
import Home from './components/Home';
import ShoppingCart from './components/ShoppingCart';
// import ProductDetail from './components/ProductDetail';
import AllProducts from './components/AllProducts';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import Shipping from './components/Shipping';
import PlaceOrder from './components/PlaceOrder';
import Order from './components/Order';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import HomeScreen from './screens/HomeScreen';
import ProductDetailsScreen from './screens/ProductDetailsScreen.js';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path= '/home_screen' element={<HomeScreen />} />
          <Route path="/productId/:id" element={<ProductDetailsScreen/>}/>
          <Route path='/shopping_cart' element={<ShoppingCart />} />
          <Route path='/all_products' element={<AllProducts />}/>
          <Route path='/login' element={<LoginScreen />} />
          <Route path='/register' element={<RegisterScreen />} />
          <Route path='/shipping' element={<Shipping />} />
          <Route path='/press_order' element={<PlaceOrder />} />
          <Route path='/order' element={<Order />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
