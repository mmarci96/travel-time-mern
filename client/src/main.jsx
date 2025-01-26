import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { AuthProvider } from './components/auth/AuthContext.jsx';
import { GlobalProvider } from './components/auth/GlobalContext.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
      <GlobalProvider>
      <AuthProvider>
        <App />
         </AuthProvider>
        </GlobalProvider>
    </StrictMode>
);
