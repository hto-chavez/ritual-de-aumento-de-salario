# Ritual de Aumento de Salario — 2° Grado (Compañero)

PWA instalable con el guión completo del ritual de Aumento de Salario (ascenso al segundo grado) de la R∴L∴S∴ Hermes N.° 49, transcrito literalmente de la Liturgia del Segundo Grado.

## Contenido de la carpeta

- `index.html` — aplicación (estructura, estilos y lógica de la interfaz)
- `data.js` — texto íntegro del ritual, repartido por puesto
- `manifest.json` — manifiesto de instalación de la PWA
- `sw.js` — service worker (permite uso sin conexión una vez instalada)
- `icon-192.png`, `icon-512.png` — íconos de la app

## Publicar en GitHub Pages

1. Crea un repositorio nuevo en GitHub (puede ser privado o público; para que Chrome en Android lo instale como PWA necesita ser accesible por HTTPS, lo cual GitHub Pages entrega automáticamente).
2. Sube estos 6 archivos a la raíz del repositorio (o a una carpeta, por ejemplo `/docs`).
3. En el repositorio: **Settings → Pages**.
   - En "Source" elige la rama (`main`) y la carpeta (`/root` o `/docs`, según donde subiste los archivos).
   - Guarda. GitHub mostrará la URL pública, algo como:
     `https://tu-usuario.github.io/nombre-del-repo/`
4. Espera 1–2 minutos a que se publique y abre esa URL para confirmar que carga correctamente.

## Instalar en Android desde Chrome

1. Abre la URL de GitHub Pages en **Chrome** en tu teléfono Android.
2. Toca el menú (⋮, arriba a la derecha).
3. Selecciona **"Instalar aplicación"** o **"Agregar a pantalla de inicio"** (el texto exacto varía según la versión de Chrome).
4. Confirma. El ícono de la app aparecerá en tu pantalla de inicio y se abrirá como una app independiente, sin la barra de direcciones del navegador.
5. Una vez instalada, el service worker guarda los archivos en caché, así que puede abrirse sin conexión a internet tras la primera carga.

## Uso de la aplicación

1. Al abrir la app, captura el nombre de cada candidato al segundo grado (puedes agregar varios con "+ Agregar candidato"). El texto del ritual inserta automáticamente el nombre o los nombres donde el guión original los menciona.
2. Toca "Comenzar el ritual" para desplegar el guión completo, organizado en fases (Apertura, Petición y Examen, Entrada del Candidato, Los Cinco Viajes, Juramento y Proclamación, Catecismo, Clausura/Vuelta a Aprendiz).
3. En la barra superior, selecciona uno o varios puestos (Muy Ven∴ Maest∴, Primer/Segundo Vigilante, Guarda Templo, Experto, Maestro de Ceremonias, Orador, Presidente de Comisión, Candidato(s), Todos los HH∴). Todo lo que ese puesto dice o hace se resalta en amarillo. La barra se repliega al bajar y reaparece al subir, para no estorbar la lectura.
4. La franja delgada superior muestra el porcentaje de avance y la fase actual del ritual.
5. Los bloques con fondo punteado son acciones y movimientos en el Templo (no texto pronunciado); los que tienen 📍 indican la ubicación exacta o inferida del movimiento.

## Notas de fidelidad al guión

- Todo el texto pronunciado se transcribió literal desde la Liturgia del Segundo Grado (PDF fuente del proyecto "RLS Hermes 49").
- Únicamente el Guarda Templo y los Expertos empuñan espada en el ritual (bóveda de acero formada por los dos Expertos; el Muy Ven∴ Maest∴ toma una espada solo para el acto puntual del juramento, tal como lo indica el guión). Ninguna acción asigna espada a "todos los Hermanos".
- Las ubicaciones marcadas con "(inferido)" no están explícitas en el guión original; se dedujeron según la disposición tradicional del Templo (columnas, tronos de los Vigilantes, Oriente/Occidente) para dar continuidad de movimiento.
- Se excluyó del alcance la "Liturgia de Adopción de Louvetones" (ceremonia distinta, para hijos de masones), ya que no forma parte del ritual de Aumento de Salario.
