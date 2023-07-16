import Home from "./Home";
import Explore from "./Explore";
import ItemDetails from "./ItemDetails";
import Activity from "./Activity";
import HelpCenter from "./HelpCenter";
import Author from "./Author";
import WalletConnect from "./WalletConnect";
import CreateItem from "./CreateItem";
import EditProfile from "./EditProfile";
import Login from "./Login";
import SignUp from "./SignUp";
import NoResult from "./NoResult";
import FAQ from "./FAQ";
import Contact from "./Contact";

const routes = [
  { path: "/", component: <Home /> },
  { path: "/explore", component: <Explore /> },
  { path: "/item-details", component: <ItemDetails /> },
  { path: "/activity", component: <Activity /> },
  { path: "/help-center", component: <HelpCenter /> },
  { path: "/author", component: <Author /> },
  { path: "/wallet-connect", component: <WalletConnect /> },
  { path: "/create-item", component: <CreateItem /> },
  { path: "/edit-profile", component: <EditProfile /> },
  { path: "/login", component: <Login /> },
  { path: "/sign-up", component: <SignUp /> },
  { path: "/no-result", component: <NoResult /> },
  { path: "/faq", component: <FAQ /> },
  { path: "/contact", component: <Contact /> },
];

export default routes;
