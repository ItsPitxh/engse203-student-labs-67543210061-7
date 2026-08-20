import { Link, NavLink} from "react-router-dom";
function AppHeader() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <div>
          <p className="eyebrow">ENGSE203 • LAB 05</p>
          <p className="brand">Campus Service Request</p>
        </div>
        {/* TODO 5A-CP02: เพิ่ม <nav> ที่มี NavLink 3 ปุ่ม — Dashboard, New Request, About
            ปุ่ม Dashboard ที่ to="/" ต้องใส่ prop end ด้วย ไม่งั้นจะ active ทุกหน้า */}
            <nav className="nav">
            <NavLink className='nav-link' to='/'>Dashboard</NavLink>
            <NavLink className='nav-link' to='/requests/new'>New Request</NavLink>
            <NavLink className='nav-link' to='/about'>About</NavLink>

            </nav>
      </div>
    </header>
  );
}

export default AppHeader;