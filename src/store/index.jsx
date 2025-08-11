import { configureStore,combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/hardSet'
import jpReducer from "./slices/jobPostSlice"
import dataReducer from './slices/dataSlice'
import regRecReducer from "./slices/recRegSlice";
import plansSlice from "./slices/plansSlice";


const rootReducer=combineReducers({auth:authReducer,jpSteps:jpReducer,data:dataReducer,regRecSteps:regRecReducer,plans:plansSlice})

const persistConfig = {
  key: "root",
  storage,
  whitelist:['navigation',"auth","jobSteps","data","regRecSteps","plans"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: import.meta.env.NODE_ENV !== "production",
  stateReconciler: autoMergeLevel1,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);