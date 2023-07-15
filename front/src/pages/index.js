import Home from "./Home07";
import Explore from "./Explore04";
import ItemDetails from "./ItemDetails02";
import Activity01 from "./Activity01";
import HelpCenter from "./HelpCenter";
import Authors02 from "./Authors02";
import WalletConnect from "./WalletConnect";
import CreateItem from "./CreateItem";
import EditProfile from "./EditProfile";
import Login from "./Login";
import SignUp from "./SignUp";
import NoResult from "./NoResult";
import FAQ from "./FAQ";
import Contact02 from "./Contact02";

const routes = [
  { path: "/", component: <Home /> },
  { path: "/explore", component: <Explore /> },
  { path: "/item-detail-02", component: <ItemDetails /> },
  { path: "/activity-01", component: <Activity01 /> },
  { path: "/help-center", component: <HelpCenter /> },
  { path: "/authors-02", component: <Authors02 /> },
  { path: "/wallet-connect", component: <WalletConnect /> },
  { path: "/create-item", component: <CreateItem /> },
  { path: "/edit-profile", component: <EditProfile /> },
  { path: "/login", component: <Login /> },
  { path: "/sign-up", component: <SignUp /> },
  { path: "/no-result", component: <NoResult /> },
  { path: "/faq", component: <FAQ /> },
  { path: "/contact-02", component: <Contact02 /> },
];

export default routes;
