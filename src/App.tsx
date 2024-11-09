import LoginPage from "./component/home/login";
import React from 'react';
import TopBar from "./component/topbar/bar";

export default function App() {
  return (
    <div className="max-h-screen overflow-hidden">
      <TopBar/>
      <LoginPage/>
    </div>
  );
}