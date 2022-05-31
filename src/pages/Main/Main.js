import React from "react";
import { Route, Routes } from "react-router-dom";
import Friends from "../Friends/Friends";
import WishListCategories from "../WishListCategories/WishListCategories";
import WishLists from "../WishLists/WishLists";
import PageNotFound from "../PageNotFound/PageNotFound";

const Main = () => {
  return (
    <div style={{ padding: "2rem 5rem" }}>
      <Routes>
        <Route index element={<WishLists />} />
        <Route path="wishLists/:wishListId" element={<WishListCategories />} />
        <Route path="friends" element={<Friends />} />
        <Route path="friends/wishLists/:friendId" element={<WishLists />} />
        <Route
          path="friends/wishLists/:friendId/wishListCategories/:wishListId"
          element={<WishListCategories />}
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

export default Main;
