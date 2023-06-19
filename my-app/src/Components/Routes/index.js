import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../../pages/Home";
import Category from "../../pages/Category";
import CartFeaure from "../../pages/Cart/index";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:categoryId" element={<Category />} />
      <Route path="/:cart" element={<CartFeaure />} />
    </Routes>
  );
}

export default AppRoutes;
