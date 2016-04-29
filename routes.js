import LoadingView from './components/LoadingView';
import SigninView from "./components/SigninView";
import EmailsView from './components/EmailsView';
import EmailView from './components/EmailView';

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
  },
  email: {
    name: "Email",
    component: EmailView,
    onForward: (navigator) => {},
    onBack: (navigator) => {},
    index: 3
  }
};

export default ROUTES;