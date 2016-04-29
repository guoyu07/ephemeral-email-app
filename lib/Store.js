import {
  AsyncStorage
} from 'react-native';

const Store = {

  getUser() {
    return AsyncStorage.getItem("user").
      then((data) => {
        // console.log('data', data);
        if (data) {
          return JSON.parse(data);
        }
        return null;
      })
  },

  setUser(user) {
    var data = JSON.stringify(user);
    return AsyncStorage.setItem("user", data);
  }

}

export default Store;