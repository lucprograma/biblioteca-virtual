import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

function PasswordInput({ value, onChange }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-4">
        <label className="block text-white mb-1">Contraseña</label><br/>
        <input
            type={showPassword ? 'text' : 'password' }
            name="password"
            value={value}
            onChange={onChange}
            required
            className="w-full p-2 rounded bg-neutral-700 text-black outline-none focus:ring-2 focus:ring-red-500"
            placeholder="contraseña"
          />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
        >
          {showPassword ?  <Eye size={20} /> : <EyeOff size={20} />}
        </button>
    </div>
  );
}

export default PasswordInput;
