import { NavLink, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle.jsx";

function Sidebar() {
    const navigate = useNavigate();

    return (
        <aside className="sidebar d-none d-lg-flex">
            <div>
                <div
                    className="sidebar-logo"
                    onClick={() => navigate("/")}
                >
                    <div className="sidebar-logo-icon">
                        M
                    </div>

                    <span>
                        MADUK <strong>AI</strong>
                    </span>
                </div>

                <button
                    type="button"
                    className="new-chat-button"
                    onClick={() => navigate("/")}
                >
                    <i className="bi bi-plus-lg"></i>
                    Nova conversa
                </button>

                <nav className="sidebar-nav">
                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) =>
                            isActive
                                ? "sidebar-link active"
                                : "sidebar-link"
                        }
                    >
                        <i className="bi bi-house"></i>
                        Início
                    </NavLink>

                    <NavLink
                        to="/recentes"
                        className={({ isActive }) =>
                            isActive
                                ? "sidebar-link active"
                                : "sidebar-link"
                        }
                    >
                        <i className="bi bi-clock-history"></i>
                        Recentes
                    </NavLink>
                </nav>
            </div>

            <div className="sidebar-footer">
                <ThemeToggle />

                <div className="sidebar-profile">
                    <div className="profile-avatar">
                        M
                    </div>

                    <div className="profile-info">
                        <strong>MADUK</strong>
                        <span>Assistente de estudos</span>
                    </div>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;