// src/pages/CarnetPage.jsx
import StudentIdCardPro from "../components/StudentIdCardPro";

export default function CarnetPage() {

  const API = import.meta.env.VITE_API_URL || `${import.meta.env.VITE_API_URL}`;

  return (
    <div className="container d-flex justify-content-center py-4 w-100">
      <div className="w-100" style={{ maxWidth: 520 }}>
        {/* Título en blanco sobre fondo azul */}
        <div className="rounded-3 p-3 mb-3" style={{ background: "#003366" }}>
          <h1 className="h5 text-center m-0 fw-bold text-white">
            Mi carnet
          </h1>
        </div>

        <StudentIdCardPro
          fetchUrl={`${API}/api/auth/me`}
          qrEndpointBase={`${API}/api/qr`}
          logoSrc="/escudo-ees1.png"
        />
      </div>
    </div>
  );
}
