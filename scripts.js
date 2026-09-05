function openModal(id) { document.getElementById(id).classList.add('active'); }
        function closeModal(id) { document.getElementById(id).classList.remove('active'); }

        document.addEventListener('DOMContentLoaded', () => {
            const qrBox = document.getElementById("qrcode");
            if(qrBox) {
                new QRCode(qrBox, {
                    text: window.location.href,
                    width: 130,
                    height: 130,
                    colorDark : "#C6A43F",
                    colorLight : "#ffffff"
                });
            }

            const toast = document.getElementById('toast');
            const showToast = (msg) => {
                toast.textContent = msg;
                toast.style.display = 'block';
                setTimeout(() => toast.style.display = 'none', 2200);
            };

            document.getElementById('btn-vcard').addEventListener('click', () => {
                const vCardData = `BEGIN:VCARD\nVERSION:3.0\nFN:Juliana Zapata A.\nORG:CENTURY 21 Radial\nTITLE:Agente Inmobiliario Profesional\nTEL;TYPE=CELL:+573117700918\nTEL;TYPE=WORK:+5745898666\nEMAIL:jzapata@century21radial.com\nADR;TYPE=WORK:;;Cl. 20 Sur #27-55 Mall San Lucas Int 1 y 2;Medellin;;;Colombia\nNOTE:Especialista en venta, arriendos y corretaje de inmuebles residenciales.\nEND:VCARD`;
                const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'Juliana_Zapata_C21.vcf';
                a.click();
                URL.revokeObjectURL(url);
                showToast('Contacto guardado en agenda');
            });
        });
