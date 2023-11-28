import { combineReducers } from 'redux';
import authReducer from './slices/authSlice';
import storage from './storage';

const PERSIST_CONFIG_KEY = 'baseProject';

export const reducers = combineReducers({
  auth: authReducer,
});

export const persistConfig = {
  key: PERSIST_CONFIG_KEY,
  whitelist: ['auth'],
  storage,
};
