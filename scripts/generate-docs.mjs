import { mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const outputDir = resolve(process.cwd(), 'public/docs')
mkdirSync(outputDir, { recursive: true })

const PAGE_WIDTH = 612
const PAGE_HEIGHT = 792
const MARGIN = 72

function escapePdfText(value) {
  return value
    .replaceAll('\\', '\\\\')
    .replaceAll('(', '\\(')
    .replaceAll(')', '\\)')
}

function wrapText(text, maxChars) {
  const words = text.split(/\s+/)
  const lines = []
  let current = ''

  for (const word of words) {
    const next = current ? `${current} ${word}` : word
    if (next.length > maxChars && current) {
      lines.push(current)
      current = word
    } else {
      current = next
    }
  }

  if (current) lines.push(current)
  return lines
}

function circlePath(cx, cy, radius) {
  const k = 0.5522847498 * radius
  return [
    `${cx + radius} ${cy} m`,
    `${cx + radius} ${cy + k} ${cx + k} ${cy + radius} ${cx} ${cy + radius} c`,
    `${cx - k} ${cy + radius} ${cx - radius} ${cy + k} ${cx - radius} ${cy} c`,
    `${cx - radius} ${cy - k} ${cx - k} ${cy - radius} ${cx} ${cy - radius} c`,
    `${cx + k} ${cy - radius} ${cx + radius} ${cy - k} ${cx + radius} ${cy} c`,
    'S',
  ].join('\n')
}

function textLines(font, size, color, x, y, leading, lines) {
  const ops = []
  lines.forEach((line, index) => {
    ops.push(
      'BT',
      `/${font} ${size} Tf`,
      color,
      `${x} ${y - index * leading} Td`,
      `(${escapePdfText(line)}) Tj`,
      'ET',
    )
  })
  return ops
}

function buildContent(page, pageNumber, totalPages, theme) {
  const ops = []

  if (theme === 'book') {
    ops.push('q', '0.984 0.969 0.925 rg', `0 0 ${PAGE_WIDTH} ${PAGE_HEIGHT} re f`, 'Q')
    ops.push('q', '0.851 0.643 0.255 rg', `${MARGIN} 716 54 4 re f`, 'Q')
    ops.push(...textLines('F2', 10, '0.118 0.302 0.169 rg', MARGIN, 726, 14, ['PAPÁ GANJAH · COLECTIVO CIUDADANO']))
    ops.push(...textLines('F1', 9, '0.42 0.45 0.42 rg', PAGE_WIDTH - MARGIN - 58, 726, 14, [`Vista previa ${pageNumber}/${totalPages}`]))
    ops.push('q', '0.85 0.87 0.83 RG', '0.7 w', `${MARGIN} 704 m`, `${PAGE_WIDTH - MARGIN} 704 l S`, 'Q')
  } else {
    ops.push('q', '0.976 0.965 0.941 rg', `0 0 ${PAGE_WIDTH} ${PAGE_HEIGHT} re f`, 'Q')
    ops.push('q', '0.118 0.302 0.169 rg', `0 736 ${PAGE_WIDTH} 56 re f`, 'Q')
    ops.push('q', '0.851 0.643 0.255 rg', `0 730 ${PAGE_WIDTH} 6 re f`, 'Q')
    ops.push(...textLines('F2', 16, '1 0.969 0.925 rg', MARGIN, 762, 18, ['PAPÁ GANJAH']))
    ops.push(...textLines('F1', 9, '0.78 0.88 0.78 rg', MARGIN, 748, 12, ['COLECTIVO CIUDADANO · TRANSPARENCIA INSTITUCIONAL']))
    ops.push(...textLines('F1', 9, '1 0.969 0.925 rg', PAGE_WIDTH - MARGIN - 52, 748, 12, [`Página ${pageNumber} de ${totalPages}`]))
  }

  let y = 666

  if (page.kicker) {
    ops.push(...textLines('F2', 10, '0.18 0.45 0.2 rg', MARGIN, y, 14, [page.kicker.toUpperCase()]))
    y -= 30
  }

  const headingSize = theme === 'book' ? 23 : 23
  const headingLeading = 28
  const headingLines = wrapText(page.heading, theme === 'book' ? 42 : 52)
  const headingColor = theme === 'book' ? '0.078 0.243 0.169 rg' : '0.059 0.18 0.102 rg'
  ops.push(...textLines('F2', headingSize, headingColor, MARGIN, y, headingLeading, headingLines))
  y -= headingLines.length * headingLeading + 18

  ops.push('q', '0.851 0.643 0.255 rg', `${MARGIN} ${y} 60 3 re f`, 'Q')
  y -= 30

  for (const paragraph of page.body) {
    if (!paragraph) {
      y -= 20
      continue
    }
    const lines = wrapText(paragraph, theme === 'book' ? 78 : 84)
    ops.push(...textLines('F1', 11, '0.18 0.2 0.22 rg', MARGIN, y, 17, lines))
    y -= lines.length * 17 + 14
  }

  if (page.bullets) {
    for (const bullet of page.bullets) {
      const lines = wrapText(bullet, theme === 'book' ? 72 : 78)
      ops.push('q', '0.18 0.45 0.2 rg', `${MARGIN} ${y + 3} 5 5 re f`, 'Q')
      ops.push(...textLines('F1', 11, '0.18 0.2 0.22 rg', MARGIN + 16, y, 17, lines))
      y -= lines.length * 17 + 8
    }
    y -= 8
  }

  if (page.highlight) {
    ops.push('q', '0.91 0.945 0.91 rg', `${MARGIN} ${y - 54} ${PAGE_WIDTH - MARGIN * 2} 62 re f`, 'Q')
    const lines = wrapText(page.highlight, 74)
    ops.push(...textLines('F2', 12, '0.118 0.302 0.169 rg', MARGIN + 16, y - 22, 16, lines))
    y -= 78
  }

  if (page.signature) {
    const signatureY = Math.max(y - 36, 150)
    ops.push('q', '0.72 0.75 0.7 RG', '0.7 w', `${MARGIN} ${signatureY + 20} m`, `${MARGIN + 210} ${signatureY + 20} l S`, 'Q')
    ops.push(...textLines('F2', 10, '0.12 0.25 0.16 rg', MARGIN, signatureY, 14, [page.signature]))
    if (page.signatureDetail) {
      ops.push(...textLines('F1', 9, '0.38 0.42 0.38 rg', MARGIN, signatureY - 14, 12, [page.signatureDetail]))
    }

    const sealX = PAGE_WIDTH - MARGIN - 60
    const sealY = signatureY + 26
    ops.push('q', '0.118 0.302 0.169 RG', '2 w', circlePath(sealX, sealY, 48), 'Q')
    ops.push('q', '0.118 0.302 0.169 RG', '0.8 w', circlePath(sealX, sealY, 41), 'Q')
    ops.push(...textLines('F2', 7, '0.118 0.302 0.169 rg', sealX - 28, sealY + 4, 9, ['SELLO OFICIAL']))
    ops.push(...textLines('F1', 6, '0.118 0.302 0.169 rg', sealX - 31, sealY - 8, 8, ['PAPÁ GANJAH A.C.']))
    ops.push(...textLines('F1', 6, '0.118 0.302 0.169 rg', sealX - 24, sealY - 18, 8, ['CONFIRMADO']))
    y = signatureY
  }

  ops.push(...textLines('F1', 8, '0.52 0.55 0.52 rg', MARGIN, 42, 10, ['Documento informativo · papaganjah.org · contacto@papaganjah.org']))

  return ops.join('\n')
}

function buildPdf(meta, pages, theme = 'official') {
  const pageObjectNumbers = pages.map((_, index) => 5 + index * 2)
  const objects = []

  objects[1] = '<< /Type /Catalog /Pages 2 0 R >>'
  objects[2] = `<< /Type /Pages /Kids [${pageObjectNumbers.map((n) => `${n} 0 R`).join(' ')}] /Count ${pages.length} >>`
  objects[3] = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>'
  objects[4] = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>'

  pages.forEach((page, index) => {
    const content = buildContent(page, index + 1, pages.length, theme)
    const pageNumber = pageObjectNumbers[index]
    const contentNumber = pageNumber + 1

    objects[pageNumber] =
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_WIDTH} ${PAGE_HEIGHT}] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${contentNumber} 0 R >>`
    objects[contentNumber] = `<< /Length ${Buffer.byteLength(content, 'latin1')} >>\nstream\n${content}\nendstream`
  })

  let pdf = '%PDF-1.4\n%\xFF\xFF\xFF\xFF\n'
  const offsets = [0]

  for (let i = 1; i < objects.length; i += 1) {
    offsets[i] = Buffer.byteLength(pdf, 'latin1')
    pdf += `${i} 0 obj\n${objects[i]}\nendobj\n`
  }

  const xrefOffset = Buffer.byteLength(pdf, 'latin1')
  pdf += `xref\n0 ${objects.length}\n`
  pdf += '0000000000 65535 f \n'
  for (let i = 1; i < objects.length; i += 1) {
    pdf += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`
  }
  pdf += `trailer\n<< /Size ${objects.length} /Root 1 0 R /Info << /Title (${escapePdfText(meta.title)}) /Author (${escapePdfText(meta.author)}) >> >>\nstartxref\n${xrefOffset}\n%%EOF\n`

  return Buffer.from(pdf, 'latin1')
}

