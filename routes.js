import LoadingView from './components/LoadingView';
import SigninView from "./components/SigninView";
import EmailsView from './components/EmailsView';

const ROUTES = {
  loading: {
    name: "Loading",
    component: LoadingView,
    onForward: (navigator) => {},
    onBack: (navigator) => {},
    index: 0
  },
  signin: {
    name: "Signin",
    component: SigninView,
    onForward: (navigator) => {},
    onBack: (navigator) => {},
    index: 1
  },
  emails: {
    name: "Emails",
    component: EmailsView,
    onForward: (navigator) => {},
    onBack: (navigator) => {},
    index: 2
  },
  slideTo(route, navigator) {
    navigator.immediatelyResetRouteStack([]);
    navigator.push(route);
  }
};

export default ROUTES;