import type { LegalText } from '@/types'

export const privacyNotice: LegalText = {
  title: 'Aviso de Privacidad',
  updatedAt: 'Actualizado en octubre de 2026',
  intro:
    'Papá Ganjah A.C. es responsable del tratamiento de los datos personales que nos proporcionas a través de este sitio, formularios y canales de contacto. Este aviso explica qué datos recabamos, con qué finalidad y cómo puedes ejercer tus derechos.',
  sections: [
    {
      heading: 'Datos que recabamos',
      body: [
        'Recabamos datos de identificación y contacto como nombre, correo electrónico, teléfono y ciudad, además del mensaje de motivación que decidas compartirnos al afiliarte o registrarte a una actividad.',
        'No solicitamos datos personales sensibles. Te pedimos no incluir información médica, ideológica o de otra índole sensible en los campos abiertos del formulario.',
      ],
    },
    {
      heading: 'Finalidades del tratamiento',
      body: [
        'Utilizamos tus datos para dar seguimiento a tu solicitud de afiliación, enviarte información sobre eventos, talleres y proyectos, así como para elaborar registros internos de participación comunitaria.',
        'No utilizamos tus datos para fines distintos a los aquí señalados sin tu consentimiento previo. No vendemos ni rentamos información personal a terceros.',
      ],
    },
    {
      heading: 'Transferencias y conservación',
      body: [
        'Los datos podrán ser compartidos únicamente con autoridades cuando exista una obligación legal o una solicitud fundada y motivada, o con proveedores tecnológicos que nos apoyen en la operación del sitio bajo acuerdos de confidencialidad.',
        'Conservamos la información durante el tiempo necesario para cumplir las finalidades descritas y los plazos que exija la normativa aplicable.',
      ],
    },
    {
      heading: 'Derechos ARCO',
      body: [
        'Puedes solicitar acceso, rectificación, cancelación u oposición al tratamiento de tus datos enviando un correo a contacto@papaganjah.org con el asunto “Derechos ARCO”.',
        'También puedes solicitar la eliminación de tu registro de comunicaciones en cualquier momento mediante el mismo canal.',
      ],
    },
  ],
}

export const legalDisclaimer: LegalText = {
  title: 'Deslinde Legal',
  updatedAt: 'Actualizado en octubre de 2026',
  intro:
    'Papá Ganjah A.C. es un colectivo de la sociedad civil que promueve el diálogo, la educación y la colaboración institucional en torno a la regulación del cannabis. Nuestro contenido es informativo y no constituye asesoría legal, médica ni invitación a realizar conductas contrarias a la ley.',
  sections: [
    {
      heading: 'Cumplimiento del marco normativo',
      body: [
        'Todas nuestras actividades se realizan dentro del marco jurídico aplicable en los territorios donde operamos, con respeto a las autoridades y a los procedimientos administrativos correspondientes.',
        'No promovemos, facilitamos ni participamos en actos ilícitos. Cualquier actividad que requiera autorización se documenta y se publica en nuestra sección de Transparencia.',
      ],
    },
    {
      heading: 'Información para personas mayores de edad',
      body: [
        'El contenido de este sitio está dirigido exclusivamente a personas mayores de 18 años. La información sobre salud, reducción de riesgos y regulación no sustituye la opinión de profesionales certificados.',
        'Si estás pasando por una situación de salud, consumo problemático o emergencia, acude a los servicios públicos de salud o a una línea de atención especializada.',
      ],
    },
    {
      heading: 'Alcance de la información',
      body: [
        'Los documentos, cifras y enlaces publicados tienen fines de transparencia y pueden actualizarse sin previo aviso. Las opiniones vertidas por invitados en foros y talleres son responsabilidad de quienes las emiten.',
        'El uso de la información contenida en este sitio es responsabilidad de la persona usuaria. Papá Ganjah no asume responsabilidad por decisiones tomadas con base en contenidos generales o desactualizados.',
      ],
    },
    {
      heading: 'Contacto',
      body: [
        'Para dudas sobre este deslinde, escribe a contacto@papaganjah.org. Para asuntos de transparencia o solicitudes de información, indica el oficio o convenio de referencia.',
      ],
    },
  ],
}
