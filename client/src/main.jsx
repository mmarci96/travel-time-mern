import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { GlobalProvider } from './context/GlobalContext.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <GlobalProvider>
            <AuthProvider>
                <App />
            </AuthProvider>
        </GlobalProvider>
    </StrictMode>,
);
