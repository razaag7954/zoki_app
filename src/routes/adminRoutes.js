import DashboardIcon from "@material-ui/icons/Dashboard";
import LocationOn from "@material-ui/icons/LocationOn";
import HotelIcon from '@material-ui/icons/Hotel';
import WalletIcon from '@material-ui/icons/AccountBalanceWallet';
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
// core components/views for Admin layout
import Dashboard from "views/admin/dashboard";
import Booking from "views/admin/bookings";
import Agency from "views/admin/agencies";
import Hotel from "views/admin/hotels";
import Package from "views/admin/packages";
import Wallet from "views/admin/wallet";
import Profile from "views/admin/profile";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: DashboardIcon,
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/booking",
    name: "Booking",
    icon: LocationOn,
    component: Booking,
    layout: "/admin",
  },
  {
    path: "/agency",
    name: "Agency",
    icon: BubbleChart,
    component: Agency,
    layout: "/admin",
  },
  {
    path: "/hotel",
    name: "Hotel",
    icon: HotelIcon,
    component: Hotel,
    layout: "/admin",
  },
  {
    path: "/package",
    name: "Package",
    icon: LocalOfferIcon,
    component: Package,
    layout: "/admin",
  },
  {
    path: "/wallet",
    name: "Wallet",
    icon: WalletIcon,
    component: Wallet,
    layout: "/admin",
  },
  {
    path: "/profile",
    component: Profile,
    layout: "/admin",
  }
];

export default dashboardRoutes;
