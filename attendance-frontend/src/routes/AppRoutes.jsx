import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from '../pages/user/Login';
import Register from '../pages/user/Register';
import UserDashboard from '../pages/user/UserDashboard';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<UserDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;