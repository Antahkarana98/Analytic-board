# 📦 Proyecto Vite + TypeScript + Tailwind + JSON Server

Este proyecto es una aplicación creada con [Vite](https://vitejs.dev/) que utiliza [JSON Server](https://github.com/typicode/json-server) para simular una API RESTful localmente.

---

## 🚀 Requisitos previos

Asegúrate de tener instalados:

- [Node.js](https://nodejs.org/) (v18 o superior)
- [Bun](https://bun.sh/) (opcional, si prefieres usar Bun)
- [npm](https://www.npmjs.com/) (incluido con Node)

---

## 📥 Instalación

1. **Clona este repositorio:**

```bash
git clone https://github.com/camiloardila/prueba-tecnica-analytic.git
cd prueba-tecnica-analytic

```

Para instalar las dependencias

```bash
npm i

bun i
```
## 📦 Correr el proyecto

Para levantar la base de datos simulada en una pestaña de la terminal de tu preferencia

```bash
npm run server

bun server
```

Para levantar la aplicacion en una pestaña de la terminal de tu preferencia

```bash
npm run dev

bun dev
```

## 📝 Notas importantes
No olvides iniciar primero json-server antes de correr la app.

Si deseas cambiar el puerto o archivo de datos de json-server, ajusta en el package.json el comando en consecuencia.

Este proyecto es compatible con npm y bun para levantar el entorno de desarrollo.