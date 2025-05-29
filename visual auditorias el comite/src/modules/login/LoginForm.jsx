import { useState } from "react";

export default function LoginForm({setIsLoggedIn}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch("http://3.143.204.151:5000/trabajador/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correo: email,
        password: password,
      }),
    });

    const data = await response.json();

    if (response.ok && Object.keys(data).length > 0) {
      alert("¡Bienvenido!");
      console.log("Usuario logueado:", data);
      setIsLoggedIn(true);
      // Aquí puedes guardar token o redirigir, según el caso
    } else {
      alert("Correo o contraseña incorrectos");
    }

  } catch (error) {
    console.error("Error al hacer login:", error);
    alert("Hubo un problema con el servidor");
  }
};


  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "#1E3766" }}
    >
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2
          className="text-3xl font-bold text-center mb-6"
          style={{ color: "#1E3766" }}
        >
          Iniciar Sesión
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
              style={{ outlineColor: "#1E3766" }}
              placeholder="ejemplo@correo.com"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Contraseña</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
              style={{ outlineColor: "#1E3766" }}
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full text-white font-semibold py-2 rounded-lg transition duration-200"
            style={{ backgroundColor: "#1E3766" }}
          >
            Entrar al Sistema
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-500">
          ¿No tienes cuenta?, comunicate con el administrador
        </p>
      </div>
    </div>
  );
}
