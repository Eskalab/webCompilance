// Número de WhatsApp de TDE (el mismo de la barra superior y del botón flotante)
export const TDE_WHATSAPP = '573143992911';

export function whatsappUrl(text: string) {
  return `https://wa.me/${TDE_WHATSAPP}?text=${encodeURIComponent(text)}`;
}
