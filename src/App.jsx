import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import SignUp from "./pages/SignUp";
import Error from "./components/Error";
import Login from "./pages/Login";
import { DataProvider } from "./context/DataContext";
import Profile from "./pages/Profile";
import HomePage from "./pages/HomePage";
import Welcome from "./pages/Welcome";
import AllMeals from "./pages/AllMeals";
import ProfilePage from "./pages/ProfilePage";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Welcome />} errorElement={<Error />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route
          loader={({ params }) => {
            return params.id;
          }}
          path="/home/:id"
          element={<HomePage />}
        />
        <Route
          loader={({ params }) => {
            return params.id;
          }}
          path="/all-meals/:id"
          element={<AllMeals />}
        />
        <Route
          loader={({ params }) => {
            return params.id;
          }}
          path="/profilePage/:id"
          element={<ProfilePage />}
        />
      </>
    )
  );

  return (
    <>
      <DataProvider>
        <RouterProvider router={router} />
      </DataProvider>
    </>
  );
}

export default App;
