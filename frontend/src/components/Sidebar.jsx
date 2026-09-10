import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {
    const navigate = useNavigate();

    return (
        <aside className="sidebar d-none d-lg-flex">

            <div>

                {/* LOGO */}
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

                {/* NOVA CONVERSA */}
                <button
                    className="new-chat-button"
                    onClick={() => navigate("/")}
                >
                    <i className="bi bi-plus-lg"></i>

                    Nova conversa
                </button>

                {/* NAVEGAÇÃO */}
                <nav className="sidebar-nav">

                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) =>
                            isActive ? "sidebar-link active" : "sidebar-link"
                        }
                    >
                        <i className="bi bi-house"></i>
                        Início
                    </NavLink>

                    <NavLink
                        to="/recentes"
                        className={({ isActive }) =>
                            isActive ? "sidebar-link active" : "sidebar-link"
                        }
                    >
                        <i className="bi bi-clock-history"></i>
                        Recentes
                    </NavLink>

                </nav>

            </div>

            {/* USUÁRIO */}
            <div className="sidebar-profile">

                <div className="profile-avatar">
                    M
                </div>

                <div className="profile-info">
                    <strong>MADUK</strong>

                    <span>
                        © Feito por Ricardo Augusto e Mateus lopes
                    </span>
                </div>

            </div>

        </aside>
    );
}

export default Sidebar;