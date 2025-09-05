import { useEffect, useState } from "react";

export function useGetUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;
    setLoading(true);

    fetch("http://localhost:3000/api/auth/tokenchk", { method: "POST", credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error("No autorizado");
        return res.json();
      })
      .then((data) => { if (alive) setUser(data) })
      .catch((err) => { if (alive) setError(err.message) })
      .finally(() => { if (alive) setLoading(false) });

    return () => { alive = false };
  }, []);

  return { user, loading, error };
}
