import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import { SettingsProviderWrapper } from './context/settings.context.jsx';
import { AuthProviderWrapper } from './context/auth.context.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <AuthProviderWrapper>
        <SettingsProviderWrapper>
          <App />
        </SettingsProviderWrapper>
      </AuthProviderWrapper>
    </Router>
  </React.StrictMode>
);