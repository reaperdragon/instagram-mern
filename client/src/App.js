import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Landing, Error, Register, ProtectedRoute } from "./pages";
import {
  SharedLayout,
  Home,
  Feed,
  Search,
  Create,
  UserProfile,
  EditUserProfile,
} from "./pages/main";

const App = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="/feed/:id" element={<Feed />} />
          <Route path="/search" element={<Search />} />
          <Route path="/create" element={<Create />} />
          <Route path="/user/:id" element={<UserProfile />} />
          <Route path="/editProfile" element={<EditUserProfile />} />
        </Route>

        <Route path="landing" element={<Landing />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<Error />} />
      </Routes>

      <ToastContainer position="top-center" />
    </>
  );
};

export default App;
