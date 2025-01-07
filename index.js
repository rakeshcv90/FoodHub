/**
 * @format
 */

import { Provider } from "react-redux";
import App from "./App";
import { persistor, store } from "./src/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { AppRegistry } from "react-native";
import {name as appName} from './app.json';
const AppRedux = () => {
    return (
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
    );
  };
  
  AppRegistry.registerComponent(appName, () => AppRedux);