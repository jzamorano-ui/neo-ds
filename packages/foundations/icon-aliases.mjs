// packages/foundations/icon-aliases.mjs — emitted without comments. The reasoning behind each decision lives in Neo's source repository.

export const approved = true;
export const appliedInFigma = '2026-09-06';
export const mirroredInCode = true;
export const mirroredOn = '2026-09-06';

export const SYSTEM = {
  advertencia: 'warning', agregar: 'add', 'agregar-circulo': 'add-circle', alarma: 'alarm', ayuda: 'help',
  'bandeja-entrada': 'inbox', 'bandeja-salida': 'outbox', bano: 'restroom', 'bano-mujeres': 'restroom-women',
  billetera: 'wallet', bolsa: 'bag', bombilla: 'lightbulb', brujula: 'compass', buscar: 'search',
  'buscar-circulo': 'search-circle', 'buzon-voz': 'voicemail', 'buzon-voz-silencio': 'voicemail-off',
  calendario: 'calendar', 'calendario-agregar': 'calendar-add', campana: 'bell', 'campana-agregar': 'bell-add',
  'campana-bloquear': 'bell-block', 'campana-silencio': 'bell-off', 'campana-timbrar': 'bell-ring', candado: 'lock',
  carrito: 'cart', 'carrito-agregar': 'cart-add', 'carrito-verificar': 'cart-check', celular: 'mobile',
  cerrar: 'close', 'cerrar-sesion': 'logout', 'chat-burbujas': 'chat', 'chat-escribiendo': 'chat-typing',
  'chevron-abajo': 'chevron-down', 'chevron-arriba': 'chevron-up', 'chevron-derecha': 'chevron-right',
  'chevron-izquierda': 'chevron-left', configuracion: 'settings', copiar: 'copy', corazon: 'heart',
  'corazon-desactivar': 'heart-off', correo: 'mail', 'correo-enviar': 'mail-send', 'derivacion-out': 'referral-out',
  descargar: 'download', diccionario: 'dictionary', editar: 'edit', enlace: 'link', 'enlace-roto': 'link-broken',
  error: 'error', escaner: 'scanner', escudo: 'shield', 'escudo-verificar': 'shield-check', estrella: 'star',
  'flecha-abajo': 'arrow-down', 'flecha-arriba': 'arrow-up', 'flecha-derecha': 'arrow-right',
  'flecha-izquierda': 'arrow-left', 'grafico-baja': 'chart-down', imagen: 'image', informacion: 'info',
  inicio: 'home', kebab: 'kebab', lista: 'list', 'lista-tareas': 'checklist', 'llamada-entrante': 'call-incoming',
  'llamada-entrante-alt': 'call-incoming-alt', mapa: 'map', marcador: 'bookmark', 'media-anterior': 'media-previous',
  'media-avanzar': 'media-forward', 'media-pausa': 'media-pause', 'media-reproducir': 'media-play',
  'media-retroceder': 'media-rewind', 'media-siguiente': 'media-next', megafono: 'megaphone', menos: 'minus',
  'menu-puntos': 'menu-dots', moneda: 'coin', 'nav-derecha': 'nav-right', 'nav-izquierda': 'nav-left',
  navegar: 'navigate', 'navegar-desactivar': 'navigate-off', nube: 'cloud', 'nube-actualizar': 'cloud-refresh',
  'nube-agregar': 'cloud-add', 'nube-alerta': 'cloud-alert', 'nube-bloquear': 'cloud-block',
  'nube-compartir': 'cloud-share', 'nube-transferir': 'cloud-transfer', 'nube-verificar': 'cloud-check',
  'nube-video': 'cloud-video', ojo: 'eye', 'ojo-oculto': 'eye-off', 'papelera-reciclaje': 'trash',
  'portapapeles-agregar': 'clipboard-add', 'portapapeles-eliminar': 'clipboard-remove',
  'portapapeles-verificar': 'clipboard-check', regalo: 'gift', 'reloj-circulo': 'clock', senal: 'signal',
  'silla-ruedas': 'wheelchair', 'sincronizar-alerta': 'sync-alert', soporte: 'support', 'tarjeta-credito': 'credit-card',
  telefono: 'phone', ubicacion: 'location', 'usuario-agregar': 'user-add', 'usuario-circulo': 'user-circle',
  'usuario-id': 'user-id', 'usuario-perfil': 'user-profile', 'usuario-proteger': 'user-shield',
  'usuario-verificar': 'user-check', verificar: 'check', 'verificar-cuadro': 'check-box', 'volumen-alto': 'volume-high',
  'volumen-apagar': 'volume-off', 'volumen-bajar': 'volume-down', 'volumen-bajo': 'volume-low',
  'volumen-mudo': 'volume-mute', wifi: 'wifi', 'wifi-desactivar': 'wifi-off',
};

export const BRAND = {
  ambulancia: 'ambulance', bienestar: 'wellness', brillos: 'sparkles', 'call-center': 'call-center', capsula: 'capsule',
  chequeo: 'checkup', contacto: 'contact', conversacion: 'conversation', cruz: 'cross', desktop: 'desktop',
  diente: 'tooth', dinero: 'money', 'donar-sangre': 'blood-donation', enfermero: 'nurse', estetoscopio: 'stethoscope',
  garantia: 'warranty', 'gorro-enfermero': 'nurse-cap', 'gota-sangre': 'blood-drop', 'historial-medico': 'medical-record',
  hospital: 'hospital', hospitalsymbol: 'hospital-symbol', 'maletin-medico': 'medical-bag', mascarilla: 'mask',
  oido: 'ear', ojo: 'eye', pelota: 'ball', 'ritmo-cardiaco': 'heart-rate', salud: 'health', seguro: 'insurance',
  'silla-ruedas': 'wheelchair', 'tarjeta-credito': 'credit-card', telemedicina: 'telemedicine',
};


export const ALIASES = Object.fromEntries([
  ...Object.entries(SYSTEM).map(([v, n]) => [`system-${v}`, `system-${n}`]),
  ...Object.entries(BRAND).map(([v, n]) => [`brand-${v}`, `brand-${n}`]),
].filter(([oldName, newName]) => oldName !== newName));
