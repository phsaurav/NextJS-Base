import { combineReducers } from 'redux';
import storage from './storage';


const PERSIST_CONFIG_KEY = 'baseProject';

export const reducers = combineReducers({

});

export const persistConfig = {
  key: PERSIST_CONFIG_KEY,
  whitelist: [],
  storage,
};
