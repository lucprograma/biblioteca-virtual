import { useMemo, useState } from "react";
import { useGetUser } from "../hooks/getUser";
import printJS from "print-js";
import "../styles/idcard.css";

export default function StudentIdCardPro() {
  const { user, loading, error } = useGetUser();
  const [isBack, setIsBack] = useState(false);

  const todayStr = useMemo(
    () =>
      new Date().toLocaleDateString("es-AR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
    []
  );

  if (loading)
    return <div className="spinner-border text-primary" role="status" />;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;
  if (!user) return <div className="alert alert-warning">No hay usuario</div>;

  const normalized = {
    name: user?.name ?? "Nombre Apellido",
    studentId: String(
      user?.studentId ?? user?.user_id ?? user?.id ?? "AZ-0425"
    ),
    grade: user?.course ?? user?.grade ?? "analista de sistemas",
    dni: user?.dni ?? "33333333",
    schoolName: "ISFDYT N°2 - Azul",
    expiresAt: user?.expiresAt ?? null,
    address: user?.address ?? "",
    phone: user?.phone ?? "",
    qrSrc: user?.qrUrl ?? "/logo-instituto-2.png",
  };

  const {
    name,
    studentId,
    grade,
    dni,
    schoolName,
    expiresAt,
    address,
    phone,
    qrSrc,
  } = normalized;

  const Row = ({ label, value }) =>
    value ? (
      <div className="sidc-row">
        <span className="sidc-label">{label}: </span>
        <strong className="sidc-value">{value}</strong>
      </div>
    ) : null;

  // --------- ANVERSO ----------
  const CardFront = ({ large = false }) => (
    <div
      className={`card border-0 shadow sidc-card ${large ? "sidc-card-lg" : ""}`}
    >
      <div className="sidc-header">
        <span className="sidc-school">{schoolName}</span>
        <span className="sidc-badge">Carnet estudiantil</span>
      </div>

      <div className="card-body py-3">
        <h6 className="sidc-name">{name}</h6>
        <Row label="Fecha" value={todayStr} />
        <Row label="ID" value={studentId} />
        {grade && <Row label="Carrera" value={grade} />}
        <Row label="DNI" value={dni} />
        {expiresAt && <Row label="Vence" value={expiresAt} />}
        {(address || phone) && (
          <div className="mt-2">
            <Row label="Dirección" value={address} />
            <Row label="Tel" value={phone} />
          </div>
        )}
        <div className="sidc-note">Presentar junto con DNI si es requerido.</div>
      </div>

      <div className="sidc-footer">
        <span>Centro de Estudiantes</span>
        <div className="sidc-qr">
          <img src={qrSrc} alt="QR / Verificación" />
        </div>
      </div>
    </div>
  );

  // --------- REVERSO ----------
  const CardBack = ({ large = false }) => (
    <div
      className={`card border-0 shadow sidc-card ${large ? "sidc-card-lg" : ""}`}
    >
      <div className="sidc-header">
        <span className="sidc-school">Condiciones de uso</span>
      </div>

      <div className="card-body py-3">
        <ul className="sidc-list">
          <li>
            <strong>Personal e intransferible.</strong>
          </li>
          <li>
            <strong>En caso de extravío, informar al Instituto.</strong>
          </li>
          {expiresAt && (
            <li>
              Válido hasta <strong>{expiresAt}</strong> salvo revocación.
            </li>
          )}
        </ul>
        <div className="mt-3">
          <div className="sidc-label mb-1">Firma de autoridad</div>
          <div className="border-top" style={{ height: 36 }} />
        </div>
      </div>

      <div className="sidc-footer">
        <span>Centro de Estudiantes</span>
        <div className="sidc-qr">
          <img src={qrSrc} alt="QR / Verificación" />
        </div>
      </div>
    </div>
  );

  // --------- IMPRIMIR ANVERSO + REVERSO ----------
  const handlePrint = () => {
    const node = document.getElementById("carnet-id");
    if (!node) return;
    printJS({
      printable: node.innerHTML,
      type: "raw-html",
      css: ["/print.css"], // hoja en /public
      documentTitle: "Carnet Estudiantil",
    });
  };

  return (
    <div className="my-4 text-center">
      {/* Botones */}
      <div className="d-flex justify-content-center gap-2 mb-3">
        <button
          className="btn btn-primary btn-sm"
          onClick={() => setIsBack((prev) => !prev)}
        >
          {isBack ? "Ver anverso" : "Ver reverso"}
        </button>
        <button
          type="button"
          className="btn btn-primary btn-sm"
          data-bs-toggle="modal"
          data-bs-target="#carnetModal"
        >
          Presentar
        </button>
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={handlePrint}
        >
          Imprimir
        </button>
      </div>

      {/* Vista en pantalla (toggle) */}
      <div>{isBack ? <CardBack large/> : <CardFront large />}</div>

      {/* Bloque para impresión (oculto en pantalla) */}
      <div id="carnet-id" className="print-only" aria-hidden="true">
        <CardFront />
        <div style={{ marginTop: "5mm" }} />
        <CardBack />
      </div>

      {/* Modal de presentación */}
      <div
        className="modal fade"
        id="carnetModal"
        tabIndex="-1"
        aria-labelledby="carnetModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 sidc-modal">
            <div className="modal-header border-0 pb-0">
              <h5 id="carnetModalLabel" className="modal-title sidc-modal-title">
                Carnet
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Cerrar"
              ></button>
            </div>
            <div className="modal-body">
              <div className="d-flex justify-content-center align-items-center sidc-present-box">
                {isBack ? <CardBack large /> : <CardFront large />}
              </div>
            </div>
            <div className="modal-footer border-0 pt-0">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}