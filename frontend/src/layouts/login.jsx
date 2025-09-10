import React from "react";
import { useNavigate } from "react-router";

/* Mascota Búho: baja las alas para taparse los ojos mientras tipeás */
function OwlMascot({ cover = false }) {
  const t = ".28s ease";
  const leftWing = {
    transition: `transform ${t}`,
    transformOrigin: "48px 102px",
    transform: cover
      ? "translate(22px,-36px) rotate(-18deg)"
      : "translate(0,0) rotate(0deg)",
  };
  const rightWing = {
    transition: `transform ${t}`,
    transformOrigin: "112px 102px",
    transform: cover
      ? "translate(-22px,-36px) rotate(18deg)"
      : "translate(0,0) rotate(0deg)",
  };
  const eyesOpacity = { transition: "opacity .12s ease", opacity: cover ? 0 : 1 };

  return (
    <svg
      viewBox="0 0 160 160"
      width="120"
      height="120"
      aria-hidden="true"
      style={{ display: "block", margin: "0 auto 8px" }}
    >
      <defs>
        <filter id="owl-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity=".2" />
        </filter>
      </defs>

      {/* Cuerpo */}
      <ellipse
        cx="80"
        cy="100"
        rx="42"
        ry="50"
        fill="#FFF7E6"
        stroke="#6B4E16"
        strokeWidth="3"
        filter="url(#owl-shadow)"
      />
      {/* Pecho */}
      <ellipse cx="80" cy="112" rx="28" ry="34" fill="#FFECCB" />

      {/* Cabeza */}
      <circle
        cx="80"
        cy="68"
        r="36"
        fill="#FFF7E6"
        stroke="#6B4E16"
        strokeWidth="3"
      />

      {/* Ojos (se ocultan cuando el búho se tapa) */}
      <g style={eyesOpacity}>
        <circle cx="62" cy="66" r="12" fill="#FFFFFF" stroke="#6B4E16" strokeWidth="2" />
        <circle cx="98" cy="66" r="12" fill="#FFFFFF" stroke="#6B4E16" strokeWidth="2" />
        <circle cx="62" cy="66" r="5" fill="#6B4E16" />
        <circle cx="98" cy="66" r="5" fill="#6B4E16" />
      </g>

      {/* Pico */}
      <polygon points="80,78 73,90 87,90" fill="#E0A11B" stroke="#6B4E16" strokeWidth="2" />

      {/* Ala izquierda (sube para tapar) */}
      <g style={leftWing}>
        <ellipse
          cx="48"
          cy="102"
          rx="16"
          ry="26"
          fill="#D8B98A"
          stroke="#6B4E16"
          strokeWidth="3"
        />
      </g>

      {/* Ala derecha (sube para tapar) */}
      <g style={rightWing}>
        <ellipse
          cx="112"
          cy="102"
          rx="16"
          ry="26"
          fill="#D8B98A"
          stroke="#6B4E16"
          strokeWidth="3"
        />
      </g>

      {/* Patitas */}
      <g fill="#E0A11B" stroke="#6B4E16" strokeWidth="2">
        <rect x="66" y="142" width="8" height="6" rx="2" />
        <rect x="86" y="142" width="8" height="6" rx="2" />
      </g>
    </svg>
  );
}

const LoginContent = () => {
  const navigate = useNavigate();
  const [error, setError] = React.useState(false);

  // estado para "taparse" (mientras tipeás y 700 ms después)
  const [isTyping, setIsTyping] = React.useState(false);
  const typingTimer = React.useRef(null);

  React.useEffect(() => {
    return () => typingTimer.current && clearTimeout(typingTimer.current);
  }, []);

  const tryLogin = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        alert(`Credenciales inválidas. Por favor, inténtalo de nuevo.${res}`);
        return;
      }
      const data = await res.json();
      console.log("Login successful:", data);
      navigate("/");
      navigate(0);
    } catch (error) {
      console.error("Error durante el login:", error);
      alert("Credenciales inválidas. Por favor, inténtalo de nuevo.");
    }
  };

  // handlers del password: se tapa mientras escribís (y 700ms después)
  const onPasswordInput = () => {
    setIsTyping(true);
    if (typingTimer.current) clearTimeout(typingTimer.current);
    typingTimer.current = setTimeout(() => setIsTyping(false), 700);
  };
  const onPasswordBlur = () => {
    setIsTyping(false);
    if (typingTimer.current) clearTimeout(typingTimer.current);
  };
  // si querés que se tape apenas hay foco, descomentá:
  // const onPasswordFocus = () => setIsTyping(true);

  return (
    <div
      className="container min-vh-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: "rgb(31, 31, 31)" }}
    >
      <form
        className="bg-dark p-5 rounded shadow"
        style={{ minWidth: 400, maxWidth: 600, width: "100%" }}
        onSubmit={tryLogin}
      >
        <h2 className="text-white mb-3 text-center">Iniciar sesión</h2>

        {/* Mascota Búho: baja las alas para tapar los ojos al tipear */}
        <OwlMascot cover={isTyping} />

        <div className="mb-3">
          <label htmlFor="email" className="form-label text-white">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="tucorreo@ejemplo.com"
            required
            autoComplete="username"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="form-label text-white">
            Contraseña
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="••••••••"
            required
            autoComplete="current-password"
            onInput={onPasswordInput}
            onBlur={onPasswordBlur}
            // onFocus={onPasswordFocus}
          />
        </div>

        <button
          type="submit"
          className="btn w-100"
          style={{ backgroundColor: "#c0392b", color: "white" }}
        >
          Entrar
        </button>

        <p style={{ color: "white" }} className="mt-3">
          ¿No tenés una cuenta?&nbsp;
          <a
            href=""
            onClick={(event) => {
              event.preventDefault();
              navigate("/signIn");
            }}
          >
            creá una
          </a>
        </p>
      </form>
    </div>
  );
};

export default LoginContent;