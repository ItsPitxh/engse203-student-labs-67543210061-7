//import library
import { useMemo, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// import components
import AppHeader from "./components/AppHeader.jsx";

// import pages
import AppLayout from "./pages/AppLayout.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import NewRequestPage from "./pages/NewRequestPage.jsx";
import RequestDetailPage from "./pages/RequestDetailPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

function App() {
  // จุดตั้งต้นจาก Week 04 — ทำงานได้ครบ แต่ยังเป็นหน้าเดียวและข้อมูลอยู่ในหน่วยความจำ
  
  
  return (
    // to create path you need route; it creates a tree like structure to link all pages together
    // structure of route starts with "Routes" (Plural): it acts like a container to hold a list of routes in one place
    // and "Route" (singular): is THE path of the pages
    // /pages directory is what contains all the pages.
    <>
      <Routes>
        {/* 
          the parent <Route /> below acts as the layout of all the pages,
          and uses <DashboardPage /> as the index page (see <AppLayout/> on how this works)
        */}
        <Route path="/" element={<AppLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="About" element={<AboutPage />} />
          <Route path="requests/new" element={<NewRequestPage />} />
          <Route path="requests/:requestId" element={<RequestDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