const collaborationParagraphs = [
  'En la Ciudad de México, a los catorce días del mes de agosto de dos mil veinticinco, las partes que al calce suscriben, por una parte la Secretaría de Medio Ambiente y Desarrollo Sustentable, en adelante "la Secretaría", y por la otra el Colectivo Papá Ganjah A.C., en adelante "el Colectivo", manifiestan su voluntad de coordinar esfuerzos para la rehabilitación integral de espacios públicos.',
  'El presente instrumento se celebra en un marco de colaboración ciudadana, respeto institucional y estricto apego al marco normativo aplicable. Las actividades se ejecutarán sin fines de lucro y con enfoque de salud comunitaria, educación ambiental y participación vecinal.',
  'Ambas partes reconocen que la recuperación de espacios públicos es una tarea compartida que requiere planeación técnica, transparencia en el uso de recursos y mecanismos claros de rendición de cuentas ante la comunidad.',
]

const collaborationPages = [
  {
    kicker: 'Convenio de colaboración',
    heading: 'Rehabilitación integral del Parque Alameda Norte',
    body: collaborationParagraphs,
    signature: 'Dirección General de Vinculación Ciudadana',
    signatureDetail: 'Secretaría de Medio Ambiente y Desarrollo Sustentable',
  },
  {
    kicker: 'Cláusulas y compromisos',
    heading: 'Actividades, metas y rendición de cuentas',
    body: [
      'Primera. El Colectivo aportará voluntariado, materiales de jardinería y acompañamiento comunitario para la limpieza, plantación y recuperación de mobiliario del Parque Alameda Norte.',
      'Segunda. La Secretaría facilitará la coordinación con la Dirección de Servicios Urbanos, el retiro de residuos y la supervisión técnica de las intervenciones en áreas verdes.',
      'Tercera. Las partes elaborarán un acta de entrega-recepción al concluir la jornada, con inventario de acciones, evidencia fotográfica y compromisos de mantenimiento compartido.',
      'Cuarta. El Colectivo publicará en su sitio web los documentos, montos y resultados vinculados a este convenio, en cumplimiento de sus principios de transparencia.',
    ],
    signature: 'Colectivo Papá Ganjah A.C.',
    signatureDetail: 'Representación legal',
  },
]

