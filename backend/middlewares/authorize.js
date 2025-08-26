import { permissions } from "../utils/permissions.js";

export const authorize = (action) => {
  return (req, res, next) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "No autenticado" });
    }

    const role = user.role;

    // admin puede todo
    if (permissions[role]?.includes("*")) {
      return next();
    }

    if (permissions[role]?.includes(action)) {
      return next();
    }

    return res.status(403).json({ message: "No autorizado" });
  };
};
