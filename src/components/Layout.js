import "./Layout.css";
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import Login from "./Login";
import Main from "./Main";
import Register from "./Register";

function Layout() {
  const L = useLocation()
  console.log(L);
  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" element={<Navigate to="/todo-app"/>} />
        <Route path="/todo-app" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </div>
  );
}

export default Layout;
