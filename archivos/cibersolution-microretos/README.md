# ⚡ CiberSolution · Microretos (Beta)

> Un currículo dice lo que sabes. **Un reto demuestra lo que vales.**

Plataforma web beta que conecta **jóvenes de hasta 30 años** con **pymes, startups e instituciones** mediante retos pequeños y reales. Los jóvenes entregan trabajo real (no currículos) y reciben **valoraciones verificadas** de empresas que luego pueden contratarles.

## ✨ Qué incluye esta beta

- 🏠 Landing con propuesta de valor, estadísticas y llamadas a la acción
- 🚀 Flujo para **jóvenes**: elegir reto → entregar → recibir valoración
- 🏢 Flujo para **empresas**: publicar reto → recibir entregas → valorar y contratar
- 🗂 Catálogo de retos con filtros por categoría (diseño, marketing, código, vídeo, datos)
- 👤 Registro de usuarios con rol (joven / empresa) — 100% local (localStorage/sessionStorage)
- 💶 Planes: Jóvenes gratis · Empresas 49 €/mes · Instituciones 199 €/mes
- 🤝 Clientes, aliados, canales de captación y programa Apóstoles
- 🗺 Roadmap: Piloto → Eventos y valoraciones → Plataforma propia

## 🚀 Cómo probarla

Opción rápida: abre `index.html` en tu navegador.

Opción recomendada (servidor local):

```bash
# Python
python -m http.server 8000

# o Node
npx serve .
```

## 📤 Subirla a GitHub

```bash
git init
git add .
git commit -m "Beta inicial de Microretos"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/cibersolution-microretos.git
git push -u origin main
```

### 🌐 Publicar gratis con GitHub Pages

1. En el repositorio: **Settings → Pages**
2. Source: rama `main`, carpeta `/ (root)`
3. Guarda. En 1–2 minutos estará en `https://TU_USUARIO.github.io/cibersolution-microretos/`

> No requiere backend ni base de datos: es HTML + CSS + JS puro. Los datos de la demo se guardan en el navegador del usuario (localStorage).

## 🗂 Estructura

```
├── index.html        # Estructura y contenido
├── css/style.css     # Estilos (tema oscuro, responsive)
├── js/app.js         # Lógica: retos, auth, entregas, filtros
└── assets/img/       # Logo de CiberSolution (fondo transparente)
```

## 🛣 Próximos pasos (según el roadmap)

- [ ] Panel de empresa para ver y valorar entregas
- [ ] Sistema de perfiles públicos con portfolio de valoraciones
- [ ] Pagos y suscripciones reales (Stripe)
- [ ] Backend + base de datos (Firebase/Supabase)
- [ ] Eventos presenciales y promociones con empresas

---
Hecho con 💙 en Málaga · CiberSolution · Conectamos el talento joven
