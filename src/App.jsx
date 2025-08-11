import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { MyRouter } from "./routes/router"; // ✅ FIXED: lowercased
import { store, persistor } from "./store";



function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<div>Loading Please wait</div>} persistor={persistor}>
        <MyRouter />
      </PersistGate>
    </Provider>
  );
}

export default App;