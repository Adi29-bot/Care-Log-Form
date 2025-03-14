import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import "./nav.css";
import { MdAccessibilityNew, MdAbc, MdMenu, MdClose } from "react-icons/md";

const Navbar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleItemClick = (index) => {
    setActiveIndex(index);
    setIsSidebarOpen(false); // Close sidebar on item click
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleResize = () => {
    if (window.innerWidth > 699) {
      setIsSidebarOpen(false); // Close sidebar if width exceeds 699px
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const navItems = [
    { text: "Daily Log", to: "/Care-Log-Form", icon: "📝" },
    { text: "ABC Chart", to: "/Care-Log-Form/abc-chart", icon: <MdAbc style={{ color: "#2600ff" }} /> },
    { text: "Incident", to: "/Care-Log-Form/incident-form", icon: "🚨" },
    { text: "Body Maps", to: "/Care-Log-Form/body-maps", icon: <MdAccessibilityNew /> },
    { text: "BRS", to: "/Care-Log-Form/brs", icon: "📋" },
    { text: "MAR", to: "/Care-Log-Form/mar", icon: "💊" },
    { text: "Activity Evidence", to: "/Care-Log-Form/activity-evidence", icon: "📷" },
  ];

  return (
    <div className='navigation'>
      <div className='logo-container'>
        <Link to='/'>
          <img src={logo} alt='Logo' className='logo' style={{ maxHeight: "50px" }} />
        </Link>
      </div>
      <div className='hamburger' onClick={toggleSidebar}>
        {isSidebarOpen ? <MdClose size={30} /> : <MdMenu size={30} />}
      </div>
      <div className={`overlay ${isSidebarOpen ? "active" : ""}`} onClick={toggleSidebar}></div>
      <ul className={`nav-items ${isSidebarOpen ? "open" : ""}`}>
        {isSidebarOpen && (
          <div className='close-icon' onClick={toggleSidebar}>
            <MdClose size={30} />
          </div>
        )}
        {navItems.map((item, index) => (
          <li key={index} className={`list ${index === activeIndex ? "active" : ""}`} onClick={() => handleItemClick(index)}>
            <Link to={item.to}>
              <span className='icon'>
                <span className='ion-icon'>{item.icon}</span>
              </span>
              <span className='text'>{item.text}</span>
            </Link>
          </li>
        ))}
        <div className='indicator'></div>
      </ul>
    </div>
  );
};

export default Navbar;
