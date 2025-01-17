import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import useTheme from "./hooks/useTheme.js";
import { useAuthContext } from "./context/AuthContext";
import Topbar from "./components/Topbar.jsx";
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";
import TermsAndConditions from "./pages/Anonymous/Terms.jsx";
import AddProfile from "./pages/User/AddProfiles.jsx";
import Homepage from "./pages/Home/Homepage.jsx";
//user pages
import UserProfile from "./pages/User/UserProfile.jsx";
import Settings from "./pages/User/Settings.jsx";

import Single from "./pages/Post/Single.jsx";
import SearchedBlog from "./pages/Post/Search.jsx";
import Write from "./pages/Post/Write.jsx";
import EditPage from "./pages/Post/Search.jsx";
//contest
import ContestList from "./pages/Contest/HomePage.jsx";
//questions page
import QuesList from "./pages/coding/QuesList.jsx";
import Discusspage from "./pages/Post/Search.jsx";

import Footer from "./components/Footer.jsx";
import Page404 from "./pages/Anonymous/Page404.jsx";

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
        <Route path="/terms" element={<TermsAndConditions />} />
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
          <Route path="/edit-post/:id" element={<EditPage />} />
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>

      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
