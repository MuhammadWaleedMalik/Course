import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { websiteInfo } from './data/website/info';
import { Provider } from 'react-redux';

import store from './store';
document.title = websiteInfo.name;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      
    <Provider store={store}>
      <App />
    </Provider>    
  </React.StrictMode>
);