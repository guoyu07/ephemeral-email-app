import {GoogleSignin} from 'react-native-google-signin';

GoogleSignin.configure({
  scopes: [
    // "https://www.googleapis.com/auth/drive.readonly",
    // "https://www.googleapis.com/auth/gmail.readonly"
    'https://mail.google.com'
  ], // what API you want to access on behalf of the user, default is email and profile
  iosClientId: '2659631354-9t9mbmg7moqutiv5qpg8n98qqavhjsc5.apps.googleusercontent.com', // only for iOS
  webClientId: '2659631354-059fjdgdi76a9elc85ium5n936j392fu.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: true // if you want to access Google API on behalf of the user FROM YOUR SERVER
});

export default GoogleSignin;