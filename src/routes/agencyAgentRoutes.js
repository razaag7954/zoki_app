import AttachMoney from "@material-ui/icons/AttachMoney";
import LocationOn from "@material-ui/icons/LocationOn";
import People from "@material-ui/icons/People";
import Home from "@material-ui/icons/Home";
import WalletIcon from '@material-ui/icons/AccountBalanceWallet';
// core components/views for Agency layout
import Dashboard from "views/agency/common/dashboard";
import AgencyProfile from "views/agency/common/agencyProfile";
import UserProfile from "views/agency/common/userProfile";
import Booking from "views/agency/common/bookings";
import Customer from "views/agency/common/customers"
import Voucher from "views/agency/agent/vouchers";
import Wallet from "views/agency/agent/wallet";

const agencyAgentRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Home,
    component: Dashboard,
    layout: "/agency",
  },
  {
    path: "/booking",
    name: "Booking",
    icon: LocationOn,
    component: Booking,
    layout: "/agency",
  },
  {
    path: "/customer",
    name: "Customer",
    icon: People,
    component: Customer,
    layout: "/agency",
  },
  {
    path: "/voucher",
    name: "Voucher",
    icon: AttachMoney,
    component: Voucher,
    layout: "/agency",
  },
  {
    path: "/wallet",
    name: "Wallet",
    icon: WalletIcon,
    component: Wallet,
    layout: "/agency",
  },
  {
    path: "/agency-profile",
    component: AgencyProfile,
    layout: "/agency",
  },
  {
    path: "/user-profile",
    component: UserProfile,
    layout: "/agency",
  }
];

export default agencyAgentRoutes;
