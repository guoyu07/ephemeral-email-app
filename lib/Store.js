import {
  AsyncStorage
} from 'react-native';

import async from 'async';
import _ from 'underscore';

function read(key, fallback=null) {
  return AsyncStorage.getItem(key).
    then((data)=>{
      if (data) {
        return JSON.parse(data);
      }
      return fallback;
    })
}

function write(key, value) {
  return AsyncStorage.setItem(key, JSON.stringify(value));
}

const THREAD_SIZE = 10

const Store = {

  getUser() {
    return read("user");
  },

  setUser(user) {
    return write("user", user);
  },

  getThread(threadId) {
    return read("thread-"+threadId);
  },

  getLiveThreadIds() {
    return read("live_threads", []);
  },

  getLiveThreads() {
    return Store.getLiveThreadIds().then((threadIds)=>{
      return new Promise((resolve, reject)=>{
        async.map(threadIds, (id, callback)=>{
          Store.getThread(id).
            then((thread)=>{callback(null, thread)});
        }, (err, threads)=>{
          threads = _.sortBy(threads, function(thread){
            return parseInt(thread.messages[0].internalDate);
          }).reverse();
          resolve(threads);
        });
      });
    });
  },

  setThread(threadId, data) {
    return write("thread-" + threadId, data);
  },

  setLiveThreadIds(ids) {
    Store.getLiveThreadIds().then((existing)=>{
      var insert = existing.concat(ids);
      insert = _.uniq(insert.slice(0, THREAD_SIZE));
      return write("live_threads", insert);
    });
  },

  setThreads(threads) {
    console.log('setting', threads);
    return new Promise((resolve, reject)=>{
      async.each(threads, (thread, callback)=>{
        Store.setThread(thread.id, thread).then(callback);
      }, (err)=>{
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      })
    }).then(()=>{
      Store.setLiveThreadIds(threads.map((thread)=>{
        return thread.id
      }));
    })
  },

  getThread(threadId) {
    return read("thread-" + threadId)
  }

}

export default Store;