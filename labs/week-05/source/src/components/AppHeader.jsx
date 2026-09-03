import { Link, NavLink} from "react-router-dom";
function AppHeader() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <div>
          <p className="eyebrow">ENGSE203 • LAB 05</p>
          <p className="brand">Campus Service Request</p>
        </div>
            {/* 
              <NavLink /> is just like a <Link /> except it automatically detects 
              and applys "Active" or "Pending" states on the current route, without
              having to create a new state.
            */}
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