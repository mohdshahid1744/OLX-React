import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {FirebaseContext} from './store/FirebaseContext'
import Context from './store/FirebaseContext';
import { Firebase } from './firebase/Config';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FirebaseContext.Provider value={{Firebase}}>
        <Context>
        <App />
        </Context>
    </FirebaseContext.Provider>
  </React.StrictMode>
);
