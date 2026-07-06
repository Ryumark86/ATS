# SITOC ATS - Agent Context

## Rol
Desarrollador de programas y director operativo de proyectos de telecomunicacion y facturacion con manejo de personal.

## Proposito
SPA para generacion de Analisis de Trabajo Seguro (ATS) - FR-SST-002. Tres bloques: (1) Pasos de la Tarea con SI/NA, (2) Controles Propuestos agrupados por factor de riesgo con SI/NO, (3) Condiciones Inseguras. Firma digital del responsable (Lider de Cuadrila) al final del Bloque 2. Genera PDF y lo envia a Telegram.

## Stack
- HTML5 + CSS3 + Vanilla JS (IIFE, sin frameworks)
- html2pdf.js (CDN + fallback local) para generar PDF
- Canvas API para firmas digitales
- localStorage para historial y cola offline
- Telegram Bot API (envio de PDF)

## Archivos
```
C:\Users\Usuario\Documents\opencode\ATS\
├── index.html                    # Formulario responsive
├── styles.css                    # Estilos CSS
├── app.js                        # Toda la logica JS
├── logo-sitoc.png                # Logo SITOC
├── html2pdf.bundle.min.js        # Fallback local html2pdf
├── preguntas_bloques_ats.md      # Documento de referencia con la estructura de bloques
└── Agent.md                      # Este archivo
```

## Formulario (index.html)

### Secciones
| Seccion | Contenido | Tipo |
|---------|-----------|------|
| Informacion General | Codigo del sitio, Nombre del encargado, Fecha (readonly), Ciudad, Sitio, Descripcion, Equipos | text, date, textarea |
| Verificacion de Seguridad | Extintor vigente, Camilla en buen estado | radio (SI/NO/NA) |
| **1. Pasos de la Tarea** | 20 pasos predefinidos (lista plana) | radio (SI/NA) por paso |
| **2. Controles Propuestos** | 11 subtitulos con 3-7 items cada uno, total ~49 controles | radio (SI/NO) por item |
| **Firma del Responsable** | Al final del Bloque 2: Nombre + Cedula + Canvas firma | text + canvas |
| **3. Condiciones Inseguras** | Ninguna, Estructuras, Fenomeno, Salud, Orden publico, Otra | checkboxes |
| Personal Participante | Lista dinamica: nombre, cedula, cargo, firma (canvas) | dinamico |
| Revision y Aprobacion | Revisado por (RH Gestion Empresarial), Aprobado por (Neyder Segrera) | readonly |

### PRIMER BLOQUE: Pasos de la Tarea (20 pasos)
Cada paso tiene radio buttons SI / N/A en formato pildora.
1. Ingreso al sitio
2. Descargue de materiales y Equipos
3. Inspeccion visual del area alrededor
4. Inspeccion visual desde el piso de la estructura
5. Revision de los elementos de proteccion contra caidas
6. Se observan avisos de prevencion
7. Se instala delimitacion con cinta
8. Colocacion y ajuste de EPP contra caida
9. Se observa la linea de vida vertical
10. Se realiza ascenso del personal instalador
11. Se iza e instala el sistema de poleas
12. Maniobras de izaje de equipos y materiales
13. Acciones de presentacion, ajuste e instalacion
14. Realizacion de pruebas
15. Descenso de materiales sobrantes
16. Desinstalacion de sistema de poleas
17. Descenso del personal
18. Recoger y guardar EPP y herramientas
19. Orden y aseo del sitio
20. Salida

### SEGUNDO BLOQUE: Controles Propuestos (11 subtitulos)
Cada control tiene radio buttons SI / NO en formato pildora.
1. Psicosocial (5 items)
2. Biomecanico (3 items)
3. Fisico (7 items)
4. Mecanico (4 items)
5. Locativo (5 items)
6. Quimico (3 items)
7. Trabajo en Alturas (5 items)
8. Seguridad - Electrico (3 items)
9. Seguridad - Transito (4 items)
10. Seguridad - Publicos (3 items)
11. Fenomenos Naturales (2 items)

### TERCER BLOQUE: Condiciones Inseguras
Checkbox de seleccion multiple. "Ninguna" desmarca las demas.

## Logica (app.js)

### Arquitectura
- Todo encapsulado en IIFE (function(){...})()
- Credenciales Telegram hardcodeadas
- Sin dependencias externas mas alla de html2pdf.js

### Flujo principal (submit)
1. Construir datos del formulario (buildReportData)
2. Validar campos requeridos (validate)
3. Generar HTML del reporte (buildReportHTML)
4. Convertir a PDF via html2pdf.js (generatePDF)
5. Descargar PDF local (downloadBlob)
6. Agregar al historial localStorage (addToHistory)
7. Enviar a Telegram (sendTelegramPDF)
8. Si falla Telegram, guardar en cola pendientes (addToPending)
9. Resetear formulario

### Firmas Digitales (Canvas)
- 1 firma fija: Responsable / Lider de Cuadrila (nombre + cedula + canvas)
- N firmas dinamicas: por cada trabajador agregado
- Cada canvas dibuja con mouse/touch
- Boton "Limpiar" para borrar
- Se exporta como data URL (PNG)
- Se verifica que no este vacio (alpha channel check)
- Marioneta: data.initialized evita doble inicializacion

### PDF Generation (html2pdf.js)
- buildReportHTML() genera HTML completo del reporte
- html2pdf convierte a PDF usando html2canvas + jsPDF
- Formato: A4 vertical
- Nombre: {codigoSitio}_{nombreEncargado}_{fecha}.pdf
- Incluye logo SITOC, tablas con bordes grises, firmas como imagenes
- Escala 2x para buena calidad

### Telegram
- Token: 8619707683:AAFXMNsULLJuOvAmwEZm1iuLgshotv4MPRs
- Chat ID: -5117938351
- Envia PDF como sendDocument con caption Markdown
- Mensaje incluye: codigo, encargado, fecha, sitio, ciudad, descripcion

### Offline Queue
- localStorage key: ats_pending
- Cada entrada guarda: data, pdfBase64, timestamp, pdfOk, retries
- Se reintenta al reconectar (evento online) y al cargar pagina
- Delay 1s entre reintentos

### Historial (localStorage)
- key: ats_history
- Array de objetos: { data, timestamp }
- Descargable como archivo .txt

### Funciones clave
| Funcion | Proposito |
|---------|-----------|
| initSignaturePad | Inicializa canvas para firma (mouse/touch) |
| renderPasos | Renderiza 20 pasos con radio SI/NA |
| renderControles | Renderiza 11 bloques de controles con radio SI/NO |
| buildReportData | Recopila todos los datos del formulario |
| buildReportHTML | Genera HTML del reporte para PDF |
| generatePDF | Convierte HTML a PDF via html2pdf.js |
| sendTelegramPDF | Envia PDF y mensaje a Telegram |
| procesarColaPendiente | Reintenta envios fallidos |
| renderTrabajadores | Renderiza lista dinamica de trabajadores |

### Credenciales (hardcodeadas en app.js)
- Telegram Bot Token: 8619707683:AAFXMNsULLJuOvAmwEZm1iuLgshotv4MPRs
- Telegram Chat ID: -5117938351

### Convenciones de codigo
- Sin comentarios en el codigo
- Nombres de variables en camelCase (funciones en espanol)
- Var en lugar de let/const (ES5 compatible)
- Promesas con async/await y then/catch
- IIFE para aislamiento
- localStorage para persistencia
