import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import Topbar from "./components/topbar/Topbar.jsx";
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
import Footer from "./components/Footer";
import Page404 from "./pages/Page404";
import ContestList from "./components/ContestList";
import { Toaster } from "react-hot-toast";
import AddProfile from "./pages/AddProfiles.jsx";
import Discusspage from "./pages/Discusspage.jsx";
import UserProfile from "./pages/UserProfile";
import useTheme from "./hooks/useTheme.js";

// ProtectedRoute Component
function ProtectedRoute() {
  const { authUser } = useAuthContext();
  return authUser ? <Outlet /> : <Navigate to="/login" />;
}

function App() {
  const { theme, setThemeMode } = useTheme();

  return (
    <div className="bg-gray-50 dark:bg-gray-800">
      <Topbar theme={theme} setThemeMode={setThemeMode} />

      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/:id/profile" element={<UserProfile />} />

        {/* Protected Routes Group */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/contest" element={<ContestList />} />
          <Route path="/add-profiles" element={<AddProfile />} />
          <Route path="/search/blog" element={<SearchedBlog />} />
          <Route path="/code" element={<QuesList />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/question/:id" element={<Discusspage />} />
          <Route path="/post/:id" element={<Single />} />
          <Route path="/write/:id/:qid" element={<Write />} />
          <Route path="/edit-post/:id" element={<EditPost />} />
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>

      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
