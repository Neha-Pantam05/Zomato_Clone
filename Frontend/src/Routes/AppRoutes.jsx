import React from 'react'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import UserRegister from '../Pages/Auth/UserRegister'
import UserLogin from '../Pages/Auth/UserLogin'
import FoodPartnerRegister from '../Pages/Auth/FoodPartnerRegister'
import FoodPartnerLogin from '../Pages/Auth/FoodPartnerLogin'
import Home from '../Pages/General/Home.jsx'
import Saved from '../Pages/General/Saved.jsx'
import ChooseUser from '../Pages/Auth/ChooseUser'
import CreateFood from '../Pages/Food-Partner/CreateFood'
import Profile from '../Pages/Food-Partner/Profile'

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/choose-user" element={<ChooseUser />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path ="/foodPartner/register" element={<FoodPartnerRegister />} />
        <Route path="/foodPartner/login" element={<FoodPartnerLogin />} />
        <Route path="/create-food" element={<CreateFood />} />
        <Route path="/foodPartner/:id" element={<Profile />} />
        <Route path="/saved" element={<Saved />} />
      </Routes>
    </Router>
  )
}

export default AppRoutes
