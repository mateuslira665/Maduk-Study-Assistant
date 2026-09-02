import { Link } from "react-router-dom";

function MobileHeader() {
    return (
        <>
            <header className="mobile-header d-lg-none">

                <button
                    className="mobile-menu-button"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#mobileMenu"
                    aria-controls="mobileMenu"
                >
                    <i className="bi bi-list"></i>
                </button>

                <div className="mobile-logo">
                    MADUK <strong>AI</strong>
                </div>

                <div className="mobile-avatar">
                    M
                </div>

            </header>

            <div
                className="offcanvas offcanvas-start"
                tabIndex="-1"
                id="mobileMenu"
                aria-labelledby="mobileMenuLabel"
            >
                <div className="offcanvas-header">

                    <h5
                        className="offcanvas-title"
                        id="mobileMenuLabel"
                    >
                        MADUK AI
                    </h5>

                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="offcanvas"
                        aria-label="Fechar"
                    ></button>

                </div>

                <div className="offcanvas-body">

                    <Link
                        to="/"
                        className="mobile-nav-link"
                        data-bs-dismiss="offcanvas"
                    >
                        <i className="bi bi-plus-circle"></i>
                        Nova conversa
                    </Link>

                    <Link
                        to="/"
                        className="mobile-nav-link"
                        data-bs-dismiss="offcanvas"
                    >
                        <i className="bi bi-house"></i>
                        Início
                    </Link>

                    <Link
                        to="/recentes"
                        className="mobile-nav-link"
                        data-bs-dismiss="offcanvas"
                    >
                        <i className="bi bi-clock-history"></i>
                        Recentes
                    </Link>

                </div>
            </div>
        </>
    );
}

export default MobileHeader;