const healthPages = [
  {
    kicker: 'Oficio de autorización',
    heading: 'Foro de Salud y Regulación Responsable',
    body: [
      'La Dirección de Promoción de la Salud, con fundamento en sus atribuciones de educación para la salud y prevención de riesgos, autoriza la realización del Foro de Salud y Regulación Responsable organizado por el Colectivo Papá Ganjah A.C.',
      'El evento tendrá carácter informativo y preventivo. Se desarrollará con perspectiva de salud pública, derechos humanos y reducción de riesgos, dirigido exclusivamente a personas mayores de dieciocho años.',
      'La autorización no implica respaldo a opiniones de terceros ni la promoción de conductas contrarias a la normativa vigente. El Colectivo será responsable de la logística, el aforo y la seguridad del evento.',
    ],
    bullets: [
      'Fecha de realización: 14 de noviembre de 2026.',
      'Sede: Centro Cultural Elena Garro, Coyoacán, Ciudad de México.',
      'Horario: 10:00 a 13:00 horas. Aforo máximo: 120 personas.',
      'Contenido: evidencia científica, prevención, reducción de riesgos y marco legal.',
    ],
    signature: 'Dirección de Promoción de la Salud',
    signatureDetail: 'Secretaría de Salud — Ciudad de México',
  },
]

