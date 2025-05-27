# AuditManagement-BackEnd

AuditManagement-BackEnd es un sistema desarrollado para gestionar auditorías de manera eficiente, brindando una interfaz de usuario amigable y un backend sólido que facilita la administración de auditorías.



### Nota:
- Abre y revisa la rama [master](https://github.com/emmanuelcalad0615/AuditManagement-BackEnd/tree/master) del proyecto que es donde estará toda la información y desarrollo.

---
## 🚀 Características

- **API RESTful:** Permite operaciones CRUD sobre registros de auditoría.
- **Arquitectura dividida:** Backend en Python + Frontend en Node.js (Vite + React).
- **Fácil integración y despliegue.**
- **Manejo de errores y validaciones básicas.**

---

## 🛠️ Tecnologías Utilizadas

### Backend
- Python 3.x
- Flask (o librerías equivalentes)
- SQLite / ORM (según implementación)
- `App.py` como punto de entrada principal

### Frontend
- Node.js
- Vite
- React
- JavaScript moderno

---

---

## ⚙️ Instalación y Ejecución

### 1. Clonar el repositorio

```bash
git clone -b master https://github.com/emmanuelcalad0615/AuditManagement-BackEnd.git
cd AuditManagement-BackEnd
```

### 2. Ejecutar el backend (Python)
- Crear y activar un entorno virtual:

```bash
python -m venv venv
# En Windows:
venv\Scripts\activate
# En macOS/Linux:
source venv/bin/activate
```
- Instalar dependencias de Python:

```bash
pip install -r requirements.txt
```

- Ejecutar la Aplicación Principal:

```bash
python App.py
```
El servidor backend se ejecutará normalmente en http://localhost:5000/.

### 3. Ejecutar la visual del comité (Frontend con Node.js)
Requisitos previos: Tener instalado [Node.js](https://nodejs.org/es/download).
- Navegar a la carpeta del frontend desde la raíz del proyecto:
```bash
cd "visual auditorias el comite"
```
- Instalar las dependencias del frontend:

``` bash
npm install
```
- Ejecutar el servidor de desarrollo:

```bash
npm run dev
```
Luego podrás acceder a la interfaz visual en la URL mostrada en consola (normalmente http://localhost:5173/).


### 🤝 Contribuciones
¡Las contribuciones son bienvenidas!

Haz un fork del repositorio.
Crea una rama con tu funcionalidad:
```bash
git checkout -b feature/nueva-funcionalidad
```
Realiza tus cambios y haz commit.
Envía un pull request para revisión.

📞 Contacto
Desarrollado por:
- Emmanuel Calad
ecalad479@soyudemedellin.edu.co

- Santiago Alcaraz
salcaraz466@soyudemedellin.edu.co

- Lenin Ospina
lospina556@soyudemedellin.edu.co

- Esteban Parra
eparra952@soyudemedellin.edu.co

Para dudas, sugerencias o mejoras, abre un [issue](https://github.com/emmanuelcalad0615/AuditManagement-BackEnd/issues) aquí .
