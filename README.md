AuditManagement-BackEnd
AuditManagement-BackEnd es un sistema desarrollado para gestionar auditorías de manera eficiente, brindando una interfaz de usuario amigable y un backend sólido que facilita la administración de procesos relacionados con el seguimiento, control y registro de auditorías.

🚀 Características
API RESTful: Permite operaciones CRUD sobre registros de auditoría.

Arquitectura dividida: Backend en Python + Frontend en Node.js (Vite + React).

Fácil integración y despliegue.

Manejo de errores y validaciones básicas.

🛠️ Tecnologías Utilizadas
Backend
Python 3.x

Flask (o librerías equivalentes)

SQLite / ORM (según implementación)

App.py como punto de entrada principal

Frontend
Node.js

Vite

React

JavaScript moderno

📁 Estructura del Proyecto
bash
Copiar
Editar
AuditManagement-BackEnd/
├── App.py                        # Punto de entrada del backend
├── requirements.txt             # Dependencias de Python
├── visual auditorias el comite/ # Carpeta del frontend
│   ├── package.json
│   └── ...
├── .gitignore
└── README.md
⚙️ Instalación y Ejecución
🔁 Clonar el repositorio desde la rama master
bash
Copiar
Editar
git clone -b master https://github.com/emmanuelcalad0615/AuditManagement-BackEnd.git
cd AuditManagement-BackEnd
🐍 Ejecutar el backend (Python)
Crear y activar un entorno virtual:

bash
Copiar
Editar
python -m venv venv
# En Windows:
venv\Scripts\activate
# En macOS/Linux:
source venv/bin/activate
Instalar las dependencias de Python:

bash
Copiar
Editar
pip install -r requirements.txt
Ejecutar la aplicación principal:

bash
Copiar
Editar
python App.py
El servidor backend se ejecutará normalmente en http://localhost:5000/.

🌐 Ejecutar la visual del comité (Frontend con Node.js)
Requisitos previos: Tener instalado Node.js

Navegar a la carpeta del frontend desde la raíz del proyecto:

bash
Copiar
Editar
cd "visual auditorias el comite"
Instalar las dependencias del frontend:

bash
Copiar
Editar
npm install
Ejecutar el servidor de desarrollo:

bash
Copiar
Editar
npm run dev
Luego podrás acceder a la interfaz visual en la URL mostrada en consola (normalmente http://localhost:5173/).

✅ Endpoints de la API
Esta sección puede variar según el contenido de App.py. Aquí un ejemplo general:

GET /audits: Obtener todas las auditorías.

POST /audits: Crear una nueva auditoría.

PUT /audits/<id>: Actualizar una auditoría por ID.

DELETE /audits/<id>: Eliminar una auditoría.

🤝 Contribuciones
¡Las contribuciones son bienvenidas!

Haz un fork del repositorio.

Crea una rama con tu funcionalidad: git checkout -b feature/nueva-funcionalidad.

Realiza tus cambios y haz commit.

Envía un pull request para revisión.

📄 Licencia
Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE (si está disponible) para más información.

📞 Contacto
Desarrollado por Emmanuel Calad.
Para dudas, sugerencias o mejoras, abre un issue aquí.