const recognitionPages = [
  {
    kicker: 'Constancia de participación',
    heading: 'Congreso de Política de Drogas y Derechos Humanos',
    body: [
      'La Comisión de Salud del Congreso de la Ciudad de México otorga la presente constancia al Colectivo Papá Ganjah A.C. por su participación activa en las mesas de trabajo del Congreso de Política de Drogas y Derechos Humanos.',
      'Se reconoce su aportación en la construcción de propuestas ciudadanas basadas en evidencia, así como su compromiso con el diálogo institucional, la transparencia y el respeto a los derechos humanos.',
      'La presente constancia se expide para los fines informativos y de transparencia que el colectivo considere pertinentes.',
    ],
    highlight: 'Reconocimiento a la participación ciudadana en mesas de trabajo legislativo, marzo de 2026.',
    signature: 'Comisión de Salud',
    signatureDetail: 'Congreso de la Ciudad de México',
  },
]

const actaPages = [
  {
    kicker: 'Acta de entrega-recepción',
    heading: 'Jornada de Rehabilitación Alameda Norte',
    body: [
      'Siendo las catorce horas del ocho de junio de dos mil veintiséis, se reúnen representantes de la Dirección de Servicios Urbanos y del Colectivo Papá Ganjah A.C. para hacer constar la conclusión de la jornada de rehabilitación del Parque Alameda Norte.',
      'Se verificó la limpieza de tres mil doscientos metros cuadrados de área verde, la reparación de dieciocho bancas, la instalación de seis luminarias solares y la plantación de ochenta y seis árboles nativos.',
      'Asimismo, se retiraron mil doscientos cuarenta kilogramos de residuos y se habilitó un huerto comunitario con catorce camas de cultivo para uso de las familias del barrio.',
    ],
    signature: 'Dirección de Servicios Urbanos',
    signatureDetail: 'Alcaldía — Ciudad de México',
  },
  {
    kicker: 'Compromisos de continuidad',
    heading: 'Mantenimiento compartido y seguimiento vecinal',
    body: [
      'Las partes acuerdan establecer un esquema de mantenimiento compartido. La alcaldía dará seguimiento al riego y poda; el Colectivo coordinará jornadas vecinales trimestrales y talleres de cuidado del huerto.',
      'Se integrará un comité vecinal de seguimiento que documentará el estado del parque y reportará necesidades a la Dirección de Servicios Urbanos mediante los canales establecidos.',
      'El presente acta se publica en el sitio del Colectivo como parte de su compromiso de transparencia y rendición de cuentas ante la comunidad.',
    ],
    signature: 'Comité Vecinal Alameda Norte',
    signatureDetail: 'Testigo de la comunidad',
  },
]

const annualReportPages = [
  {
    kicker: 'Informe anual 2025',
    heading: 'Transparencia, convenios y destino de donativos',
    body: [
      'Este informe resume las actividades del Colectivo Papá Ganjah A.C. durante 2025, así como los convenios, oficios y reconocimientos que respaldan nuestra actuación institucional.',
      'Publicamos el destino de los donativos recibidos, los resultados de nuestras jornadas comunitarias y los indicadores de participación en talleres, foros y programas de rehabilitación de espacios públicos.',
      'Nuestro principio es simple: cada documento, cada peso y cada acción deben poder explicarse ante la comunidad y ante las autoridades con las que colaboramos.',
    ],
    highlight: 'Ingresos por donativos 2025: $248,500 MXN. Destino principal: programas comunitarios y materiales para jornadas.',
  },
  {
    kicker: 'Resultados comunitarios',
    heading: 'Indicadores de impacto 2025',
    body: [
      'Durante el año realizamos catorce jornadas de intervención en espacios públicos, con la participación de cuatrocientas ochenta personas voluntarias.',
      'Retiramos mil doscientos cuarenta kilogramos de residuos, plantamos ciento veinte árboles nativos y rehabilitamos dieciocho bancas y seis luminarias solares.',
      'En materia de salud y educación, realizamos dieciséis talleres y cuatro foros con especialistas, alcanzando a más de mil doscientas personas mayores de edad.',
    ],
    bullets: [
      '14 jornadas de rehabilitación en espacios públicos.',
      '480 personas voluntarias activas.',
      '16 talleres de salud, prevención y reducción de riesgos.',
      '9 convenios y actos de colaboración institucional.',
    ],
    signature: 'Colectivo Papá Ganjah A.C.',
    signatureDetail: 'Dirección de Transparencia y Comunidad',
  },
]

