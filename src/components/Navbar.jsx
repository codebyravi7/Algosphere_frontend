import { Link } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";

const Navbar = () => {
  return (
    <div className="w-full flex justify-between items-center px-4 mb-4">
      <Link
        to="/"
        className="font-semibold text-2xl text-gray-700 dark:text-gray-300"
      >
        Contests Notifier
      </Link>
      <span className="flex justify-center items-center gap-4">
        {/* <Link to="/alarms" aria-label="Notifications">
          <NotificationsIcon color="info" className="hover:text-blue-500" />
        </Link> */}

        <Link to="/settings" aria-label="Settings">
          <SettingsIcon color="info" className="hover:text-blue-500" />
        </Link>
      </span>
    </div>
  );
};

export default Navbar;
