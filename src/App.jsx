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
