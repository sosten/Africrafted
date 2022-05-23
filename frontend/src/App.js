import Navbar from './components/Navbar';
import Home from './components/Home';
import AllProducts from './components/AllProducts';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import HomeScreen from './screens/HomeScreen';
import ProductDetailsScreen from './screens/ProductDetailsScreen.js';
import CartScreen from './screens/CartScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import SearchScreen from './screens/SearchScreen';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardScreen from './screens/DashboardScreen';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path= '/home_screen' element={<HomeScreen />} />
          <Route path="/product/:slug" element={<ProductDetailsScreen/>}/>
          <Route path='/shopping_cart' element={<CartScreen />} />
          <Route path='/search' element={<SearchScreen />} />
          <Route path='/all_products' element={<AllProducts />}/>
          <Route path='/login' element={<LoginScreen />} />
          <Route path='/register' element={<RegisterScreen />} />
          <Route path='/profile' 
            element={
              <ProtectedRoute>
                <ProfileScreen />
              </ProtectedRoute>} />
          <Route path='/shipping' element={<ShippingScreen />} />
          <Route path='/payment' element={<PaymentScreen />} />
          <Route path='/placeorder' element={<PlaceOrderScreen />} />
          <Route path='/order/:id' 
            element={
            <ProtectedRoute>
              <OrderScreen />
            </ProtectedRoute>} />
          <Route path='/order_history' 
            element={
              <ProtectedRoute>
                <OrderHistoryScreen />
              </ProtectedRoute>} />

              {/* Admin Routes */}
              <Route  path='/admin/dashboard' element={<DashboardScreen />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
