// src/pages/CarnetPage.jsx
import StudentIdCardPro from "../components/StudentIdCardPro";

export default function CarnetPage() {
  const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

  return (
    <div className="container d-flex justify-content-center py-4 w-100">
      <div className="w-100" style={{ maxWidth: 520 }}>
        <h1 className="h5 text-center mb-3">Mi carnet</h1>

        <StudentIdCardPro
          fetchUrl={`${API}/api/auth/me`}   // ← trae el usuario actual
          qrEndpointBase={`${API}/api/qr`}  // ← arma .../qr/:studentId.png si no pasás qrSrc
          logoSrc="/escudo-ees1.png"
        />
      </div>
    </div>
  );
}
