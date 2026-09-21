import { useEffect, useState } from "react";

function ThemeToggle() {
    const [tema, setTema] = useState(() => {
        return localStorage.getItem("maduk-theme") || "dark";
    });

    useEffect(() => {
        document.documentElement.setAttribute(
            "data-theme",
            tema
        );

        localStorage.setItem(
            "maduk-theme",
            tema
        );
    }, [tema]);

    function mudarTema() {
        setTema((temaAtual) =>
            temaAtual === "light"
                ? "dark"
                : "light"
        );
    }

    return (
        <button
            type="button"
            className="theme-toggle"
            onClick={mudarTema}
            aria-label="Alterar tema"
        >
            {tema === "dark" ? (
                <>
                    <i className="bi bi-sun"></i>
                    <span>Modo claro</span>
                </>
            ) : (
                <>
                    <i className="bi bi-moon-stars"></i>
                    <span>Modo escuro</span>
                </>
            )}
        </button>
    );
}

export default ThemeToggle;