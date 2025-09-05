import { useEffect, useMemo, useState } from "react";

export default function StudentIdCardPro({
  // Fallbacks
  name: initialName = "Nombre Apellido",
  studentId: initialStudentId = "AZ-0425",
  grade: initialGrade = "Carrera / Curso",
  dni: initialDni = "",
  schoolName: initialSchoolName = "ISFDYT N°2 - Azul",
  expiresAt: initialExpiresAt = null,
  qrSrc: initialQrSrc = "https://via.placeholder.com/240x240.png?text=QR",
  logoSrc = "",
  address: initialAddress = "",
  phone: initialPhone = "",
  website: initialWebsite = "",

  // API
  apiBase = null, // ej: "http://localhost:3000"
  fetchUrl = null, // default: /api/auth/me
  qrEndpointBase = null, // si usás QR dinámico: /api/qr/:id.png

  // Imagen estática para el lugar del QR (si no querés QR real)
  qrStaticImageSrc = "/logo-instituto-2.png",

  debug = false,
}) {
  const [isBack, setIsBack] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [lastData, setLastData] = useState(null); // debug

  const resolvedApiBase = useMemo(
    () =>
      (
        apiBase ||
        import.meta.env.VITE_API_URL ||
        "http://localhost:3000"
      ).replace(/\/$/, ""),
    [apiBase]
  );
  const effectiveFetchUrl = useMemo(
    () => (fetchUrl ? fetchUrl : `${resolvedApiBase}/api/auth/me`),
    [fetchUrl, resolvedApiBase]
  );
  const effectiveQrBase = useMemo(
    () => (qrEndpointBase ? qrEndpointBase : `${resolvedApiBase}/api/qr`),
    [qrEndpointBase, resolvedApiBase]
  );

  // Normaliza rutas relativas de la API
  const absolutize = (maybeUrl) => {
    if (!maybeUrl) return maybeUrl;
    if (/^https?:\/\//i.test(maybeUrl)) return maybeUrl;
    if (maybeUrl.startsWith("/")) return `${resolvedApiBase}${maybeUrl}`;
    return `${resolvedApiBase}/${maybeUrl}`;
  };

  const [record, setRecord] = useState({
    name: initialName,
    studentId: initialStudentId,
    grade: initialGrade,
    dni: initialDni,
    schoolName: initialSchoolName,
    expiresAt: initialExpiresAt,
    qrSrc: initialQrSrc,
    address: initialAddress,
    phone: initialPhone,
    website: initialWebsite,
  });

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setErr("");
    setLastData(null);

    fetch(effectiveFetchUrl, {
      credentials: "include",
      headers: { Accept: "application/json" },
    })
      .then(async (r) => {
        const t = await r.text();
        if (!r.ok) throw new Error(`API ${r.status} ${t}`);
        try {
          return JSON.parse(t);
        } catch {
          throw new Error("La API no devolvió JSON válido");
        }
      })
      .then((data) => {
        if (!alive) return;
        setLastData(data); // debug

        // Mapeos a tu esquema
        const studentIdFromApi =
          data.user_id ?? data.id ?? data.studentId ?? record.studentId;
        const gradeFromApi = data.course ?? data.grade ?? record.grade;
        const dniFromApi = data.dni ?? record.dni;

        // QR dinámico solo si no usás imagen estática
        let qrFromApi = record.qrSrc;
        if (!qrStaticImageSrc) {
          qrFromApi =
            data.qrUrl ??
            (effectiveQrBase && studentIdFromApi
              ? `${effectiveQrBase}/${encodeURIComponent(studentIdFromApi)}.png`
              : record.qrSrc);
          qrFromApi = absolutize(qrFromApi);
        }

        setRecord((prev) => ({
          ...prev,
          name: data.name ?? prev.name,
          studentId: String(studentIdFromApi),
          grade: gradeFromApi,
          dni: dniFromApi,
          schoolName: data.schoolName ?? prev.schoolName,
          expiresAt: data.expiresAt ?? data.expires_at ?? prev.expiresAt,
          qrSrc: qrFromApi,
          address: data.address ?? prev.address,
          phone: data.phone ?? prev.phone,
          website: data.website ?? prev.website,
        }));
      })
      .catch((e) => {
        console.error("[Carnet] Error al cargar datos:", e);
        if (alive) setErr("No pude cargar tus datos desde la API.");
      })
      .finally(() => alive && setLoading(false));

    return () => {
      alive = false;
    };
  }, [effectiveFetchUrl, effectiveQrBase, resolvedApiBase, qrStaticImageSrc]);

  const {
    name,
    studentId,
    grade,
    dni,
    schoolName,
    expiresAt,
    qrSrc,
    address,
    phone,
    website,
  } = record;

  // Siempre mostramos la imagen estática si viene; si no, usamos qrSrc
  const displayQrSrc = qrStaticImageSrc || qrSrc;

  // Helper: fila etiqueta/valor (valor en negrita)
  const Row = ({ label, value }) =>
    value ? (
      <div className="text-muted small text-wrap">
        {label}: <strong className="text-dark">{value}</strong>
      </div>
    ) : null;

  const CardFront = () => (
    <div className="card border-0 shadow idcard position-relative">
      {logoSrc && (
        <img
          src={logoSrc}
          alt="Escudo"
          className="position-absolute top-50 start-50 translate-middle"
          style={{ width: 220, opacity: 0.06, pointerEvents: "none" }}
        />
      )}

      <div className="idcard-header text-white d-flex justify-content-between align-items-center px-3">
        <strong className="small me-2 text-wrap">{schoolName}</strong>
        <span className="text-uppercase small">Carnet estudiantil</span>
      </div>

      <div className="card-body py-3">
        <div className="row g-3">
          <div className="col-9">
            {/* Nombre en negrita grande */}
            <h6 className="mb-1 fw-bold lh-sm text-wrap">{name}</h6>

            {/* Resto de campos con etiqueta gris + valor en negrita */}
            <Row label="ID" value={studentId} />
            {grade && grade !== "Carrera / Curso" && (
              <Row label="Carrera/Curso" value={grade} />
            )}
            <Row label="DNI" value={dni} />
            {expiresAt && <Row label="Vencimiento" value={expiresAt} />}

            {(address || phone || website) && (
              <div className="mt-2 small text-secondary lh-sm">
                <Row label="Dirección" value={address} />
                <Row label="Tel" value={phone} />
                <Row label="Web" value={website} />
              </div>
            )}

            <div className="small mt-2 text-secondary lh-sm">
              Presentar junto con DNI si es requerido.
            </div>
          </div>

          <div className="col-3 text-center">
            <div className="ratio ratio-1x1 border rounded">
              <img
                src={displayQrSrc}
                alt="Verificación"
                className="w-100 h-100 p-1"
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="idcard-footer d-flex justify-content-between align-items-center px-3">
        <span className="small text-secondary">
          Centro de Estudiantes ISFDYT N°2{" "}
        </span>
        <span className="small text-secondary">
          {" "}
          © {new Date().getFullYear()}
        </span>
      </div>

      {(loading || err) && (
        <div
          className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center"
          style={{ background: "rgba(255,255,255,.7)" }}
        >
          {loading && (
            <div className="spinner-border text-primary mb-2" role="status" />
          )}
          {err && (
            <div className="alert alert-danger py-1 px-2 mb-0">{err}</div>
          )}
        </div>
      )}
    </div>
  );

  const CardBack = () => (
    <div className="card border-0 shadow idcard position-relative">
      <div className="idcard-header back w-100  d-flex justify-content-between align-items-center px-3">
        <span className="small text-white">
          Centro de Estudiantes ISFDYT N°2{" "}
        </span>
      </div>
      <div className="card-body py-3">
        <div className="row g-3">
          <div className="col-7">
            <div className="small text-secondary mb-2">Condiciones de uso:</div>
            <ul className="small text-muted mb-3 ps-3">
              <li>
                <strong className="text-dark">
                  Personal e intransferible.
                </strong>
              </li>
              <li>
                <strong className="text-dark">
                  En caso de extravío, informar a Secretaría.
                </strong>
              </li>
              {expiresAt && (
                <li>
                  <span className="text-muted">Válido hasta </span>
                  <strong className="text-dark">{expiresAt}</strong>
                  <span className="text-muted"> salvo revocación.</span>
                </li>
              )}
            </ul>
            <div className="mt-3">
              <div className="small text-secondary mb-1">
                Firma de autoridad
              </div>
              <div className="border-top" style={{ height: 36 }} />
            </div>
          </div>
          <div className="col-5">
            <div className="ratio ratio-1x1 border rounded">
              <img
                src={displayQrSrc}
                alt="Verificación"
                className="w-100 h-100 p-1"
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="idcard-footer d-flex justify-content-center align-items-center px-3">
        <span className="small text-secondary">
          Centro de Estudiantes ISFDYT N°2
        </span>
      </div>
    </div>
  );

  return (
    <div className="my-4">
      {/* Controles */}
      <div className="d-flex w-100 justify-content-center gap-2 mb-3 flex-wrap">
        <button
          type="button"
          className="btn btn-outline-secondary btn-sm"
          onClick={() => setIsBack((v) => !v)}
        >
          {isBack ? "Ver anverso" : "Girar (ver reverso)"}
        </button>
        <button
          type="button"
          className="btn btn-primary btn-sm"
          data-bs-toggle="modal"
          data-bs-target="#presentModal"
        >
          Presentar
        </button>
        <button
          type="button"
          className="btn btn-outline-dark btn-sm"
          onClick={() => window.print()}
        >
          Imprimir
        </button>
      </div>

      {/* Vista previa */}
      <div className="d-flex justify-content-center">
        {isBack ? <CardBack /> : <CardFront />}
      </div>

      {/* Modal presentación */}
      <div
        className="modal fade"
        id="presentModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0">
            <div className="modal-body bg-dark">
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: 320 }}
              >
                <div className="idcard-present shadow-lg">
                  <CardFront />
                </div>
              </div>
            </div>
            <div className="modal-footer bg-dark border-0">
              <button
                type="button"
                className="btn btn-light"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>

      {debug && (
        <pre
          className="mt-3 p-2 border rounded bg-light small"
          style={{ maxHeight: 240, overflow: "auto" }}
        >
          {`API base: ${resolvedApiBase}
GET: ${effectiveFetchUrl}
Error: ${err || "(ninguno)"}
Datos crudos:
${lastData ? JSON.stringify(lastData, null, 2) : "(sin datos aún)"}`}
        </pre>
      )}
    </div>
  );
}
