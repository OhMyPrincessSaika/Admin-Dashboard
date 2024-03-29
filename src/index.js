import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {store} from '../src/app/store';
import { Provider } from 'react-redux';
import { ContextProvider } from './app/ContextProvider';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ContextProvider>
       <Provider store={store}>
         <App />
       </Provider>

    </ContextProvider>
);


