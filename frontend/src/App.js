// import Navbar from './components/Navbar';
import Home from "./components/Home";
import AllProducts from "./components/AllProducts";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomeScreen from "./screens/HomeScreen";
import ProductDetailsScreen from "./screens/ProductDetailsScreen.js";
import CartScreen from "./screens/CartScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SearchScreen from "./screens/SearchScreen";
import ProtectedRoute from "./components/ProtectedRoute";
// import DashboardScreen from "./screens/DashboardScreen";
import AdminDashboardScreen from "./screens/AdminDashboardScreen";
// import List from "./screens/List";
import About from "./screens/About";
import AdminRoute from "./components/AdminRoute";
import AdminSingleScreen from "./screens/AdminSingleScreen";
// import AdminOrders from "./screens/AdminOrders";
import AdminAddUser from "./screens/AdminAddUser";
import AdminAddProduct from "./screens/AdminAddProduct";
// import AdminProductsTable from "./screens/AdminProductsTable";
import AddminCategories from "./screens/AdminCategories";
// import AdminAddCategory from "./screens/AdminAddCategory";
import Shipping from "./screens/Shipping";
// import AdminEditProduct from "./screens/AdminEditProduct";
import Suppliers from "./screens/Suppliers";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import CarvingsAndPaintings from "./screens/CarvingsAndPaintings";
import Contact from "./components/Contact";
import ProductEditScreen from "./screens/ProductEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import OrderListScreen from "./screens/OrderListScreen";

function App() {
  return (
    <>
      <Router>
        <ToastContainer position="bottom-center" limit={1} />
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home_screen" element={<HomeScreen />} />
          <Route path="/product/:slug" element={<ProductDetailsScreen />} />
          <Route path="/carvings" element={<CarvingsAndPaintings />} />
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/search" element={<SearchScreen />} />
          <Route path="/all_products" element={<AllProducts />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/about" element={<About />} />
          <Route path="/shipping_return" element={<Shipping />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfileScreen />
              </ProtectedRoute>
            }
          />
          <Route path="/shipping" element={<ShippingScreen />} />
          <Route path="/payment" element={<PaymentScreen />} />
          <Route path="/placeorder" element={<PlaceOrderScreen />} />
          <Route
            path="/order/:id"
            element={
              <ProtectedRoute>
                <OrderScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order_history"
            element={
              <ProtectedRoute>
                <OrderHistoryScreen />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          {/* <Route path="/admin/dashboard" element={<DashboardScreen />} /> */}
          <Route path="/admin/dashboard" element={<AdminDashboardScreen />} />
          {/* <Route path="/admin/list" element={<List />} /> */}
          <Route path="/admin/:adminId" element={<AdminSingleScreen />} />
          <Route path="/admin/add_user" element={<AdminAddUser />} />
          <Route path="/admin/add_product" element={<AdminAddProduct />} />
          {/* <Route
            path="/admin/edit_product/:id"
            element={<AdminEditProduct />}
          /> */}
          <Route
            path="/admin/users"
            element={
              <AdminRoute>
                <UserListScreen />
              </AdminRoute>
            }
          ></Route>
          <Route
                path="/admin/user/:id"
                element={
                  <AdminRoute>
                    <UserEditScreen />
                  </AdminRoute>
                }
              ></Route>
          {/* <Route path="/products/:id" element={<ProductEditScreen />} /> */}
          <Route path="/admin/product/:id" element={<ProductEditScreen />} />
          <Route path="/admin/products" element={<ProductListScreen />} />
          {/* <Route path="/admin/products" element={<AdminProductsTable />} /> */}
          <Route path="/admin/orders" element={<OrderListScreen />} />
          <Route path="/admin/categories" element={<AddminCategories />} />
          {/* <Route path="/admin/add_category" element={<AdminAddCategory />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
