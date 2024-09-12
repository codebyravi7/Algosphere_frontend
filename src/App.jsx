import { Route, Routes, Navigate } from "react-router-dom";
import Topbar from "./components/topbar/Topbar";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { useAuthContext } from "./context/AuthContext";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import QuesList from "./pages/coding/QuesList";
import EditPost from "./pages/edit/Editpost";
import SearchedBlog from "./pages/searchPage/Search";

function App() {
  const { authUser } = useAuthContext();
  // const authUser = false;
  return (
    <div className="">
      <Topbar />
      <Routes>
        <Route
          path="/"
          element={authUser ? <Homepage /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />

        <Route
          path="/register"
          element={authUser ? <Navigate to="/" /> : <Register />}
        />
        <Route
          path="/search/blog"
          element={authUser ? <SearchedBlog /> : <Navigate to="/login" />}
        />
        <Route
          path="/post/:id"
          element={authUser ? <Single /> : <Navigate to="/login" />}
        />
        <Route
          path="/write/:id/:qid"
          element={authUser ? <Write /> : <Navigate to="/login" />}
        />
        <Route
          path="/code"
          element={authUser ? <QuesList /> : <Navigate to="/login" />}
        />
        <Route
          path="/edit-post/:id"
          element={authUser ? <EditPost /> : <Navigate to="/login" />}
        />
        <Route
          path="/settings"
          element={authUser ? <Settings /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
}

export default App;
