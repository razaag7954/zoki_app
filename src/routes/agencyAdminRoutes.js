import Person from "@material-ui/icons/Person";
import AttachMoney from "@material-ui/icons/AttachMoney";
import LocationOn from "@material-ui/icons/LocationOn";
import People from "@material-ui/icons/People";
import Home from "@material-ui/icons/Home";
import WalletIcon from '@material-ui/icons/AccountBalanceWallet';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
// core components/views for Agency layout
import Dashboard from "views/agency/common/dashboard";
import AgencyProfile from "views/agency/common/agencyProfile";
import UserProfile from "views/agency/common/userProfile";
import UserWallet from "views/agency/admin/userWallet"
import Booking from "views/agency/common/bookings"
import User from "views/agency/admin/users"
import Customer from "views/agency/common/customers"
import Voucher from "views/agency/admin/vouchers";
import Wallet from "views/agency/admin/wallet";
import TopupRequests from "views/agency/admin/topupRequests";

const agencyAdminRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Home,
    component: Dashboard,
    layout: "/agency",
  },
  {
    path: "/user",
    name: "User",
    icon: Person,
    component: User,
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
    path: "/requests",
    name: "Topup Requests",
    icon: HourglassEmptyIcon,
    component: TopupRequests,
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
  },
  {
    path: "/user-wallet",
    component: UserWallet,
    layout: "/agency",
  }
];

export default agencyAdminRoutes;
