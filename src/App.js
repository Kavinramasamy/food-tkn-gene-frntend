import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./component/loginPage";
import SignUpPage from "./component/signupPage";
import NavPage from "./component/navPage";
import "bootstrap/dist/css/bootstrap.min.css";
import FoodmenuPage from "./component/foodmenuPage";
import AddFoods from "./component/addfoodPage";
import EditFoods from "./component/editfoodPage";
import OrderFoods from "./component/orderPage";
import HomePageComp from "./component/homePage";
import ManageFoodList from "./component/manageFoodList";

function App() {
  return (
    <div className="App">
      <NavPage />
      <Routes>
        <Route exact path="/" element={<HomePageComp />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/signup" element={<SignUpPage />} />
        <Route exact path="/foodmenu" element={<FoodmenuPage />} />
        <Route exact path="/manage" element={<ManageFoodList />} />
        <Route exact path="/addfood" element={<AddFoods />} />
        <Route exact path="/editfood" element={<EditFoods />} />
        <Route exact path="/orderfood" element={<OrderFoods />} />
      </Routes>
    </div>
  );
}

export default App;
