import Home from "@material-ui/icons/Home";
import LocationOn from "@material-ui/icons/LocationOn";
import WalletIcon from '@material-ui/icons/AccountBalanceWallet';
// core components/views for Customer layout
import Dashboard from "views/customer/dashboard";
import Booking from "views/customer/bookings";
import Wallet from "views/customer/wallet";
import Profile from "views/customer/profile";

const customerRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Home,
    component: Dashboard,
    layout: "/customer",
  },
  {
    path: "/booking",
    name: "Booking",
    icon: LocationOn,
    component: Booking,
    layout: "/customer",
  },
  {
    path: "/wallet",
    name: "Wallet",
    icon: WalletIcon,
    component: Wallet,
    layout: "/customer",
  },
  {
    path: "/profile",
    component: Profile,
    layout: "/customer",
  }
];

export default customerRoutes;
