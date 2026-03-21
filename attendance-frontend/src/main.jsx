import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById('root')).render(
  <StrictMode>
<<<<<<< HEAD
    <App />
  </StrictMode>,
)
=======
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
>>>>>>> 4f4c08786476e15a054865f602298f7a756255db
