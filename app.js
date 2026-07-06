(function () {
    'use strict';

    var BOT_TOKEN = '8619707683:AAFXMNsULLJuOvAmwEZm1iuLgshotv4MPRs';
    var CHAT_ID = '-5117938351';
    var TELEGRAM_BASE = 'https://api.telegram.org/bot' + BOT_TOKEN + '/';

    var STORAGE_HISTORY_KEY = 'ats_history';
    var STORAGE_PENDING_KEY = 'ats_pending';

    var PASOS = [
        'Ingreso al sitio',
        'Descargue de materiales y Equipos',
        'Inspección visual del área alrededor',
        'Inspección visual desde el piso de la estructura en donde se anclarán los trabajadores',
        'Revisión de los elementos de protección contra caídas (Arnés/Eslingas/Ganchos)',
        'Se observan avisos de prevención',
        'Se instala delimitación con cinta para que no se acerque personal ajeno a la tarea y crear una distancia de seguridad por si caen objetos desde altura',
        'Colocación y ajuste en el cuerpo de los elementos de protección contra caída',
        'Se observa la línea de vida vertical (guaya) de la estructura en buen estado sin daños o deterioros',
        'Se realiza ascenso del personal instalador',
        'Se iza e instala el sistema de poleas',
        'Se realizan maniobras de izaje de los equipos y/o materiales y herramientas',
        'Se realizan las acciones de presentación, ajuste e instalación de los equipos',
        'Realización de pruebas',
        'Descenso de materiales sobrantes y herramientas',
        'Desinstalación de sistema de poleas y descenso del mismo',
        'Descenso del personal',
        'Se recogen y guardan los elementos de protección contracaída y herramientas',
        'Orden y aseo del sitio',
        'Salida'
    ];

    var CONTROLES = [
        {
            titulo: 'Ejecución del trabajo a realizar; Desconocimiento e incumplimiento del Procedimiento o Instructivo de trabajo que aplica, Falta de Competencia o habilidad para ejecutar las actividades detalladas en el procedimiento o instructivo de trabajo, estado de salud de los ejecutores, actividades simultáneas (Psicosocial)',
            items: [
                'Socializar las actividades para determinar el alcance de los trabajos simultáneos. Delimitar y señalizar el área de trabajo.',
                'Asegurar que el personal ejecutor conoce y cumpla el procedimiento/instructivo de trabajo seguro de la actividad a ejecutar y el paso a paso, con sus respectivos riesgos y controles.',
                'Verificar que el personal ejecutor tiene las competencias requeridas para realizar la actividad.',
                'Asegurar que los integrantes del frente ejecutor hayan comprendido el alcance, procedimiento/Instructivo y los controles HSE para ejecutar la actividad de forma segura.',
                'Verificar y asegurar que el personal está en condiciones físicas y anímicas adecuadas para la ejecución de la actividad. (Antes y durante la ejecución).'
            ]
        },
        {
            titulo: 'Levantamiento de Cargas manualmente - Posturas Inadecuadas y prolongadas (Biomecánico)',
            items: [
                'Usar guantes, botas de seguridad, gafas, casco.',
                'Realizar pausas activas durante la jornada laboral. En caso de calambre o adormecimiento de alguna extremidad, buscar el apoyo de su compañero.',
                'Al levantar objetos acercarse lo más posible a la carga, doblar rodillas, mantener la columna ergida y hacer la fuerza en las piernas. Carga máxima: 25 Kg una persona, 25-50 Kg dos personas, >50 Kg ayuda mecánica.'
            ]
        },
        {
            titulo: 'Ruido (Intermitente o continuo) - Iluminación deficiente - Rayos Ultravioleta (Físico)',
            items: [
                'Realizar pausas activas durante la jornada laboral.',
                'Utilizar elementos de protección de ruido adecuados (tipo copa y/o de inserción).',
                'Proporcionar iluminación localizada para los trabajos de inspección o precisión.',
                'Utilizar gafas de seguridad lente claro/oscuro.',
                'Evitar exposiciones prolongadas al sol y contar con disponibilidad de hidratación en el sitio.',
                'Aplicar protector solar, uso de camisa manga larga u overol.',
                'En caso de golpe de calor prestar primeros auxilios, activar cadena de llamadas y trasladar al centro asistencial según MEDEVAC.'
            ]
        },
        {
            titulo: 'Uso de Herramientas Manuales - Equipos en funcionamiento - Conexión de equipos de comunicaciones (Mecánico)',
            items: [
                'Toda persona que ingrese al área debe tener su camisa vestida dentro del pantalón y puños abotonados. Prohibido el uso de anillos, pulseras, reloj, cadenas, manillas, etc. Uso de guantes, casco, gafas y botas de seguridad.',
                'Las personas con cabello largo deben recogerlo totalmente.',
                'Identificar y respetar las señales de prohibición, prevención o información en zonas donde se ejecuten trabajos o se operen equipos eléctricos.',
                'Contar con personal competente y certificado.'
            ]
        },
        {
            titulo: 'Ruta de acceso - Ascenso o descenso de escaleras verticales, diagonales y escalones - Terreno irregular, pisos húmedos, resbalosos - Disposición de residuos (Locativo)',
            items: [
                'Identificar ruta adecuada de acceso. Transitar únicamente por las áreas autorizadas. Inspeccionar el área antes y después de intervenirla.',
                'Usar debidamente los EPP: Casco, Guantes, Gafas, Botas de Seguridad, Overol.',
                'Aplicar las prácticas seguras de ascenso y descenso de escaleras verticales y de peldaño.',
                'Disposición correcta de los residuos: Recuperar, Reducir, Reutilizar y Reciclar.',
                'Utilizar los diferentes colores para clasificar los residuos de acuerdo a su contenido.'
            ]
        },
        {
            titulo: 'Presencia de Vapores orgánicos, gases ácidos, gases o líquidos combustibles e inflamables. Material particulado (Químico)',
            items: [
                'Conocimiento de las hojas de seguridad de los productos que se manejan. Deben ser divulgados al personal.',
                'Disposición e inspección de elementos de protección respiratoria.',
                'No consumir alimentos ni beber líquidos en las áreas donde se almacenan químicos.'
            ]
        },
        {
            titulo: 'Trabajo en alturas ascenso y descenso superior a 1.50 mt a nivel superior o inferior (Trabajo en Alturas)',
            items: [
                'Realizar inspección preoperacional al equipo para trabajo en altura y equipo de rescate. Realizar los permisos de trabajo validados por el coordinador de trabajo en alturas. Asegurar cumplimiento de la resolución 4272 de 2021. Verificar condiciones climáticas apropiadas.',
                'Contar con plan de rescate divulgado y disponible en medio físico. Realizar ejercicios de calentamiento y estiramiento antes de ascender. Verificar condiciones físicas de las personas y el sitio. Disponer de camilla, botiquín, inmovilizadores y vehículo para transporte de lesionados.',
                'Evidenciar certificados para trabajo en alturas, exámenes médicos de aptitud, certificados de los equipos. Retiro de joyas. Instalar kit de rescate previo al inicio.',
                'Uso de dotación de EPP: Overol, Casco con Barbiquejo, Botas Dieléctricas, Arnés de cuerpo entero, Eslingas de posicionamiento, Eslinga en Y, Mosquetones (Seguridad Trabajo en Alturas).',
                'Al presentarse un incidente activar cadena de llamada, realizar rescate en alturas, primeros auxilios y trasladar a centro asistencial según plan de rescate.'
            ]
        },
        {
            titulo: 'Equipos en funcionamiento, tableros eléctricos y/o sistemas energizados (Seguridad - Eléctrico)',
            items: [
                'Realizar parte documental para permiso de trabajo eléctrico y divulgación a todo el personal.',
                'Conservar distancias de seguridad cumpliendo con el RETIE. No utilizar elementos metálicos conductores de energía en áreas eléctricas. Toda actividad eléctrica con mínimo dos personas. Contar con certificado CONTE.',
                'Utilizar elementos de seguridad personal dieléctricos, traje de protección para maniobras eléctricas, guantes dieléctricos, calzado dieléctrico. Todos los elementos deben estar secos.'
            ]
        },
        {
            titulo: 'Desplazamiento en vehículos o a pie (Seguridad - Tránsito)',
            items: [
                'Respetar las señales y normas de tránsito, utilizar los cinturones de seguridad, atender las velocidades máximas.',
                'Caminar con precaución y sin afanes.',
                'Realizar las actividades libre del efecto de alcohol o drogas ilegales.',
                'Todo vehículo debe realizar inspección preoperacional.'
            ]
        },
        {
            titulo: 'Secuestro - Amenazas - Extorsión - Robo de equipos - Daño a la infraestructura (Seguridad - Públicos)',
            items: [
                'Coordinar los trabajos en horarios autorizados. Seguir las indicaciones de las autoridades en el sitio de trabajo.',
                'Utilizar overol o chaleco con el logo de la empresa y portar en parte visible el carnet de la empresa.',
                'Mantener la calma, verificar los lineamientos de seguridad física.'
            ]
        },
        {
            titulo: 'Lluvias, tormenta eléctrica (Fenómenos Naturales)',
            items: [
                'Si las actividades son a campo abierto, verificar condiciones atmosféricas. Si hay lluvia o tormenta eléctrica suspender actividades. Los EPP deben estar secos.',
                'En caso de lluvia resguardarse en el cuarto cubierto más próximo.'
            ]
        }
    ];

    var form = document.getElementById('atsForm');
    var btnSubmit = document.getElementById('btnSubmit');
    var pasosContainer = document.getElementById('pasosContainer');
    var controlesContainer = document.getElementById('controlesContainer');
    var trabajadoresContainer = document.getElementById('trabajadoresContainer');
    var btnAgregarTrabajador = document.getElementById('btnAgregarTrabajador');
    var reportContent = document.getElementById('reportContent');
    var fechaInput = document.getElementById('fecha');
    var condicionesContainer = document.getElementById('condicionesContainer');
    var historiaCountEl = document.getElementById('historyCount');
    var _processingQueue = false;

    var trabajadores = [];

    // ---- Signature Pad ----

    function initSignaturePad(canvasId) {
        var canvas = document.getElementById(canvasId);
        if (!canvas) return;
        if (canvas.dataset.initialized) return;
        canvas.dataset.initialized = '1';
        var ctx = canvas.getContext('2d', { willReadFrequently: true });
        var drawing = false;

        function getPos(e) {
            var clientX, clientY;
            if (e.touches) {
                clientX = e.touches[0].clientX;
                clientY = e.touches[0].clientY;
                e.preventDefault();
            } else {
                clientX = e.clientX;
                clientY = e.clientY;
            }
            var r = canvas.getBoundingClientRect();
            return {
                x: (clientX - r.left) * (canvas.width / r.width),
                y: (clientY - r.top) * (canvas.height / r.height)
            };
        }

        function startDraw(e) {
            drawing = true;
            var pos = getPos(e);
            ctx.beginPath();
            ctx.moveTo(pos.x, pos.y);
        }

        function draw(e) {
            if (!drawing) return;
            var pos = getPos(e);
            ctx.lineWidth = 3;
            ctx.lineCap = 'round';
            ctx.strokeStyle = '#333';
            ctx.lineTo(pos.x, pos.y);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(pos.x, pos.y);
        }

        function stopDraw() {
            drawing = false;
            ctx.beginPath();
        }

        canvas.addEventListener('mousedown', startDraw);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', stopDraw);
        canvas.addEventListener('mouseleave', stopDraw);
        canvas.addEventListener('touchstart', startDraw, { passive: false });
        canvas.addEventListener('touchmove', draw, { passive: false });
        canvas.addEventListener('touchend', stopDraw);
    }

    function clearCanvas(canvasId) {
        var canvas = document.getElementById(canvasId);
        if (!canvas) return;
        var ctx = canvas.getContext('2d', { willReadFrequently: true });
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function getCanvasDataURL(canvasId) {
        var canvas = document.getElementById(canvasId);
        if (!canvas) return '';
        var ctx = canvas.getContext('2d', { willReadFrequently: true });
        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var pixels = imageData.data;
        for (var i = 3; i < pixels.length; i += 4) {
            if (pixels[i] !== 0) return canvas.toDataURL('image/png');
        }
        return '';
    }

    // ---- Clear signature buttons ----

    document.addEventListener('click', function (e) {
        if (e.target && e.target.classList.contains('btn-clear-firma')) {
            var canvasId = e.target.getAttribute('data-canvas');
            if (canvasId) clearCanvas(canvasId);
        }
    });

    // ---- Render Pasos (SI/N/A) ----

    function renderPasos() {
        var html = '';
        for (var i = 0; i < PASOS.length; i++) {
            html += '<div class="paso-item">' +
                '<span class="paso-numero">' + (i + 1) + '</span>' +
                '<span class="paso-texto">' + PASOS[i] + '</span>' +
                '<div class="paso-radios">' +
                '<label class="radio-pill radio-si"><input type="radio" name="paso_' + i + '" value="SI" checked> SI</label>' +
                '<label class="radio-pill radio-na"><input type="radio" name="paso_' + i + '" value="N/A"> N/A</label>' +
                '</div>' +
                '</div>';
        }
        pasosContainer.innerHTML = html;
    }

    // ---- Render Controles (SI/NO) ----

    function renderControles() {
        var html = '';
        for (var i = 0; i < CONTROLES.length; i++) {
            var c = CONTROLES[i];
            html += '<div class="control-block">' +
                '<div class="control-titulo">' + (i + 1) + '. ' + c.titulo + '</div>';
            for (var j = 0; j < c.items.length; j++) {
                html += '<div class="control-item">' +
                    '<span class="control-texto">' + c.items[j] + '</span>' +
                    '<div class="control-radios">' +
                    '<label class="radio-pill radio-si"><input type="radio" name="ctrl_' + i + '_' + j + '" value="SI" checked> SI</label>' +
                    '<label class="radio-pill radio-no"><input type="radio" name="ctrl_' + i + '_' + j + '" value="NO"> NO</label>' +
                    '</div>' +
                    '</div>';
            }
            html += '</div>';
        }
        controlesContainer.innerHTML = html;
    }

    // ---- Condiciones checkboxes ----

    condicionesContainer.addEventListener('change', function (e) {
        if (e.target && e.target.type === 'checkbox') {
            var isNinguna = e.target.value === 'NINGUNA';
            if (isNinguna && e.target.checked) {
                var allChecks = condicionesContainer.querySelectorAll('input[type="checkbox"]');
                for (var i = 0; i < allChecks.length; i++) {
                    if (allChecks[i].value !== 'NINGUNA') allChecks[i].checked = false;
                }
            } else if (e.target.checked) {
                var ningunaCheck = condicionesContainer.querySelector('input[value="NINGUNA"]');
                if (ningunaCheck) ningunaCheck.checked = false;
                if (e.target.value === 'OTRA') {
                    document.getElementById('otraCondicionGroup').style.display = 'block';
                    return;
                }
            }
            if (e.target.value === 'OTRA' && !e.target.checked) {
                document.getElementById('otraCondicionGroup').style.display = 'none';
            }
        }
    });

    (function addOtraCheckbox() {
        var div = document.getElementById('otraCondicionGroup');
        if (!div) return;
        var otraCheck = document.createElement('label');
        otraCheck.className = 'checkbox-label';
        otraCheck.innerHTML = '<input type="checkbox" name="condicion" value="OTRA"> Otra:';
        div.parentNode.insertBefore(otraCheck, div);
    })();

    // ---- Workers ----

    function renderTrabajadores() {
        var html = '';
        for (var i = 0; i < trabajadores.length; i++) {
            var t = trabajadores[i];
            var canvasId = 'trabajadorFirma_' + i;
            html += '<div class="trabajador-card" data-index="' + i + '">' +
                '<button type="button" class="btn-remove-trabajador" data-index="' + i + '">✕ Eliminar</button>' +
                '<div class="form-row">' +
                '<div class="form-group"><label>Nombre</label><input type="text" class="trab-nombre" data-index="' + i + '" value="' + t.nombre + '" placeholder="Nombre completo"></div>' +
                '<div class="form-group"><label>Cédula</label><input type="text" class="trab-cedula" data-index="' + i + '" value="' + t.cedula + '" placeholder="Ej: 8-123-4567"></div>' +
                '</div>' +
                '<div class="form-group"><label>Cargo</label><input type="text" class="trab-cargo" data-index="' + i + '" value="' + t.cargo + '" placeholder="Cargo"></div>' +
                '<div class="firma-canvas-wrapper">' +
                '<label>Firma</label>' +
                '<canvas class="firma-canvas trabajador-firma" id="' + canvasId + '" width="400" height="120"></canvas>' +
                '<button type="button" class="btn-small btn-clear-firma" data-canvas="' + canvasId + '">Limpiar</button>' +
                '</div>' +
                '</div>';
        }
        trabajadoresContainer.innerHTML = html;
        for (var j = 0; j < trabajadores.length; j++) {
            initSignaturePad('trabajadorFirma_' + j);
        }
    }

    function getTrabajadoresData() {
        for (var i = 0; i < trabajadores.length; i++) {
            var nombreEl = document.querySelector('.trab-nombre[data-index="' + i + '"]');
            var cedulaEl = document.querySelector('.trab-cedula[data-index="' + i + '"]');
            var cargoEl = document.querySelector('.trab-cargo[data-index="' + i + '"]');
            if (nombreEl) trabajadores[i].nombre = nombreEl.value.trim();
            if (cedulaEl) trabajadores[i].cedula = cedulaEl.value.trim();
            if (cargoEl) trabajadores[i].cargo = cargoEl.value.trim();
            trabajadores[i].firma = getCanvasDataURL('trabajadorFirma_' + i);
        }
        return trabajadores;
    }

    btnAgregarTrabajador.addEventListener('click', function () {
        trabajadores.push({ nombre: '', cedula: '', cargo: '', firma: '' });
        renderTrabajadores();
    });

    document.addEventListener('click', function (e) {
        if (e.target && e.target.classList.contains('btn-remove-trabajador')) {
            var idx = parseInt(e.target.getAttribute('data-index'), 10);
            if (!isNaN(idx) && idx >= 0 && idx < trabajadores.length) {
                trabajadores.splice(idx, 1);
                renderTrabajadores();
            }
        }
    });

    // ---- Build Data ----

    function buildReportData() {
        var pasos = [];
        for (var i = 0; i < PASOS.length; i++) {
            var sel = document.querySelector('input[name="paso_' + i + '"]:checked');
            pasos.push({ titulo: PASOS[i], valor: sel ? sel.value : 'N/A' });
        }

        var controles = [];
        for (var ci = 0; ci < CONTROLES.length; ci++) {
            var grupo = { titulo: CONTROLES[ci].titulo, items: [] };
            for (var cj = 0; cj < CONTROLES[ci].items.length; cj++) {
                var sel2 = document.querySelector('input[name="ctrl_' + ci + '_' + cj + '"]:checked');
                grupo.items.push({ texto: CONTROLES[ci].items[cj], valor: sel2 ? sel2.value : 'NO' });
            }
            controles.push(grupo);
        }

        var condiciones = [];
        var condChecks = condicionesContainer.querySelectorAll('input[type="checkbox"]:checked');
        for (var k = 0; k < condChecks.length; k++) {
            condiciones.push(condChecks[k].value);
        }
        var ningunaCheck = condicionesContainer.querySelector('input[value="NINGUNA"]');
        if (ningunaCheck && ningunaCheck.checked) condiciones = ['NINGUNA'];

        var data = {
            codigoSitio: document.getElementById('codigoSitio').value.trim(),
            nombreEncargado: document.getElementById('nombreEncargado').value.trim(),
            fecha: fechaInput.value,
            ciudad: document.getElementById('ciudad').value.trim(),
            sitio: document.getElementById('sitio').value.trim(),
            descripcion: document.getElementById('descripcion').value.trim(),
            equipos: document.getElementById('equipos').value.trim(),
            extintor: document.querySelector('input[name="extintor"]:checked') ? document.querySelector('input[name="extintor"]:checked').value : '',
            camilla: document.querySelector('input[name="camilla"]:checked') ? document.querySelector('input[name="camilla"]:checked').value : '',
            pasos: pasos,
            controles: controles,
            condiciones: condiciones,
            otraCondicion: document.getElementById('otraCondicion').value.trim(),
            responsableNombre: document.getElementById('responsableNombre').value.trim(),
            responsableCedula: document.getElementById('responsableCedula').value.trim(),
            responsableFirma: getCanvasDataURL('responsableFirma'),
            trabajadores: getTrabajadoresData(),
            revisadoPor: document.getElementById('revisadoPor').value.trim(),
            aprobadoPor: document.getElementById('aprobadoPor').value.trim()
        };

        return data;
    }

    function validate(data) {
        if (!data.codigoSitio) { alert('Ingrese el código del sitio.'); return false; }
        if (!data.nombreEncargado) { alert('Ingrese el nombre del encargado.'); return false; }
        if (!data.sitio) { alert('Ingrese el sitio/estación.'); return false; }
        return true;
    }

    function sanitizeForFilename(str) {
        return str
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-zA-Z0-9\s_-]/g, '')
            .trim()
            .replace(/\s+/g, '_');
    }

    // ---- PDF Generation ----

    function buildReportHTML(data) {
        var condText = '';
        if (data.condiciones.length === 1 && data.condiciones[0] === 'NINGUNA') {
            condText = '<li>Ninguna</li>';
        } else {
            for (var c = 0; c < data.condiciones.length; c++) {
                var label = data.condiciones[c];
                if (label === 'OTRA') label = 'Otra: ' + data.otraCondicion;
                else if (label === 'ESTRUCTURAS') label = 'Estructuras inestable o en mal estado';
                else if (label === 'FENOMENO') label = 'Fenómeno natural';
                else if (label === 'SALUD') label = 'Mal estado de salud de algún trabajador';
                else if (label === 'ORDEN_PUBLICO') label = 'Situación de orden público';
                condText += '<li>' + label + '</li>';
            }
        }

        var pasosHtml = '';
        for (var p = 0; p < data.pasos.length; p++) {
            var icono = data.pasos[p].valor === 'SI' ? '✓' : '✗';
            pasosHtml += '<tr>' +
                '<td>' + (p + 1) + '</td>' +
                '<td>' + data.pasos[p].titulo + '</td>' +
                '<td style="text-align:center;font-size:14px">' + icono + '</td>' +
                '</tr>';
        }

        var controlesHtml = '';
        for (var ci = 0; ci < data.controles.length; ci++) {
            var g = data.controles[ci];
            controlesHtml += '<tr class="control-header-row"><td colspan="3"><strong>' + (ci + 1) + '. ' + g.titulo + '</strong></td></tr>';
            for (var cj = 0; cj < g.items.length; cj++) {
                var iconoC = g.items[cj].valor === 'SI' ? '✓' : '✗';
                controlesHtml += '<tr>' +
                    '<td style="padding-left:16px">' + (cj + 1) + '</td>' +
                    '<td style="padding-left:16px">' + g.items[cj].texto + '</td>' +
                    '<td style="text-align:center;font-size:14px">' + iconoC + '</td>' +
                    '</tr>';
            }
        }

        function firmaImg(b64) {
            if (!b64) return '—';
            return '<img src="' + b64 + '" class="firma-img" alt="Firma" style="max-width:160px;max-height:45px;display:block">';
        }

        var trabajadoresHtml = '';
        for (var t = 0; t < data.trabajadores.length; t++) {
            var tr = data.trabajadores[t];
            if (tr.nombre || tr.cedula || tr.cargo) {
                trabajadoresHtml += '<tr>' +
                    '<td>' + (tr.nombre || '—') + '</td>' +
                    '<td>' + (tr.cedula || '—') + '</td>' +
                    '<td>' + (tr.cargo || '—') + '</td>' +
                    '<td class="firma-cell" style="height:40px;vertical-align:middle">' + firmaImg(tr.firma) + '</td>' +
                    '</tr>';
            }
        }

        var html = '<div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#222;line-height:1.5;width:210mm;padding:12mm 10mm;background:#fff">' +
            '<img src="logo-sitoc.png" class="report-logo" style="max-width:160px;display:block;margin:0 auto 8px">' +
            '<div class="report-title" style="text-align:center;font-size:15px;font-weight:700;margin-bottom:3px">ANÁLISIS DE TRABAJO SEGURO (ATS)</div>' +
            '<div class="report-subtitle" style="text-align:center;font-size:11px;color:#555;margin-bottom:16px">FR-SST-002 | Versión: 002</div>' +

            '<div style="font-size:12px;font-weight:700;color:#1a73e8;margin:14px 0 6px;padding-bottom:3px;border-bottom:2px solid #1a73e8">Información General</div>' +
            '<table style="width:100%;border-collapse:collapse;margin-bottom:12px;font-size:10px">' +
            '<tr><td style="border:1px solid #999;padding:4px 5px;font-weight:600;width:28%;background:#f0f4fe">Código del Sitio</td><td style="border:1px solid #999;padding:4px 5px">' + data.codigoSitio + '</td></tr>' +
            '<tr><td style="border:1px solid #999;padding:4px 5px;font-weight:600;background:#f0f4fe">Encargado</td><td style="border:1px solid #999;padding:4px 5px">' + data.nombreEncargado + '</td></tr>' +
            '<tr><td style="border:1px solid #999;padding:4px 5px;font-weight:600;background:#f0f4fe">Fecha</td><td style="border:1px solid #999;padding:4px 5px">' + data.fecha + '</td></tr>' +
            '<tr><td style="border:1px solid #999;padding:4px 5px;font-weight:600;background:#f0f4fe">Sitio</td><td style="border:1px solid #999;padding:4px 5px">' + (data.sitio || '—') + '</td></tr>' +
            '<tr><td style="border:1px solid #999;padding:4px 5px;font-weight:600;background:#f0f4fe">Ciudad</td><td style="border:1px solid #999;padding:4px 5px">' + (data.ciudad || '—') + '</td></tr>' +
            '<tr><td style="border:1px solid #999;padding:4px 5px;font-weight:600;background:#f0f4fe">Descripción</td><td style="border:1px solid #999;padding:4px 5px">' + (data.descripcion || '—') + '</td></tr>' +
            '<tr><td style="border:1px solid #999;padding:4px 5px;font-weight:600;background:#f0f4fe">Equipos</td><td style="border:1px solid #999;padding:4px 5px">' + (data.equipos || '—') + '</td></tr>' +
            '</table>' +

            '<div style="font-size:12px;font-weight:700;color:#1a73e8;margin:14px 0 6px;padding-bottom:3px;border-bottom:2px solid #1a73e8">1. Pasos de la Tarea</div>' +
            '<table style="width:100%;border-collapse:collapse;margin-bottom:12px;font-size:10px">' +
            '<thead><tr>' +
            '<th style="border:1px solid #999;padding:4px 5px;text-align:left;vertical-align:top;background:#1a73e8;color:#fff;font-weight:700;font-size:10px;width:30px">#</th>' +
            '<th style="border:1px solid #999;padding:4px 5px;text-align:left;vertical-align:top;background:#1a73e8;color:#fff;font-weight:700;font-size:10px">Paso de la Tarea</th>' +
            '<th style="border:1px solid #999;padding:4px 5px;text-align:center;vertical-align:top;background:#1a73e8;color:#fff;font-weight:700;font-size:10px;width:40px">Aplica</th>' +
            '</tr></thead><tbody>' + pasosHtml + '</tbody></table>' +

            '<div style="font-size:12px;font-weight:700;color:#1a73e8;margin:14px 0 6px;padding-bottom:3px;border-bottom:2px solid #1a73e8">2. Controles Propuestos</div>' +
            '<table style="width:100%;border-collapse:collapse;margin-bottom:12px;font-size:10px">' +
            '<thead><tr>' +
            '<th style="border:1px solid #999;padding:4px 5px;text-align:left;vertical-align:top;background:#1a73e8;color:#fff;font-weight:700;font-size:10px;width:30px">#</th>' +
            '<th style="border:1px solid #999;padding:4px 5px;text-align:left;vertical-align:top;background:#1a73e8;color:#fff;font-weight:700;font-size:10px">Control Propuesto</th>' +
            '<th style="border:1px solid #999;padding:4px 5px;text-align:center;vertical-align:top;background:#1a73e8;color:#fff;font-weight:700;font-size:10px;width:40px">SI/NO</th>' +
            '</tr></thead><tbody>' + controlesHtml + '</tbody></table>' +

            '<div style="font-size:12px;font-weight:700;color:#1a73e8;margin:14px 0 6px;padding-bottom:3px;border-bottom:2px solid #1a73e8">Firma del Responsable</div>' +
            '<table style="width:100%;border-collapse:collapse;margin-bottom:12px;font-size:10px">' +
            '<tr><td style="border:1px solid #999;padding:4px 5px;font-weight:600;width:28%;background:#f0f4fe">Nombre</td><td style="border:1px solid #999;padding:4px 5px">' + (data.responsableNombre || '—') + '</td></tr>' +
            '<tr><td style="border:1px solid #999;padding:4px 5px;font-weight:600;background:#f0f4fe">Cédula</td><td style="border:1px solid #999;padding:4px 5px">' + (data.responsableCedula || '—') + '</td></tr>' +
            '<tr><td style="border:1px solid #999;padding:4px 5px;font-weight:600;background:#f0f4fe">Firma</td><td style="border:1px solid #999;padding:4px 5px;height:45px">' + firmaImg(data.responsableFirma) + '</td></tr>' +
            '</table>' +

            '<div style="font-size:12px;font-weight:700;color:#1a73e8;margin:14px 0 6px;padding-bottom:3px;border-bottom:2px solid #1a73e8">3. Condiciones Inseguras</div>' +
            '<ul style="list-style:none;padding:0;margin:0 0 12px">' + condText + '</ul>' +

            '<div style="font-size:12px;font-weight:700;color:#1a73e8;margin:14px 0 6px;padding-bottom:3px;border-bottom:2px solid #1a73e8">Personal Participante</div>' +
            '<p style="font-size:9px;color:#555;margin-bottom:6px;font-style:italic">Declaro haber leído y comprendido los peligros, los riesgos y las medidas de control.</p>' +
            '<table style="width:100%;border-collapse:collapse;margin-bottom:12px;font-size:10px">' +
            '<thead><tr>' +
            '<th style="border:1px solid #999;padding:4px 5px;text-align:left;vertical-align:top;background:#1a73e8;color:#fff;font-weight:700;font-size:10px">Nombre</th>' +
            '<th style="border:1px solid #999;padding:4px 5px;text-align:left;vertical-align:top;background:#1a73e8;color:#fff;font-weight:700;font-size:10px">Cédula</th>' +
            '<th style="border:1px solid #999;padding:4px 5px;text-align:left;vertical-align:top;background:#1a73e8;color:#fff;font-weight:700;font-size:10px">Cargo</th>' +
            '<th style="border:1px solid #999;padding:4px 5px;text-align:left;vertical-align:top;background:#1a73e8;color:#fff;font-weight:700;font-size:10px">Firma</th>' +
            '</tr></thead><tbody>' +
            (trabajadoresHtml || '<tr><td colspan="4" style="border:1px solid #999;padding:4px 5px;text-align:center">Sin personal participante</td></tr>') +
            '</tbody></table>' +

            '<div style="font-size:12px;font-weight:700;color:#1a73e8;margin:14px 0 6px;padding-bottom:3px;border-bottom:2px solid #1a73e8">Revisión y Aprobación</div>' +
            '<table style="width:100%;border-collapse:collapse;margin-bottom:12px;font-size:10px">' +
            '<tr><td style="border:1px solid #999;padding:4px 5px;font-weight:600;width:28%;background:#f0f4fe">Revisado por</td><td style="border:1px solid #999;padding:4px 5px">' + (data.revisadoPor || '—') + '</td></tr>' +
            '<tr><td style="border:1px solid #999;padding:4px 5px;font-weight:600;background:#f0f4fe">Aprobado por</td><td style="border:1px solid #999;padding:4px 5px">' + (data.aprobadoPor || '—') + '</td></tr>' +
            '</table>' +
            '</div>';

        return html;
    }

    function generatePDF(data) {
        return new Promise(function (resolve, reject) {
            if (typeof html2pdf === 'undefined') {
                reject(new Error('Librería html2pdf no cargada'));
                return;
            }

            var html = buildReportHTML(data);
            reportContent.innerHTML = html;

            var reportEl = reportContent;
            var prevClass = reportEl.className;

            var clone = reportEl.cloneNode(true);
            clone.style.cssText = 'position:fixed;left:0;top:0;width:794px;background:#fff;z-index:999999;visibility:visible;display:block';
            document.body.appendChild(clone);

            var opt = {
                margin: [3, 3, 3, 3],
                filename: sanitizeForFilename(data.codigoSitio) + '_' + sanitizeForFilename(data.nombreEncargado) + '_' + data.fecha + '.pdf',
                image: { type: 'jpeg', quality: 0.95 },
                html2canvas: { scale: 2, useCORS: true, allowTaint: true, logging: true },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
                pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
            };

            requestAnimationFrame(function () {
                html2pdf().set(opt).from(clone).outputPdf('blob').then(function (blob) {
                    if (clone.parentNode) clone.parentNode.removeChild(clone);
                    reportEl.className = prevClass;
                    resolve({ blob: blob, filename: opt.filename });
                }).catch(function (err) {
                    if (clone.parentNode) clone.parentNode.removeChild(clone);
                    reportEl.className = prevClass;
                    reject(err);
                });
            });
        });
    }

    function downloadBlob(blob, filename) {
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(function () { URL.revokeObjectURL(url); }, 10000);
    }

    // ---- Telegram ----

    function tgSendFormData(method, formData) {
        return fetch(TELEGRAM_BASE + method, {
            method: 'POST',
            body: formData
        }).then(function (r) { return r.json(); });
    }

    function sendTelegramPDF(data, pdfBlob) {
        var safeName = sanitizeForFilename(data.codigoSitio) + '_' + sanitizeForFilename(data.nombreEncargado);
        var datePart = data.fecha;
        var filename = safeName + '_' + datePart + '.pdf';

        var text = '📋 *ATS - SITOC*\n\n' +
            '🆔 *Código:* ' + data.codigoSitio + '\n' +
            '👤 *Encargado:* ' + data.nombreEncargado + '\n' +
            '📅 *Fecha:* ' + data.fecha + '\n' +
            '🏢 *Sitio:* ' + (data.sitio || '—') + '\n' +
            '📍 *Ciudad:* ' + (data.ciudad || '—') + '\n' +
            '📝 *Trabajo:* ' + (data.descripcion || '—') + '\n\n' +
            '_Generado por SITOC ATS_';

        var fd = new FormData();
        fd.append('chat_id', CHAT_ID);
        fd.append('document', pdfBlob, filename);
        fd.append('caption', text);
        fd.append('parse_mode', 'Markdown');

        return tgSendFormData('sendDocument', fd).then(function (r) {
            if (!r.ok) throw new Error('sendDocument: ' + (r.description || ''));
        });
    }

    // ---- History ----

    function loadHistory() {
        try {
            var raw = localStorage.getItem(STORAGE_HISTORY_KEY);
            return raw ? JSON.parse(raw) : [];
        } catch (e) { return []; }
    }

    function saveHistory(h) {
        localStorage.setItem(STORAGE_HISTORY_KEY, JSON.stringify(h));
    }

    function addToHistory(data) {
        var h = loadHistory();
        h.push({ data: data, timestamp: new Date().toISOString() });
        saveHistory(h);
        updateHistoryUI();
    }

    function updateHistoryUI() {
        var h = loadHistory();
        var count = h.length;
        historiaCountEl.textContent = count + ' ATS registrado' + (count !== 1 ? 's' : '');
    }

    function clearHistory() {
        if (confirm('¿Eliminar todos los ATS del historial local?')) {
            localStorage.removeItem(STORAGE_HISTORY_KEY);
            updateHistoryUI();
        }
    }

    // ---- Offline Queue ----

    function loadPending() {
        try {
            var raw = localStorage.getItem(STORAGE_PENDING_KEY);
            return raw ? JSON.parse(raw) : [];
        } catch (e) { return []; }
    }

    function savePending(q) {
        localStorage.setItem(STORAGE_PENDING_KEY, JSON.stringify(q));
    }

    function addToPending(entry) {
        var q = loadPending();
        q.push(entry);
        try {
            savePending(q);
        } catch (e) {
            if (e.name === 'QuotaExceededError' || e.code === 22) {
                alert('Almacenamiento local lleno.');
                return;
            }
            throw e;
        }
        actualizarUIPendientes();
    }

    function removeFromPending(index) {
        var q = loadPending();
        q.splice(index, 1);
        savePending(q);
        actualizarUIPendientes();
    }

    function blobToBase64(blob) {
        return new Promise(function (resolve) {
            var reader = new FileReader();
            reader.onload = function (e) {
                resolve(e.target.result.split(',')[1]);
            };
            reader.readAsDataURL(blob);
        });
    }

    function base64ToBlob(b64, type) {
        var byteChars = atob(b64);
        var byteNums = new Array(byteChars.length);
        for (var i = 0; i < byteChars.length; i++) {
            byteNums[i] = byteChars.charCodeAt(i);
        }
        var byteArr = new Uint8Array(byteNums);
        return new Blob([byteArr], { type: type || 'application/pdf' });
    }

    function mostrarToast(mensaje, tipo) {
        tipo = tipo || 'info';
        var existing = document.getElementById('toast');
        if (!existing) return;
        existing.textContent = mensaje;
        existing.className = 'toast ' + tipo;
        existing.classList.remove('hidden');
        setTimeout(function () {
            existing.classList.add('hidden');
        }, 4000);
    }

    async function procesarColaPendiente() {
        if (_processingQueue) return;
        _processingQueue = true;

        var btnRetry = document.getElementById('btnRetryPending');
        if (btnRetry) btnRetry.disabled = true;

        var q = loadPending();
        var anySuccess = false;

        for (var i = q.length - 1; i >= 0; i--) {
            if (!navigator.onLine) break;

            var entry = q[i];
            var pdfOk = entry.pdfOk;

            if (!pdfOk && entry.pdfBase64) {
                try {
                    var blob = base64ToBlob(entry.pdfBase64, 'application/pdf');
                    await sendTelegramPDF(entry.data, blob);
                    pdfOk = true;
                } catch (e) {
                    console.warn('Retry falló:', e.message);
                }
            }

            if (pdfOk) {
                q.splice(i, 1);
                anySuccess = true;
            } else {
                entry.pdfOk = pdfOk;
                entry.retries = (entry.retries || 0) + 1;
            }

            if (q.length > 1) {
                await new Promise(function (resolve) { setTimeout(resolve, 1000); });
            }
        }

        savePending(q);
        actualizarUIPendientes();

        if (btnRetry) btnRetry.disabled = false;
        _processingQueue = false;

        if (anySuccess) {
            mostrarToast('✅ ATS sincronizado(s) correctamente', 'success');
        } else if (q.length > 0 && navigator.onLine) {
            mostrarToast('⚠️ No se pudieron sincronizar algunos ATS.', 'warning');
        }
    }

    function actualizarUIPendientes() {
        var q = loadPending();
        var count = q.length;
        var bar = document.getElementById('pendingBar');
        var countEl = document.getElementById('pendingCount');
        var btnRetry = document.getElementById('btnRetryPending');
        if (bar) bar.classList.toggle('hidden', count === 0);
        if (countEl) countEl.textContent = count + ' envío' + (count !== 1 ? 's' : '') + ' pendiente' + (count !== 1 ? 's' : '');
        if (btnRetry) btnRetry.textContent = 'Reintentar ahora' + (count > 0 ? ' (' + count + ')' : '');
        var container = document.getElementById('pendingList');
        if (container && count === 0) {
            container.classList.add('hidden');
            container.innerHTML = '';
        }
    }

    function renderPendingList() {
        var container = document.getElementById('pendingList');
        if (!container) return;
        var q = loadPending();
        if (q.length === 0 || container.classList.contains('hidden')) {
            container.innerHTML = '';
            return;
        }
        var html = '';
        for (var i = 0; i < q.length; i++) {
            var entry = q[i];
            var d = entry.data || {};
            var failText = entry.pdfOk ? '' : '❌ Falló: PDF';
            var dateStr = d.fecha || (entry.timestamp || '').slice(0, 10);
            html += '<div class="pending-item">' +
                '<div class="pending-item-info">' +
                '<div class="pending-item-name">' + (d.codigoSitio || '—') + ' - ' + (d.nombreEncargado || '—') + '</div>' +
                '<div class="pending-item-detail">' + dateStr + ' · ' + (d.sitio || '') + '</div>' +
                (failText ? '<div class="pending-item-fail">' + failText + '</div>' : '') +
                '</div>' +
                '<button type="button" class="btn-pending-delete" data-index="' + i + '">Eliminar</button>' +
                '</div>';
        }
        html += '<button type="button" class="btn-pending-clear-all" id="btnClearAllPending">Eliminar todos</button>';
        container.innerHTML = html;
    }

    function togglePendingList() {
        var container = document.getElementById('pendingList');
        if (!container) return;
        container.classList.toggle('hidden');
        if (!container.classList.contains('hidden')) {
            renderPendingList();
        }
    }

    // ---- Event Listeners ----

    document.getElementById('btnDownloadHistory').addEventListener('click', function () {
        var h = loadHistory();
        if (h.length === 0) { alert('No hay ATS en el historial.'); return; }
        var text = 'HISTORIAL ATS SITOC\n\n';
        for (var i = 0; i < h.length; i++) {
            var d = h[i].data;
            text += (i + 1) + '. ' + d.codigoSitio + ' | ' + d.nombreEncargado + ' | ' + d.fecha + ' | ' + (d.sitio || '') + '\n';
        }
        var blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
        downloadBlob(blob, 'historial_ats.txt');
    });

    document.getElementById('btnClearHistory').addEventListener('click', clearHistory);

    document.addEventListener('click', function (e) {
        if (e.target && e.target.id === 'btnRetryPending') {
            if (loadPending().length === 0) { alert('No hay envíos pendientes.'); return; }
            procesarColaPendiente();
        }
    });

    document.addEventListener('click', function (e) {
        if (e.target && e.target.id === 'btnViewPending') {
            togglePendingList();
        }
    });

    document.addEventListener('click', function (e) {
        if (e.target && e.target.classList.contains('btn-pending-delete')) {
            var idx = parseInt(e.target.getAttribute('data-index'), 10);
            if (!isNaN(idx)) {
                removeFromPending(idx);
                renderPendingList();
            }
        }
    });

    document.addEventListener('click', function (e) {
        if (e.target && e.target.id === 'btnClearAllPending') {
            if (confirm('¿Eliminar todos los envíos pendientes?')) {
                savePending([]);
                actualizarUIPendientes();
            }
        }
    });

    // ---- Form Submit ----

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        if (typeof html2pdf === 'undefined') {
            alert('Error: No se pudo cargar la librería html2pdf.');
            return;
        }

        btnSubmit.disabled = true;
        btnSubmit.textContent = 'Generando ATS...';

        var data = buildReportData();
        if (!validate(data)) {
            btnSubmit.disabled = false;
            btnSubmit.textContent = 'Generar ATS';
            return;
        }

        btnSubmit.textContent = 'Generando PDF...';

        try {
            var result = await generatePDF(data);
            downloadBlob(result.blob, result.filename);

            addToHistory(data);

            var pdfOk = false;
            btnSubmit.textContent = 'Enviando a Telegram...';
            console.log('PDF blob size:', result.blob.size, 'bytes');
            try {
                await sendTelegramPDF(data, result.blob);
                pdfOk = true;
            } catch (e) {
                console.warn('Telegram error:', e.message);
                console.warn('Telegram error details:', JSON.stringify(e));
            }

            if (!pdfOk) {
                var pdfB64 = await blobToBase64(result.blob);
                addToPending({
                    data: data,
                    pdfBase64: pdfB64,
                    timestamp: new Date().toISOString(),
                    pdfOk: false,
                    retries: 0
                });
            }

            resetForm();

            var msg = '✅ ATS generado: ' + result.filename;
            msg += pdfOk ? '\n✅ Enviado a Telegram' : '\n⚠️ No se pudo enviar a Telegram (pendiente)';
            msg += '\n📊 Historial: ' + loadHistory().length + ' ATS';
            var pending = loadPending().length;
            if (pending > 0) {
                msg += '\n📤 Pendiente de envío: ' + pending;
            }
            alert(msg);
        } catch (err) {
            console.error(err);
            alert('Error: ' + err.message);
        } finally {
            btnSubmit.disabled = false;
            btnSubmit.textContent = 'Generar ATS';
        }
    });

    function resetForm() {
        form.reset();
        document.getElementById('fecha').value = formatDate(new Date());
        var pasosRadios = document.querySelectorAll('[name^="paso_"]');
        for (var i = 0; i < pasosRadios.length; i++) {
            if (pasosRadios[i].value === 'SI') pasosRadios[i].checked = true;
        }
        var ctrlRadios = document.querySelectorAll('[name^="ctrl_"]');
        for (var j = 0; j < ctrlRadios.length; j++) {
            if (ctrlRadios[j].value === 'SI') ctrlRadios[j].checked = true;
        }
        trabajadores = [];
        renderTrabajadores();
        clearCanvas('responsableFirma');
        document.getElementById('otraCondicionGroup').style.display = 'none';
        document.getElementById('otraCondicion').value = '';
        var condChecks = condicionesContainer.querySelectorAll('input[type="checkbox"]');
        for (var k = 0; k < condChecks.length; k++) condChecks[k].checked = false;
        var ningunaCheck = condicionesContainer.querySelector('input[value="NINGUNA"]');
        if (ningunaCheck) ningunaCheck.checked = true;
    }

    function formatDate(d) {
        return d.getFullYear() + '-' +
            String(d.getMonth() + 1).padStart(2, '0') + '-' +
            String(d.getDate()).padStart(2, '0');
    }

    function setDefaultDate() {
        fechaInput.value = formatDate(new Date());
    }

    // ---- Init ----

    renderPasos();
    renderControles();
    initSignaturePad('responsableFirma');
    updateHistoryUI();
    actualizarUIPendientes();
    setDefaultDate();

    window.addEventListener('online', function () {
        mostrarToast('📶 Conexión restaurada. Reenviando ATS pendientes...', 'info');
        procesarColaPendiente();
    });

    if (loadPending().length > 0) {
        setTimeout(function () {
            if (navigator.onLine) {
                mostrarToast('📶 Reanudando envíos pendientes...', 'info');
                procesarColaPendiente();
            }
        }, 2000);
    }
})();
