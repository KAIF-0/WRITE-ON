import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store, persistor } from './redux/store.js'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <PersistGate persistor={persistor}>
    <Provider store={store}>                                            {/*   //we have wrapped the app.jsx so that we can get the store in app.jsx and other  */}
      <App />
    </Provider>
    </PersistGate>
  // </React.StrictMode>,
)
