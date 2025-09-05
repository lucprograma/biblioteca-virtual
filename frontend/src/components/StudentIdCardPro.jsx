import { useState } from "react";
import { useGetUser } from "../hooks/getUser";

export default function StudentIdCardPro() {
  const { user, loading, error } = useGetUser();
  const [isBack, setIsBack] = useState(false);

  if (loading) {
    return <div className="spinner-border text-primary" role="status"></div>;
  }

  if (error) {
    return <div className="alert alert-danger">Error: {error}</div>;
  }

  if (!user) {
    return <div className="alert alert-warning">No hay usuario</div>;
  }

  // Desestructuramos con fallbacks
  const {
    name = "Nombre Apellido",
    studentId = "AZ-0425",
    grade = "Carrera / Curso",
    dni = "",
    schoolName = "ISFDYT N°2 - Azul",
    expiresAt = null,
    qrSrc = "https://via.placeholder.com/240x240.png?text=QR",
    address = "",
    phone = "",
    website = "",
  } = user;

  /** -------- ANVERSO -------- */
  const CardFront = () => (
    <div className="card border-0 shadow idcard">
      <div className="idcard-header">
        <span>{schoolName}</span>
        <span className="text-uppercase small">Carnet estudiantil</span>
      </div>

      <div className="card-body py-3">
        <h6 className="idcard-name">{name}</h6>
        <div className="idcard-row">ID: <strong>{studentId}</strong></div>
        {grade && grade !== "Carrera / Curso" && (
          <div className="idcard-row">Carrera: <strong>{grade}</strong></div>
        )}
        <div className="idcard-row">DNI: <strong>{dni}</strong></div>
        {expiresAt && <div className="idcard-row">Vence: <strong>{expiresAt}</strong></div>}
        {address && <div className="idcard-row">Dirección: <strong>{address}</strong></div>}
        {phone && <div className="idcard-row">Tel: <strong>{phone}</strong></div>}
        {website && <div className="idcard-row">Web: <strong>{website}</strong></div>}
      </div>

      <div className="idcard-footer">
        <span>Centro de Estudiantes</span>
        <div className="idcard-qr">
          <img src={qrSrc} alt="QR" />
        </div>
      </div>
    </div>
  );

  /** -------- REVERSO -------- */
  const CardBack = () => (
    <div className="card border-0 shadow idcard">
      <div className="idcard-header">
        <span>Condiciones de uso</span>
      </div>

      <div className="card-body py-3">
        <ul className="small text-muted ps-3 mb-3">
          <li><strong className="text-dark">Personal e intransferible.</strong></li>
          <li><strong className="text-dark">En caso de extravío, informar a Secretaría.</strong></li>
          {expiresAt && (
            <li>
              Válido hasta <strong className="text-dark">{expiresAt}</strong> salvo revocación.
            </li>
          )}
        </ul>
        <div className="mt-3">
          <div className="small text-secondary mb-1">Firma de autoridad</div>
          <div className="border-top" style={{ height: 36 }} />
        </div>
      </div>

      <div className="idcard-footer">
        <span>Centro de Estudiantes</span>
      </div>
    </div>
  );

  return (
    <div className="my-4 text-center">
      {/* Botón para girar */}
      <div className="d-flex justify-content-center gap-2 mb-3">
        <button
          className="btn btn-outline-secondary btn-sm"
          onClick={() => setIsBack((prev) => !prev)}
        >
          {isBack ? "Ver anverso" : "Ver reverso"}
        </button>
      </div>

      {/* Vista */}
      {isBack ? <CardBack /> : <CardFront />}
    </div>
  );
}
