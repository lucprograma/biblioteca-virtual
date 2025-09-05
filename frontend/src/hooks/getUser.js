

export async function useGetUser() {
          try {
        const res = await fetch("http://localhost:3000/api/auth/tokenchk", {
          method: "post",
          credentials: "include", // envía la cookie automáticamente
        });
        if (!res.ok) throw new Error("No autorizado");
        const data = await res.json();
        return { data };
      } catch (err) {
        console.log(err);
      }

}