(function () {
    'use strict';

    var CONFIG = {
        TELEGRAM_TOKEN: '8619707683:AAFXMNsULLJuOvAmwEZm1iuLgshotv4MPRs',
        TELEGRAM_CHAT_ID: '-1004421342466',
        HISTORY_KEY: 'ats_history',
        PENDING_KEY: 'ats_pending'
    };

    var PASOS = [
        'Inspeccionar y asegurar el área de trabajo',
        'Despejar área de maniobras (vehículos, equipos, herramientas, materiales)',
        'Verificar condiciones del vehículo (luces, frenos, llantas, combustible, herramientas)',
        'Identificar riesgos asociados con trabajo en alturas',
        'Inspeccionar y usar adecuadamente los EPP (casco, guantes, arnés, eslinga, botas)',
        'Verificar disponibilidad y condiciones del kit de primeros auxilios y extintor',
        'Seleccionar y rotular herramientas y equipos (escaleras, andamios, equipos de izaje)',
        'Asegurar zona de trabajo (señalización visible, conos, cintas de seguridad)',
        'Verificar condiciones climáticas (lluvia, viento, tormentas eléctricas)',
        'Coordinar con el equipo los procedimientos de emergencia (puntos de encuentro, comunicaciones)',
        'Asegurar que el área de trabajo esté libre de personal no autorizado',
        'Verificar que los sistemas de bloqueo y rotulado estén implementados',
        'Realizar análisis de riesgos adicionales si las condiciones cambian',
        'Verificar disponibilidad de agua potable y/o hidratación',
        'Realizar pausas activas programadas',
        'Asegurar iluminación adecuada (trabajo nocturno o en interiores)',
        'Instalar sistemas de ventilación si se requiere (espacios confinados)',
        'Verificar rutas de evacuación y salidas de emergencia',
        'Establecer canales de comunicación con el equipo',
        'Finalizar y registrar novedades, verificar orden y aseo final'
    ];

    var SUBTITLES = [
        {
            id: 'psicosocial',
            subtitle: 'FACTOR DE RIESGO/IMPACTO - CLASIFICACION: Ejecución del trabajo a realizar; Desconocimiento e incumplimiento del Procedimiento o Instructivo de trabajo que aplica, Falta de Competencia o habilidad para ejecutar las actividades detalladas en el procedimiento o instructivo de trabajo, estado de salud de los ejecutores, actividades simultaneas (Psicosocial)',
            items: [
                'Socializar las actividades para determinar el alcance de los trabajos simultáneos. Delimitar y señalizar el área de trabajo.',
                'Asegurar que el personal ejecutor conoce y cumpla el procedimiento/instructivo de trabajo seguro de la actividad a ejecutar y el paso a paso, con sus respectivos riesgos y controles.',
                'Verificar que el personal ejecutor tiene las competencias requeridas para realizar la actividad.',
                'Asegurar que los integrantes del frente ejecutor hayan comprendido el alcance, procedimiento/Instructivo y los controles HSE para ejecutar la actividad de forma segura.',
                'Verificar y asegurar que el personal está en condiciones físicas y anímicas adecuadas para la ejecución de la actividad. (Antes y durante la ejecución).'
            ]
        },
        {
            id: 'biomecanico',
            subtitle: 'Levantamiento de Cargas manualmente - Posturas Inadecuadas y prolongadas (Biomecanico)',
            items: [
                'Usar guantes, botas de seguridad, gafas, casco.',
                'Realizar pausas activas durante la jornada laboral. En caso de calambre o adormecimiento de alguna extremidad. Se debe buscar el apoyo de su compañero, quien está capacitado para colaborarle, evite realizar maniobras peligrosas.',
                'Al levantar objetos debe acercarse lo mas posible a la carga, doblar rodillas, mantener la columna ergida y hacer la fuerza en las piernas durante el levantamiento y el descargue.',
                'Antes de ejecutar la actividad identificar las caracteristicas de la carga (peso, volumen), Personal competente para realizar las actividades. La carga maxima autorizada para levantar por una persona es de 25 Kg, entre 25 y 50 se debe levantar por dos personas y cargas mayores a 50 Kg se requiere ayuda mecanica.'
            ]
        },
        {
            id: 'fisico',
            subtitle: 'Ruido (Intermitente o continuo) - Iluminación deficiente - Rayos Ultravioleta (Fisico)',
            items: [
                'Realizar pausas activas durante la jornada laboral.',
                'Utilizar elementos de protección de ruido adecuados que amortigüen la mayor cantidad de ruido posible a fin de minimizar los efectos (tipo copa y/o de inserción).',
                'Proporcionar iluminación localizada para los trabajos de inspección o precisión.',
                'Utilizar gafas de seguridad lente claro/Oscuro.',
                'Evitar exposiciones prolongadas al sol y contar con disponibilidad de hidratación en el sitio.',
                'Aplicar protector solar en las partes del cuerpo las cuales puedan ser afectadas por la exposicion, uso Camisa manga larga u Overol, realizar pausas activas cada vez que se requiera.',
                'En caso de presentarse golpe de calor se debe prestar primeros auxilios, activar cadena de llamadas y trasladar al centro asistencial de ser necesario según medevac.'
            ]
        },
        {
            id: 'mecanico',
            subtitle: 'Uso de Herramientas Manuales - Equipos en funcionamiento - Conexión de equipos de comunicaciones (Mecanico)',
            items: [
                'Toda persona que ingrese al área debe tener su camisa vestida dentro del pantalón y puños de camisas abotonadas. Prohibido el uso de anillos, pulseras, reloj, cadenas, manillas, etc. Uso de guantes, casco, gafas y botas de seguridad.',
                'Las personas que tienen el cabello largo se lo deben recoger totalmente.',
                'Identificar y respetar las señales que transmitan mensajes de prohibición, prevención o información en zonas donde se ejecuten trabajos o se operen equipos eléctricos.',
                'Contar con Personal que desarrolla la labor competente y certificado.'
            ]
        },
        {
            id: 'locativo',
            subtitle: 'Ruta de acceso - Ascenso o descenso de escaleras verticales, diagonales y escalones - Terreno irregular, pisos húmedos, resbalosos - Disposicion de residuos orgánicos, papel, cartón, plástico, madera, gomas y trapos (Locativo)',
            items: [
                'Identificar ruta adecuada de acceso. Transitar unicamente por las áreas autorizadas, Inspeccionar el área antes y después de intervenirla.',
                'Usar debidamente los EPP como Casco, Guantes, Gafas, Botas de Seguridad, Overol.',
                'Aplicar las prácticas seguras de ascenso y descenso de escaleras verticales y de peldaño.',
                'Disposicion correcta de los residuos como: Recuperar, Reducir, Reutilizar y Reciclar.',
                'Se debe utilizar los diferentes colores con el fin de clasificar los residuos de acuerdo a su contenido.'
            ]
        },
        {
            id: 'quimico',
            subtitle: 'Presencia de Vapores organicos, gases acidos, gases o liquidos combustibles e inflamables. Material particulado. (Quimico)',
            items: [
                'Conocimiento de las hojas de seguridad de los productos que se manejan. Los cuales deben ser divulgados al personal.',
                'Disposición e inspección de elementos de protección respiratoria.',
                'No se debe consumir alimentos, ni beber liquidos en las areas donde se encuentran almacenados quimicos.'
            ]
        },
        {
            id: 'alturas',
            subtitle: 'Trabajo en alturas ascenso y descenso superior a 1.50 mt a nivel superior o inferior (Trabajo en Alturas)',
            items: [
                'Realizar inspeccion preoperacional al equipo para trabajo en altura y equipo de rescate. Realizar los permisos de trabajo validados por el coordinador de trabajo en alturas. Asegurar que cumpla con los requisitos establecidos en la resolucion 4272 de 2021. Verificar que las condiciones climáticas sean las apropiadas para la realización de la labor.',
                'Contar con el plan de rescate divulgado y disponible en medio físico. Realizar ejercicios de calentamiento y estiramiento antes de ascender. Verificar condiciones físicas de las personas y el sitio. Disponer de camilla, botiquin, inmovilizadores y vehiculo para transporte de lesionados.',
                'Evidenciar los certificados para trabajo en alturas, exámenes médicos de aptitud para trabajo en alturas, certificados de los equipos para trabajo en alturas. Retiro de Joyas (aretes, cadenas, reloj, anillos, pulseras, pearsing). Previamente a la iniciación de actividades operativas se debe instalar el kit de rescate.',
                'Uso de dotación de EPP: Overol, Casco con Barboquejo, Botas Dieléctricas, arnes de cuerpo entero, eslingas de posicionamiento, eslinga en Y, Mosquetones (Seguridad Trabajo en Alturas).',
                'Al llegarse a presentar un incidente deberan activar cadena de llamada, realizar el rescate en alturas, realizar los primeros auxilios y trasladar a centro asistencial de ser necesario según el plan de rescate.'
            ]
        },
        {
            id: 'electrico',
            subtitle: 'Equipos en funcionamiento, tableros electricos y/o sistemas energizados (Seguridad - Electrico)',
            items: [
                'Realizar parte documental que se requiera permiso de trabajo eléctrico y divulgación a todo el personal que realiza la actividad.',
                'Conservar distancias de seguridad cumpliendo con el RETIE. No utilizar elementos metálicos ya que son conductores de energía en areas electricas. Toda actividad electrica se debe realizar minimo dos personas. Contar con certificado CONTE.',
                'Utilizar los elementos de seguridad personal dieléctricos: traje de protección para maniobras eléctricas, guantes dieléctricos, calzado dieléctrico. Todos los elementos deben estar secos.'
            ]
        },
        {
            id: 'transito',
            subtitle: 'Desplazamiento en vehiculos o a pie (Seguridad - Transito)',
            items: [
                'Respetar las señales y normas de transito, utilizar los cinturones de seguridad y cuidar al peaton, atender las velocidades maximas de acuerdo a la legislación nacional.',
                'Caminar con precaución y sin afanes.',
                'Realizar las actividades libre del efecto de alcohol o drogas ilegales.',
                'Todo vehiculo debe realizarsele inspección preoperacional.'
            ]
        },
        {
            id: 'publicos',
            subtitle: 'Secuestro - Amenazas - Extorsión - Robo de equipos - Daño a la infraestructura (Seguridad - Publicos)',
            items: [
                'Coordinar los trabajos en horarios autorizados. Seguir las indicaciones de las autoridades en el sitio de trabajo.',
                'Utilizar siempre el overol o chaleco con el logo de la empresa y transportar en una parte visible el carnet de la empresa.',
                'Mantener la calma, verificar los lineamientos de seguridad física.'
            ]
        },
        {
            id: 'naturales',
            subtitle: 'Lluvias, tormenta eléctrica (Fenomenos Naturales)',
            items: [
                'Si las actividades son a campo abierto, se debe verificar las condiciones atmosféricas. Si hay presencia de lluvia o tormenta electrica se deben suspender las actividades. Los elementos de protección personal deben estar secos.',
                'En caso de lluvia resguardarse en el lugar cubierto mas proximo.'
            ]
        }
    ];

    var trabajadorCounter = 0;
    var toastTimer = null;

    function $(id) { return document.getElementById(id); }

    function escHtml(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    function generateFilename(data) {
        var codigo = (data.codigoSitio || 'ATS').replace(/[^a-zA-Z0-9_-]/g, '');
        var encargado = (data.nombreEncargado || 'desconocido').replace(/[^a-zA-Z0-9]/g, '_');
        var fecha = data.fecha || new Date().toISOString().slice(0, 10);
        return codigo + '_' + encargado + '_' + fecha + '.pdf';
    }

    // ===== INIT =====
    document.addEventListener('DOMContentLoaded', function () {
        initDate();
        buildPasos();
        buildControles();
        initSignaturePad('responsableFirma');
        addTrabajador();
        loadHistory();
        loadPending();
        bindEvents();
        checkDependencies();
    });

    function checkDependencies() {
        var missing = [];
        if (typeof html2canvas === 'undefined') missing.push('html2canvas');
        if (typeof window.jspdf === 'undefined' || typeof window.jspdf.jsPDF === 'undefined') missing.push('jsPDF');
        if (missing.length > 0) {
            console.warn('Librerías no cargadas:', missing.join(', '));
            showToast('Cargando librerías necesarias...', 'info');
            // Retry check after 3s in case fallback scripts are loading
            setTimeout(function () {
                var stillMissing = [];
                if (typeof html2canvas === 'undefined') stillMissing.push('html2canvas');
                if (typeof window.jspdf === 'undefined' || typeof window.jspdf.jsPDF === 'undefined') stillMissing.push('jsPDF');
                if (stillMissing.length > 0) {
                    showToast('Error: ' + stillMissing.join(', ') + ' no se cargaron. Verifica conexión.', 'error');
                } else {
                    showToast('Librerías cargadas correctamente ✓', 'success');
                }
            }, 3000);
        }
    }

    // ===== DATE =====
    function initDate() {
        var d = new Date();
        var dateStr = d.getFullYear() + '-' +
            String(d.getMonth() + 1).padStart(2, '0') + '-' +
            String(d.getDate()).padStart(2, '0');
        $('fecha').value = dateStr;
    }

    // ===== BUILD PASOS =====
    function buildPasos() {
        var container = $('pasosContainer');
        if (!container) return;
        var h = '';
        PASOS.forEach(function (paso, i) {
            h += '<div class="paso-item">';
            h += '<span class="paso-num">' + (i + 1) + '.</span>';
            h += '<span class="paso-text">' + escHtml(paso) + '</span>';
            h += '<div class="paso-options radio-group">';
            h += '<label class="radio-label"><input type="radio" name="paso_' + i + '" value="SI" checked> SI</label>';
            h += '<label class="radio-label"><input type="radio" name="paso_' + i + '" value="N/A"> N/A</label>';
            h += '</div></div>';
        });
        container.innerHTML = h;
    }

    // ===== BUILD CONTROLES =====
    function buildControles() {
        var container = $('controlesContainer');
        if (!container) return;
        var h = '';
        SUBTITLES.forEach(function (sub) {
            h += '<h3 class="control-subtitle">' + escHtml(sub.subtitle) + '</h3>';
            sub.items.forEach(function (item, i) {
                h += '<div class="check-item check-item-long">';
                h += '<label>' + escHtml(item) + '</label>';
                h += '<div class="radio-group">';
                h += '<label class="radio-label"><input type="radio" name="ctrl_' + sub.id + '_' + i + '" value="SI" checked> SI</label>';
                h += '<label class="radio-label"><input type="radio" name="ctrl_' + sub.id + '_' + i + '" value="NO"> NO</label>';
                h += '</div></div>';
            });
        });
        container.innerHTML = h;
    }

    // ===== SIGNATURE PAD (EPCC STYLE) =====
    function initSignaturePad(canvasId) {
        var canvas = document.getElementById(canvasId);
        if (!canvas) return;
        var ctx = canvas.getContext('2d');
        var drawing = false;

        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        function resizeCanvas() {
            var w = canvas.parentElement.clientWidth;
            if (w < 100) w = 100;
            canvas.width = w;
            canvas.height = 120;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
    
        canvas.addEventListener('mousedown', function (e) {
            drawing = true;
            ctx.beginPath();
            ctx.moveTo(e.offsetX, e.offsetY);
        });

        canvas.addEventListener('mousemove', function (e) {
            if (!drawing) return;
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
        });

        canvas.addEventListener('mouseup', function () { drawing = false; });
        canvas.addEventListener('mouseleave', function () { drawing = false; });

        canvas.addEventListener('touchstart', function (e) {
            if (e.touches.length !== 1) return;
            drawing = true;
            var t = e.touches[0];
            var r = canvas.getBoundingClientRect();
            ctx.beginPath();
            ctx.moveTo(t.clientX - r.left, t.clientY - r.top);
            e.preventDefault();
        }, { passive: false });

        canvas.addEventListener('touchmove', function (e) {
            if (!drawing || e.touches.length !== 1) return;
            var t = e.touches[0];
            var r = canvas.getBoundingClientRect();
            ctx.lineTo(t.clientX - r.left, t.clientY - r.top);
            ctx.stroke();
            e.preventDefault();
        }, { passive: false });

        canvas.addEventListener('touchend', function () { drawing = false; });
    }

    function getFirmaDataURL(canvasId) {
        var canvas = document.getElementById(canvasId);
        if (!canvas) return '';
        if (isCanvasBlank(canvasId)) return '';
        return canvas.toDataURL('image/png');
    }

    function isCanvasBlank(canvasId) {
        var canvas = document.getElementById(canvasId);
        if (!canvas) return true;
        var ctx = canvas.getContext('2d', { willReadFrequently: true });
        var pixelData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        for (var i = 3; i < pixelData.length; i += 4) {
            if (pixelData[i] !== 0) return false;
        }
        return true;
    }

    // ===== WORKERS =====
    function addTrabajador(data) {
        var container = $('trabajadoresContainer');
        if (!container) return;
        var idx = trabajadorCounter++;
        var canvasId = 'trabajadorFirma_' + idx;
        var blockId = 'trabajadorBlock_' + idx;

        var div = document.createElement('div');
        div.className = 'trabajador-block';
        div.id = blockId;

        var html = '';
        html += '<div class="form-row">';
        html += '<div class="form-group"><label>Nombre</label><input type="text" class="trabajador-nombre" placeholder="Nombre completo" value="' + escHtml(data ? data.nombre : '') + '"></div>';
        html += '<div class="form-group"><label>Cédula</label><input type="text" class="trabajador-cedula" placeholder="Ej: 8-123-4567" value="' + escHtml(data ? data.cedula : '') + '"></div>';
        html += '</div>';
        html += '<div class="firma-canvas-wrapper">';
        html += '<label>Firma</label>';
        html += '<canvas class="firma-canvas" id="' + canvasId + '"></canvas>';
        html += '<button type="button" class="btn-small btn-clear-firma" data-canvas="' + canvasId + '">Limpiar</button>';
        html += '</div>';
        if (idx > 0) {
            html += '<button type="button" class="btn-remove" data-block="' + blockId + '">✕</button>';
        }
        div.innerHTML = html;
        container.appendChild(div);

        initSignaturePad(canvasId);

        // Bind remove button
        var removeBtn = div.querySelector('.btn-remove');
        if (removeBtn) {
            removeBtn.addEventListener('click', function () {
                var blk = document.getElementById(this.dataset.block);
                if (blk) blk.remove();
            });
        }

        // Bind clear signature
        var clearBtn = div.querySelector('.btn-clear-firma');
        if (clearBtn) {
            clearBtn.addEventListener('click', function () {
                var c = document.getElementById(this.dataset.canvas);
                if (c) c.getContext('2d').clearRect(0, 0, c.width, c.height);
            });
        }
    }

    // ===== GATHER DATA =====
    function gatherData() {
        var data = {};

        data.codigoSitio = $('codigoSitio').value.trim();
        data.nombreEncargado = $('nombreEncargado').value.trim();
        data.fecha = $('fecha').value;
        data.ciudad = $('ciudad').value.trim();
        data.sitio = $('sitio').value.trim();
        data.descripcion = $('descripcion').value.trim();
        data.equipos = $('equipos').value.trim();

        data.extintor = document.querySelector('input[name="extintor"]:checked');
        data.extintor = data.extintor ? data.extintor.value : 'SI';
        data.camilla = document.querySelector('input[name="camilla"]:checked');
        data.camilla = data.camilla ? data.camilla.value : 'SI';

        data.pasos = [];
        PASOS.forEach(function (_, i) {
            var sel = document.querySelector('input[name="paso_' + i + '"]:checked');
            data.pasos.push({ id: i, respuesta: sel ? sel.value : 'SI' });
        });

        data.controles = [];
        SUBTITLES.forEach(function (sub) {
            sub.items.forEach(function (item, i) {
                var sel = document.querySelector('input[name="ctrl_' + sub.id + '_' + i + '"]:checked');
                data.controles.push({
                    subtitle: sub.subtitle,
                    item: item,
                    respuesta: sel ? sel.value : 'SI'
                });
            });
        });

        data.responsableNombre = $('responsableNombre').value.trim();
        data.responsableCedula = $('responsableCedula').value.trim();
        data.responsableFirma = getFirmaDataURL('responsableFirma');

        data.condiciones = [];
        document.querySelectorAll('input[name="condicion"]:checked').forEach(function (cb) {
            data.condiciones.push(cb.value);
        });
        var otraVal = $('otraCondicion') ? $('otraCondicion').value.trim() : '';
        if (otraVal) data.condiciones.push('OTRA: ' + otraVal);

        data.trabajadores = [];
        document.querySelectorAll('.trabajador-block').forEach(function (block) {
            var canvas = block.querySelector('.firma-canvas');
            var nombre = block.querySelector('.trabajador-nombre');
            var cedula = block.querySelector('.trabajador-cedula');
            data.trabajadores.push({
                nombre: nombre ? nombre.value.trim() : '',
                cedula: cedula ? cedula.value.trim() : '',
                firma: canvas ? getFirmaDataURL(canvas.id) : ''
            });
        });

        data.revisadoPor = $('revisadoPor').value;
        data.aprobadoPor = $('aprobadoPor').value;

        return data;
    }

    // ===== VALIDATE =====
    function validate(data) {
        var missing = [];
        if (!data.codigoSitio) missing.push('Código del Sitio');
        if (!data.nombreEncargado) missing.push('Nombre del Encargado');
        if (!data.sitio) missing.push('Sitio / Estación');

        if (data.trabajadores.length === 0) missing.push('Personal Participante');

        var hasFirma = data.trabajadores.some(function (w) {
            return !!w.firma;
        });
        if (!hasFirma) missing.push('Firma del personal participante');

        if (missing.length > 0) {
            showToast('Campos obligatorios: ' + missing.join(', '), 'error');
            return false;
        }
        return true;
    }

    // ===== BUILD REPORT HTML =====
    function buildReportHTML(data) {
        var h = '';
        var logoDataURL = getLogoDataURL();

        // Header
        h += '<div class="report-page">';
        h += '<div class="report-header">';
        if (logoDataURL) {
            h += '<img src="' + logoDataURL + '" alt="SITOC">';
        } else {
            h += '<img src="logo-sitoc.png" alt="SITOC" crossorigin="anonymous">';
        }
        h += '<h1>Análisis de Trabajo Seguro (ATS)</h1>';
        h += '<p class="report-form-code">FR-SST-002 | Versión: 002</p>';
        h += '</div>';

        // 1. Información General
        h += '<div class="report-section">';
        h += '<h2>1. Información General</h2>';
        h += '<div class="report-info-item"><strong>Código del Sitio:</strong> ' + escHtml(data.codigoSitio) + '</div>';
        h += '<div class="report-info-item"><strong>Encargado:</strong> ' + escHtml(data.nombreEncargado) + '</div>';
        h += '<div class="report-info-row">';
        h += '<div class="report-info-item"><strong>Fecha:</strong> ' + escHtml(data.fecha) + '</div>';
        h += '<div class="report-info-item"><strong>Ciudad:</strong> ' + escHtml(data.ciudad) + '</div>';
        h += '</div>';
        h += '<div class="report-info-item"><strong>Sitio/Estación:</strong> ' + escHtml(data.sitio) + '</div>';
        if (data.descripcion) h += '<div class="report-info-item"><strong>Descripción:</strong> ' + escHtml(data.descripcion) + '</div>';
        if (data.equipos) h += '<div class="report-info-item"><strong>Equipos y Herramientas:</strong> ' + escHtml(data.equipos) + '</div>';
        h += '</div>';

        // 2. Verificación de Seguridad
        h += '<div class="report-section">';
        h += '<h2>2. Verificación de Seguridad</h2>';
        h += '<div class="report-info-row">';
        h += '<div class="report-info-item"><strong>Extintor:</strong> ' + data.extintor + '</div>';
        h += '<div class="report-info-item"><strong>Camilla:</strong> ' + data.camilla + '</div>';
        h += '</div>';
        h += '</div>';

        // 3. Pasos de la Tarea
        h += '<div class="report-section">';
        h += '<h2>3. Pasos de la Tarea</h2>';
        h += '<table class="report-table">';
        h += '<thead><tr><th>#</th><th>Paso</th><th>Respuesta</th></tr></thead>';
        h += '<tbody>';
        data.pasos.forEach(function (p) {
            h += '<tr><td>' + (p.id + 1) + '</td><td>' + escHtml(PASOS[p.id]) + '</td><td>' + p.respuesta + '</td></tr>';
        });
        h += '</tbody></table>';
        h += '</div>';

        // 4. Controles Propuestos
        h += '<div class="report-section">';
        h += '<h2>4. Controles Propuestos</h2>';
        var currentSub = '';
        data.controles.forEach(function (c) {
            if (c.subtitle !== currentSub) {
                currentSub = c.subtitle;
                h += '<div class="report-section-label">' + escHtml(currentSub) + '</div>';
            }
            h += '<div class="report-info-item" style="padding-left:12pt;margin-bottom:4pt;font-size:8.5pt"><span style="color:#555">[' + c.respuesta + ']</span> ' + escHtml(c.item) + '</div>';
        });
        h += '</div>';

        // Firma Responsable
        h += '<div class="report-section">';
        h += '<h2>Firma del Responsable</h2>';
        h += '<div class="report-firma-box">';
        h += '<p><strong>Nombre:</strong> ' + escHtml(data.responsableNombre) + '</p>';
        h += '<p><strong>Cédula:</strong> ' + escHtml(data.responsableCedula) + '</p>';
        if (data.responsableFirma && data.responsableFirma.length > 100) {
            h += '<img src="' + data.responsableFirma + '" class="report-signature-img" alt="Firma">';
        } else {
            h += '<p style="color:#999;font-style:italic">Sin firma</p>';
        }
        h += '</div>';
        h += '</div>';

        // 5. Condiciones Inseguras
        h += '<div class="report-section">';
        h += '<h2>5. Condiciones Inseguras</h2>';
        if (data.condiciones.length > 0) {
            h += '<ul style="margin:4pt 0;padding-left:16pt">';
            data.condiciones.forEach(function (c) {
                h += '<li>' + escHtml(formatCondicion(c)) + '</li>';
            });
            h += '</ul>';
        } else {
            h += '<p style="color:#999;font-style:italic">Ninguna condición insegura reportada</p>';
        }
        h += '</div>';

        // 6. Personal Participante
        h += '<div class="report-section">';
        h += '<h2>6. Personal Participante</h2>';
        h += '<p style="font-size:9pt;color:#666;margin-bottom:6pt">Declaro haber leído y comprendido los peligros, los riesgos y las medidas de control para garantizar un trabajo seguro.</p>';
        data.trabajadores.forEach(function (w, i) {
            h += '<div class="report-worker-entry">';
            h += '<p><strong>' + (i + 1) + '.</strong> ' + escHtml(w.nombre) + ' — Cédula: ' + escHtml(w.cedula) + '</p>';
            if (w.firma && w.firma.length > 100) {
                h += '<img src="' + w.firma + '" class="report-signature-img" alt="Firma">';
            } else {
                h += '<p style="color:#999;font-style:italic;font-size:8pt">Sin firma</p>';
            }
            h += '</div>';
        });
        h += '</div>';

        // 7. Revisión y Aprobación
        h += '<div class="report-section">';
        h += '<h2>7. Revisión y Aprobación</h2>';
        h += '<div class="report-info-row">';
        h += '<div class="report-info-item"><strong>Revisado por:</strong> ' + escHtml(data.revisadoPor) + '</div>';
        h += '<div class="report-info-item"><strong>Aprobado por:</strong> ' + escHtml(data.aprobadoPor) + '</div>';
        h += '</div>';
        h += '</div>';

        h += '</div>';
        return h;
    }

    function formatCondicion(val) {
        var map = {
            'NINGUNA': 'Ninguna',
            'ESTRUCTURAS': 'Estructuras inestables o en mal estado',
            'FENOMENO': 'Fenómeno natural',
            'SALUD': 'Mal estado de salud de algún trabajador',
            'ORDEN_PUBLICO': 'Situación de orden público'
        };
        return map[val] || val;
    }

    function getLogoDataURL() {
        var canvas = document.createElement('canvas');
        var img = new Image();
        img.crossOrigin = 'anonymous';
        // Try to get from existing logo in page
        var logoEl = document.querySelector('.logo');
        if (logoEl && logoEl.complete && logoEl.naturalWidth > 0) {
            canvas.width = logoEl.naturalWidth;
            canvas.height = logoEl.naturalHeight;
            canvas.getContext('2d').drawImage(logoEl, 0, 0);
            return canvas.toDataURL('image/png');
        }
        return null;
    }

    // ===== PREVIEW =====
    function showPreview(html) {
        $('reportContent').innerHTML = html;
        $('formContainer').style.display = 'none';
        $('screen-preview').style.display = 'flex';
        window.scrollTo(0, 0);
    }

    function showForm() {
        $('formContainer').style.display = 'block';
        $('screen-preview').style.display = 'none';
    }

    // ===== CAPTURE, DOWNLOAD & SEND =====
    function captureAndSend(data) {
        if (typeof html2canvas === 'undefined') {
            showToast('Error: html2canvas no cargó. Verifica conexión a Internet.', 'error');
            return;
        }
        if (typeof window.jspdf === 'undefined' || typeof window.jspdf.jsPDF === 'undefined') {
            showToast('Error: jsPDF no cargó. Verifica conexión a Internet.', 'error');
            return;
        }

        showToast('Generando PDF...', 'info');

        var el = $('reportContent').querySelector('.report-page') || $('reportContent');

        html2canvas(el, { scale: 1, useCORS: true, logging: false, allowTaint: true })
            .then(function (canvas) {
                var imgData = canvas.toDataURL('image/png');
                var { jsPDF } = window.jspdf;
                if (!jsPDF) {
                    showToast('Error: jsPDF no está disponible', 'error');
                    return;
                }
                var pdf = new jsPDF('p', 'pt', 'a4');
                var pageWidth = pdf.internal.pageSize.getWidth();
                var pageHeight = pdf.internal.pageSize.getHeight();
                var imgWidth = pageWidth;
                var imgHeight = (canvas.height * imgWidth) / canvas.width;

                var heightLeft = imgHeight;
                var position = 0;

                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;

                while (heightLeft > 0) {
                    position -= pageHeight;
                    pdf.addPage();
                    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                    heightLeft -= pageHeight;
                }

                var blob = pdf.output('blob');
                var filename = generateFilename(data);

                console.log('PDF generado:', filename, 'tamaño:', blob.size, 'bytes');

                // Send to Telegram first (before download, to avoid mobile interruption)
                showToast('Enviando a Telegram...', 'info');
                sendBlobToTelegram(blob, filename, data);

                // Download locally — slight delay so fetch is already in flight
                setTimeout(function () {
                    downloadBlob(blob, filename);
                    showToast('PDF descargado ✓', 'success');
                }, 200);
            })
            .catch(function (err) {
                console.error('html2canvas error:', err);
                showToast('Error al generar el PDF: ' + err.message, 'error');
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
        setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
    }

    function sendBlobToTelegram(blob, filename, data) {
        var fd = new FormData();
        fd.append('chat_id', CONFIG.TELEGRAM_CHAT_ID);
        fd.append('document', blob, filename);

        var url = 'https://api.telegram.org/bot' + CONFIG.TELEGRAM_TOKEN + '/sendDocument';
        console.log('Enviando PDF a Telegram:', filename, 'tamaño:', blob.size, 'bytes');

        fetch(url, { method: 'POST', body: fd })
            .then(function (r) {
                return r.json().then(function (resp) {
                    if (r.ok && resp.ok) {
                        showToast('PDF enviado a Telegram ✓', 'success');
                    } else {
                        console.error('Telegram API error:', JSON.stringify(resp));
                        showToast('Error Telegram: ' + (resp.description || 'Error ' + r.status), 'error');
                        savePending(data);
                    }
                });
            })
            .catch(function (err) {
                console.error('Telegram fetch error:', err);
                showToast('Sin conexión. Se guardó para reintentar.', 'warning');
                savePending(data);
            });
    }

    function sendSingleBlob(blob, filename) {
        return new Promise(function (resolve, reject) {
            var fd = new FormData();
            fd.append('chat_id', CONFIG.TELEGRAM_CHAT_ID);
            fd.append('document', blob, filename);
            var url = 'https://api.telegram.org/bot' + CONFIG.TELEGRAM_TOKEN + '/sendDocument';
            fetch(url, { method: 'POST', body: fd })
                .then(function (r) { return r.json(); })
                .then(function (resp) {
                    if (resp.ok) resolve();
                    else reject(new Error(resp.description || 'Error al enviar'));
                })
                .catch(reject);
        });
    }

    // ===== PENDING QUEUE =====
    function savePending(data) {
        var pending = JSON.parse(localStorage.getItem(CONFIG.PENDING_KEY) || '[]');
        pending.push({
            data: data,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem(CONFIG.PENDING_KEY, JSON.stringify(pending));
        loadPending();
    }

    function loadPending() {
        var pending = JSON.parse(localStorage.getItem(CONFIG.PENDING_KEY) || '[]');
        var bar = $('pendingBar');
        var count = $('pendingCount');
        var list = $('pendingList');
        if (pending.length === 0) {
            bar.classList.add('hidden');
            list.classList.add('hidden');
            return;
        }
        bar.classList.remove('hidden');
        count.textContent = pending.length + ' envío' + (pending.length > 1 ? 's' : '') + ' pendiente' + (pending.length > 1 ? 's' : '');
    }

    function retryPending() {
        var pending = JSON.parse(localStorage.getItem(CONFIG.PENDING_KEY) || '[]');
        if (pending.length === 0) {
            showToast('No hay envíos pendientes', 'info');
            return;
        }
        var btn = $('btnRetryPending');
        btn.disabled = true;
        btn.textContent = '⌛ Reintentando...';

        var remaining = pending.slice();
        var results = { success: 0, failed: 0 };

        function processNext() {
            if (remaining.length === 0) {
                btn.disabled = false;
                btn.textContent = 'Reintentar ahora';
                if (results.failed === 0) {
                    localStorage.removeItem(CONFIG.PENDING_KEY);
                    showToast('Todos los envíos pendientes fueron enviados ✓', 'success');
                } else {
                    var kept = [];
                    var current = JSON.parse(localStorage.getItem(CONFIG.PENDING_KEY) || '[]');
                    current.forEach(function (item) {
                        if (!item._retrying) kept.push(item);
                    });
                    localStorage.setItem(CONFIG.PENDING_KEY, JSON.stringify(kept));
                    showToast(results.success + ' enviados, ' + results.failed + ' fallaron', 'warning');
                }
                loadPending();
                return;
            }

            var item = remaining.shift();
            item._retrying = true;
            var data = item.data;

            var tempDiv = document.createElement('div');
            tempDiv.innerHTML = buildReportHTML(data);
            tempDiv.style.cssText = 'position:fixed;top:0;left:0;width:800px;height:auto;opacity:0.01;pointer-events:none;z-index:-1;background:white;';
            document.body.appendChild(tempDiv);

            var captureEl = tempDiv.querySelector('.report-page') || tempDiv.firstChild;

            html2canvas(captureEl, { scale: 1, useCORS: true, logging: false, allowTaint: true })
                .then(function (canvas) {
                    var imgData = canvas.toDataURL('image/png');
                    var { jsPDF } = window.jspdf;
                    var pdf = new jsPDF('p', 'pt', 'a4');
                    var pageWidth = pdf.internal.pageSize.getWidth();
                    var pageHeight = pdf.internal.pageSize.getHeight();
                    var imgWidth = pageWidth;
                    var imgHeight = (canvas.height * imgWidth) / canvas.width;
                    var heightLeft = imgHeight;
                    var position = 0;

                    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                    heightLeft -= pageHeight;
                    while (heightLeft > 0) {
                        position -= pageHeight;
                        pdf.addPage();
                        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                        heightLeft -= pageHeight;
                    }

                    var blob = pdf.output('blob');
                    var filename = generateFilename(data);
                    return sendSingleBlob(blob, filename);
                })
                .then(function () {
                    results.success++;
                    // Remove from localStorage
                    var current = JSON.parse(localStorage.getItem(CONFIG.PENDING_KEY) || '[]');
                    var idx = current.indexOf(item);
                    if (idx >= 0) current.splice(idx, 1);
                    localStorage.setItem(CONFIG.PENDING_KEY, JSON.stringify(current));
                })
                .catch(function (err) {
                    console.error('Retry failed:', err);
                    results.failed++;
                })
                .finally(function () {
                    document.body.removeChild(tempDiv);
                    processNext();
                });
        }

        processNext();
    }

    function deletePending(index) {
        var pending = JSON.parse(localStorage.getItem(CONFIG.PENDING_KEY) || '[]');
        if (index < 0 || index >= pending.length) return;
        pending.splice(index, 1);
        if (pending.length === 0) {
            localStorage.removeItem(CONFIG.PENDING_KEY);
        } else {
            localStorage.setItem(CONFIG.PENDING_KEY, JSON.stringify(pending));
        }
        loadPending();
        // Refresh list if visible
        var list = $('pendingList');
        if (!list.classList.contains('hidden')) {
            viewPending();
        }
        showToast('Envío eliminado', 'info');
    }

    function viewPending() {
        var list = $('pendingList');
        var pending = JSON.parse(localStorage.getItem(CONFIG.PENDING_KEY) || '[]');
        if (list.classList.contains('hidden')) {
            var h = '';
            pending.forEach(function (item, i) {
                var d = item.data || {};
                h += '<div class="pending-item">';
                h += '<span>' + (i + 1) + '. ' + escHtml(d.codigoSitio || '—') + ' | ' +
                    escHtml(d.nombreEncargado || '—') + ' | ' +
                    (d.fecha || '—') + '</span>';
                h += '<button class="btn-delete-pending" onclick="window._deletePending(' + i + ')" title="Eliminar">✕</button>';
                h += '</div>';
            });
            list.innerHTML = h;
            list.classList.remove('hidden');
        } else {
            list.classList.add('hidden');
        }
    }

    // Expose deletePending globally for onclick
    window._deletePending = function (i) { deletePending(i); };

    // ===== HISTORY =====
    function saveToHistory(data) {
        var history = JSON.parse(localStorage.getItem(CONFIG.HISTORY_KEY) || '[]');
        history.push({
            data: {
                codigoSitio: data.codigoSitio,
                nombreEncargado: data.nombreEncargado,
                fecha: data.fecha,
                sitio: data.sitio,
                ciudad: data.ciudad
            },
            timestamp: new Date().toISOString()
        });
        localStorage.setItem(CONFIG.HISTORY_KEY, JSON.stringify(history));
        loadHistory();
    }

    function loadHistory() {
        var history = JSON.parse(localStorage.getItem(CONFIG.HISTORY_KEY) || '[]');
        $('historyCount').textContent = history.length + ' ATS registrado' + (history.length !== 1 ? 's' : '');
    }

    function downloadHistory() {
        var history = JSON.parse(localStorage.getItem(CONFIG.HISTORY_KEY) || '[]');
        if (history.length === 0) {
            showToast('No hay historial para descargar', 'info');
            return;
        }
        var lines = ['=== HISTORIAL DE ATS ===', 'Total: ' + history.length, ''];
        history.forEach(function (item, i) {
            var d = item.data || {};
            lines.push((i + 1) + '. ' + (d.codigoSitio || '—') + ' - ' + (d.nombreEncargado || '—') + ' - ' + (d.fecha || '—'));
            lines.push('   Sitio: ' + (d.sitio || '—') + ' | Ciudad: ' + (d.ciudad || '—'));
            lines.push('   Creado: ' + item.timestamp);
            lines.push('');
        });
        var blob = new Blob([lines.join('\r\n')], { type: 'text/plain;charset=utf-8' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'historial_ats_' + new Date().toISOString().slice(0, 10) + '.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showToast('Historial descargado ✓', 'success');
    }

    function clearHistory() {
        if (!confirm('¿Está seguro de limpiar todo el historial?')) return;
        localStorage.removeItem(CONFIG.HISTORY_KEY);
        loadHistory();
        showToast('Historial limpiado', 'info');
    }

    // ===== TOAST =====
    function showToast(msg, type) {
        var toast = $('toast');
        if (!toast) return;
        if (toastTimer) clearTimeout(toastTimer);
        toast.textContent = msg;
        toast.className = 'toast ' + (type || 'info');
        toast.classList.remove('hidden');
        toastTimer = setTimeout(function () {
            toast.classList.add('hidden');
        }, 4000);
    }

    // ===== BIND EVENTS =====
    function bindEvents() {
        // Form submit — unified flow: preview + download + Telegram
        $('atsForm').addEventListener('submit', function (e) {
            e.preventDefault();
            var data = gatherData();
            if (!validate(data)) return;
            saveToHistory(data);
            var html = buildReportHTML(data);
            showPreview(html);
            captureAndSend(data);
        });

        // Back to form
        $('btnBackForm').addEventListener('click', showForm);

        // Agregar trabajador
        $('btnAgregarTrabajador').addEventListener('click', function () {
            addTrabajador();
        });

        // Main clear firma buttons
        document.querySelectorAll('.btn-clear-firma[data-canvas]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var canvas = document.getElementById(this.dataset.canvas);
                if (canvas) canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
            });
        });

        // History
        $('btnDownloadHistory').addEventListener('click', downloadHistory);
        $('btnClearHistory').addEventListener('click', clearHistory);

        // Pending
        $('btnRetryPending').addEventListener('click', retryPending);
        $('btnViewPending').addEventListener('click', viewPending);

        // Auto-retry pending when back online
        window.addEventListener('online', function () {
            var pending = JSON.parse(localStorage.getItem(CONFIG.PENDING_KEY) || '[]');
            if (pending.length > 0) {
                showToast('Conexión restablecida. Reintentando envíos pendientes...', 'info');
                retryPending();
            }
        });
    }

    // Expose test helper to console
    window.testTelegram = function () {
        console.log('=== Test Telegram ===');
        var botUrl = 'https://api.telegram.org/bot' + CONFIG.TELEGRAM_TOKEN;
        fetch(botUrl + '/getMe')
            .then(function (r) { return r.json(); })
            .then(function (resp) {
                console.log('Bot:', JSON.stringify(resp));
                if (!resp.ok) { alert('Bot error: ' + resp.description); return; }
                var botName = resp.result.username;
                alert('Bot OK: @' + botName + '\n\n1. Abrí Telegram\n2. Agregá @' + botName + ' al grupo\n3. Enviá un mensaje en el grupo\n4. Hacé clic en OK aquí');
                return fetch(botUrl + '/getUpdates')
                    .then(function (r) { return r.json(); });
            })
            .then(function (resp) {
                if (!resp) return;
                console.log('Updates:', JSON.stringify(resp));
                var chats = {};
                (resp.result || []).forEach(function (u) {
                    var chat = u.message && u.message.chat;
                    if (chat) chats[chat.id] = chat.title || chat.first_name || chat.id;
                });
                var keys = Object.keys(chats);
                if (keys.length === 0) {
                    alert('No se encontraron chats. Enviá un mensaje en el grupo y volvé a intentar.');
                    return;
                }
                var msg = 'Chats encontrados:\n';
                keys.forEach(function (id) { msg += id + ' → ' + chats[id] + '\n'; });
                msg += '\nEl ID correcto es el del grupo (negativo, ej: -5123456789)';
                alert(msg);
                console.log('Chats detectados:', chats);
            })
            .catch(function (err) {
                console.error('Error:', err);
                alert('Error de red: ' + err.message);
            });
    };

})();
