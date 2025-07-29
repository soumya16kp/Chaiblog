import React from "react";
import './Header.css';
import LogoutBtn from "../LogoutBtn.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();

    const navItems = [
        { name: "Home", slug: "/", active: true },
        { name: "Login", slug: "/login", active: !authStatus },
        { name: "Signup", slug: "/signup", active: !authStatus },
        { name: "My Posts", slug: "/all-posts", active: authStatus },
        { name: "Add Post", slug: "/add-post", active: authStatus },
    ];

    return (
        <header className="header">
            {/* Left Side - Blogger Brand */}
            <div className="brand">
                Blogger
            </div>

            {/* Right Side - Navigation Menu */}
            <nav>
                <ul className="nav-links">
                    {navItems.map((item) =>
                        item.active ? (
                            <li key={item.name} className="nav-item">
                                <button 
                                    onClick={() => navigate(item.slug)}
                                    className="nav-button"
                                >
                                    {item.name}
                                </button>
                            </li>
                        ) : null
                    )}
                    {authStatus && (
                        <li className="nav-item">
                            <LogoutBtn />
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default Header;
