
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MainCat from "./pages/MainCat";

import ProductDetail from "./pages/ProductDetail";
import SignUpPage from "./pages/SignUp";
import Login from "./pages/Login";
import AccountPage from "./pages/AccountPage";
import ScrollToTop from "./ScrollTop/ScrollToTop";

function App() {
  return (
    <Router>
      <ScrollToTop/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/maincat/:categoryId" element={<MainCat />} />
        <Route path="/register" element={<SignUpPage/>} />  
         <Route path="/login" element={<Login/>}/> 
        <Route path="/detail" element={<ProductDetail/>}/>
        <Route path="/myAccount" element={<AccountPage/>}/>
      </Routes>
  
    </Router>
  );
}

export default App;