const bookPages = [
  {
    kicker: 'Primera edición · 2026',
    heading: 'Cannabis con criterio',
    body: [
      'Una guía ciudadana para entender la regulación, cuidar la salud y construir acuerdos.',
      '',
      'Colectivo Papá Ganjah',
      '',
      'Este libro nace de una convicción: la información clara, la evidencia y el diálogo institucional son mejores herramientas que el estigma.',
    ],
    highlight: 'Vista previa oficial. La versión completa incluye seis capítulos, ejercicios prácticos y una guía de recursos.',
  },
  {
    kicker: 'Introducción',
    heading: 'Por qué hablamos de cannabis con criterio',
    body: [
      'Durante décadas, la conversación pública sobre el cannabis estuvo dominada por el miedo y la desinformación. El resultado fue una política que castigó a las personas más vulnerables y dejó sin respuestas a quienes necesitaban orientación.',
      'Este libro no promete milagros ni ofrece recetas. Propone algo más modesto y más útil: criterios para entender qué dice la ley, cómo cuidar la salud y cómo participar en la construcción de políticas públicas basadas en evidencia.',
      'Hablar con criterio significa reconocer la complejidad. Significa distinguir entre uso y abuso, entre regulación y ausencia de reglas, entre estigma y salud pública.',
    ],
    highlight: 'La regulación no se construye con silencios. Se construye con información, participación y rendición de cuentas.',
  },
  {
    kicker: 'Capítulo 1',
    heading: 'Entender el marco legal sin mitos',
    body: [
      'La normativa sobre cannabis en México ha cambiado de forma acelerada. Sin embargo, el cambio normativo no siempre llega acompañado de información accesible para la ciudadanía.',
      'Este capítulo revisa las preguntas más frecuentes: qué distingue el uso personal de la posesión con fines de distribución, qué papel juegan los permisos y cómo se relacionan las autoridades locales con los colectivos.',
      'Una advertencia necesaria: este texto es informativo y no sustituye la asesoría de una persona especialista en derecho. Cada caso requiere revisión particular.',
    ],
    bullets: [
      'Distingue entre regulación, despenalización y legalización.',
      'Conoce los riesgos de la información falsa en redes sociales.',
      'Identifica cuándo necesitas acompañamiento legal especializado.',
    ],
  },
  {
    kicker: 'Capítulo 2',
    heading: 'Salud, reducción de riesgos y autocuidado',
    body: [
      'La salud pública no empieza con una prohibición: empieza con información veraz y acceso a servicios. Hablar de reducción de riesgos implica reconocer que las personas toman decisiones y que nuestro papel es acompañarlas con evidencia.',
      'Este capítulo aborda la importancia de la dosificación, la calidad del producto, la interacción con medicamentos y las señales de alerta que requieren atención profesional.',
      'Ninguna guía sustituye la valoración clínica. Si existe una condición de salud o un consumo problemático, la recomendación es acudir a servicios profesionales.',
    ],
    highlight: 'Reducir riesgos no es normalizar el consumo: es cuidar a las personas con información honesta y servicios disponibles.',
  },
  {
    kicker: 'Capítulo 3',
    heading: 'Comunidad, territorio y espacio público',
    body: [
      'Los colectivos no solo existen en internet. Existen en los parques, en las calles y en los espacios que compartimos. La rehabilitación de un parque puede ser también una forma de reconstruir confianza.',
      'Este capítulo describe metodologías sencillas para diagnosticar un espacio, convocar a vecinos, documentar acuerdos y dar seguimiento a los compromisos con las autoridades.',
    ],
    bullets: [
      'Diagnóstico participativo del espacio público.',
      'Convocatoria incluyente y comunicación clara.',
      'Documentación de acuerdos y rendición de cuentas.',
    ],
  },
  {
    kicker: 'Capítulo 4',
    heading: 'Transparencia como práctica cotidiana',
    body: [
      'La transparencia no es un documento que se publica al final del año. Es una práctica que se construye en cada reunión, cada oficio y cada gasto. Un colectivo que documenta sus acuerdos puede defenderlos ante la comunidad y ante las autoridades.',
      'En este capítulo compartimos los formatos que utilizamos para registrar convenios, actas de entrega-recepción y el destino de los donativos que recibimos.',
    ],
    highlight: 'Si no puedes explicar cómo se tomaron las decisiones, cómo se gastó el dinero y a quién beneficiaste, todavía no hay transparencia.',
  },
  {
    kicker: 'Capítulo 5',
    heading: 'Diálogo institucional sin renunciar a los principios',
    body: [
      'Colaborar con autoridades no significa dejar de ser críticos. Significa encontrar puntos de coincidencia para mejorar la vida de las personas, con límites claros y sin intercambiar silencios por recursos.',
      'Este capítulo ofrece una guía para preparar mesas de trabajo, presentar propuestas y dar seguimiento a compromisos institucionales.',
    ],
    bullets: [
      'Prepara evidencia antes de sentarte a la mesa.',
      'Define límites y acuerdos por escrito.',
      'Documenta avances y comparte resultados con la comunidad.',
    ],
  },
  {
    kicker: 'Capítulo 6',
    heading: 'El siguiente paso es colectivo',
    body: [
      'Ningún cambio social se sostiene en una sola persona. Se sostiene en comunidades organizadas, en instituciones abiertas y en una ciudadanía que exige información y rendición de cuentas.',
      'Este libro termina con una invitación: elige un problema concreto de tu territorio, convoca a otras personas y documenta lo que hagan. La transformación empieza con acciones pequeñas y verificables.',
      'El cannabis es una opción. La forma en que decidimos hablar de él también.',
    ],
    highlight: 'Gracias por leer esta vista previa. La edición completa está disponible en formato digital y físico.',
    signature: 'Colectivo Papá Ganjah',
    signatureDetail: 'El cannabis es una opción',
  },
]

