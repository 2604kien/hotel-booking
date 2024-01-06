import {Routes, Route} from "react-router-dom"
import Navbar from "./components/Layout/Navbar";
import Error404 from "./components/Error404";
import HomePage from "./components/HomePage/HomePage";
import Category from "./components/Category/Category";
import AddCategory from "./components/Category/AddCategory";
function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="*" element={<Navbar/>}>
            <Route path="" element={<HomePage/>}/>
            <Route path="category" element={<HomePage/>}/>
            <Route path="category/:id" element={<Category/>}/>
            <Route path="category/add" element={<AddCategory/>}/>
            <Route path="*" element={<Error404/>}/>
          </Route>
        </Routes>
    </div>
  );
}

export default App;
