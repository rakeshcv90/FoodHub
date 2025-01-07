import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './reducers';
import {persistStore, persistReducer} from 'redux-persist';
import {reduxStorage} from './storage';

const persistConfig = {
  key: 'root',
  storage: reduxStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
const persistor = persistStore(store);

export {store, persistor};