const docs = [
  { file: 'convenio-parque-alameda.pdf', meta: { title: 'Convenio de colaboración para la rehabilitación del Parque Alameda Norte', author: 'Papá Ganjah A.C.' }, pages: collaborationPages },
  { file: 'permiso-foro-salud.pdf', meta: { title: 'Oficio de autorización para el Foro de Salud y Regulación Responsable', author: 'Papá Ganjah A.C.' }, pages: healthPages },
  { file: 'reconocimiento-congreso.pdf', meta: { title: 'Reconocimiento por participación en el Congreso de Política de Drogas', author: 'Papá Ganjah A.C.' }, pages: recognitionPages },
  { file: 'acta-jornada-parque.pdf', meta: { title: 'Acta de entrega-recepción de la Jornada de Rehabilitación Alameda Norte', author: 'Papá Ganjah A.C.' }, pages: actaPages },
  { file: 'informe-anual-2025.pdf', meta: { title: 'Informe anual de transparencia 2025', author: 'Papá Ganjah A.C.' }, pages: annualReportPages },
  { file: 'libro-muestra.pdf', meta: { title: 'Cannabis con criterio — Vista previa', author: 'Colectivo Papá Ganjah' }, pages: bookPages.slice(0, 5), theme: 'book' },
]

for (const doc of docs) {
  const pdf = buildPdf(doc.meta, doc.pages, doc.theme ?? 'official')
  writeFileSync(resolve(outputDir, doc.file), pdf)
  console.log(`Generated public/docs/${doc.file} (${doc.pages.length} pages)`)
}
