# :books: LibraryVerse - TFG Bryan Edward

Mi motivación es mi deseo de profundizar en adentrarme en nuevas técnologias y 
mejorar mis habilidades prácticas en el desarrollo de aplicaciones web, en este 
caso me adentro en frameworks de Javascript como React.js y Next.js, usando 
Typescript para añadir el tipado estático a mi código y Tailwind para poder usar 
interfaz elegante y funcional, he elegido Prisma DB para gestionar el modelo de 
base de datos, lo cual me permite interactuar con la base de datos de una manera 
más intuitiva y eficiente esta misma usara una base de datos alojada en 
Neon.Tech página que me ofrece una base de datos gratis, todo con tal de
aprender nuevos lenguajes de programación usados actualmente en empresas,
para prepararme ya para ser un buen profesional.


> [!Note]
> ### Tecnologías Utilizadas
> Se utiliza tanto para el Backend y Frontend:
>> ![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)

### Frontend:
> 
[![My Skills](https://skillicons.dev/icons?i=tailwind,css,typescript,react,)](https://skillicons.dev)
> ORM, Base de datos:
> 
[![My Skills](https://skillicons.dev/icons?i=prisma,postgresql,)](https://skillicons.dev)

### Despliegue en la web:
>
> githubactions
[![My Skills](https://skillicons.dev/icons?i=githubactions,)](https://skillicons.dev)


> [!Important]
> ### Instalación
>

- Paso 1:  Clonar repositorio
```bash
git clone https://github.com/BryantMagik/libraryverse.git`
```
- Paso 2: Instalación de dependencias
```bash
cd /libraryverse

npm i install 
```
- Paso 3: agregar archivo .env
```css
DATABASE_URL = ""
BASE_URL = ""
AUTH_SECRET = ""

GITHUB_CLIENT_ID = ""
GITHUB_CLIENT_SECRET = "" 

GOOGLE_CLIENT_ID = ""
GOOGLE_CLIENT_SECRET = ""

NEXT_PUBLIC_RESEND_API = ""
NEXT_PUBLIC_API_URL = ""

NEXT_PUBLIC_GOOGLEBOOKS_KEY= ""

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = ""
NEXT_PUBLIC_CLOUDINARY_API_KEY = ""

CLOUDINARY_API_SECRET =""
```
- Paso 4: Configuración de emails en /lib/mail.ts
se deberá cambiar la configuración de los mail y poner los tuyos propios

- Paso 5: Inicio en local
```bash
npm run dev
```
