// ============================================================
// Juliana Zapata A. — CENTURY 21 Radial (plantilla base KONFÍO ZINC)
// QR dinámico 160x160 + vCard + compartir + año + service worker
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  const qrEl = document.getElementById('qrcode');
  if (qrEl && typeof QRCode !== 'undefined') {
    new QRCode(qrEl, {
      text: window.location.href,
      width: 160,
      height: 160,
      colorDark: '#171717',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.H
    });
  }

  const copiar = (texto) => {
    const ok = () => {};
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(texto).catch(() => {});
    } else {
      const ta = document.createElement('textarea');
      ta.value = texto; ta.style.position = 'fixed'; ta.style.left = '-9999px';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); } catch (e) {}
      ta.remove();
    }
    ok();
  };

  // Compartir nativo con respaldo a copiar enlace
  document.getElementById('btn-share').addEventListener('click', async () => {
    const data = { title: 'Juliana Zapata A. — CENTURY 21 Radial', text: 'Asesoría inmobiliaria de alta gama en Medellín. Venta, arriendos, avalúos y trámites legales.', url: window.location.href };
    if (navigator.share) {
      try { await navigator.share(data); } catch (e) {}
    } else {
      copiar(window.location.href);
    }
  });

  // Guardar contacto (vCard)
  document.getElementById('btn-vcard').addEventListener('click', () => {
    const vCardData = 'BEGIN:VCARD\r\nVERSION:3.0\r\nFN:Juliana Zapata A.\r\nORG:CENTURY 21 Radial\r\nTITLE:Agente Inmobiliario Profesional\r\nTEL;TYPE=CELL:+573117700918\r\nTEL;TYPE=WORK:+5745898666\r\nEMAIL:jzapata@century21radial.com\r\nADR;TYPE=WORK:;;Cl. 20 Sur #27-55 Mall San Lucas Int 1 y 2;Medellin;;;Colombia\r\nNOTE:Especialista en venta, arriendos y corretaje de inmuebles residenciales.\r\nEND:VCARD';
    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Juliana_Zapata_C21.vcf';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1200);
  });

  // Año
  const anio = document.getElementById('anio');
  if (anio) anio.textContent = new Date().getFullYear();

  // Service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js').catch(() => {});
  }
});
