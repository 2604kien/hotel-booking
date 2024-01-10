import {Routes, Route} from "react-router-dom"
import Navbar from "./components/Layout/Navbar";
import Error404 from "./components/Error404";
import HomePage from "./components/HomePage/HomePage";
import Category from "./components/Category/Category";
import AddCategory from "./components/Category/AddCategory";
import AddRoom from "./components/Room/AddRoom";
import Register from "./components/User/Resiger";
import Login from "./components/User/Login";
import AllUser from "./components/User/AllUser"
import ViewAllCategory from "./components/Category/ViewAllCategory";
import EditUser from "./components/User/EditUser";
import AllRoom from "./components/Room/AllRoom";
function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="*" element={<Navbar/>}>
            <Route path="" element={<HomePage/>}/>
            <Route path="register" element={<Register/>}/>
            <Route path="login" element={<Login/>}/>
            <Route path="room" element={<AllRoom/>}/>
            <Route path="room/add" element={<AddRoom/>}/>
            <Route path="user" element={<AllUser/>}/>
            <Route path ="user/edit/:id" element={<EditUser/>}/>
            <Route path="category" element={<ViewAllCategory/>}/>
            <Route path="category/:id" element={<Category/>}/>
            <Route path="category/add" element={<AddCategory/>}/>
            <Route path="*" element={<Error404/>}/>
          </Route>
        </Routes>
    </div>
  );
}

export default App;
