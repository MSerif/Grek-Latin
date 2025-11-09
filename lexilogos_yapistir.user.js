// ==UserScript==
// @name         Lexilogos Metin Yapıştırıcı (Mutlak Hedefleme)
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  URL'den gelen 'metin' parametresini Lexilogos Grekçe kutusuna yapıştırır (1 saniye bekleme).
// @author       Gemini
// @match        https://www.lexilogos.com/keyboard/greek_conversion.htm
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 1. URL parametrelerini al
    const urlParams = new URLSearchParams(window.location.search);
    const metin = urlParams.get('metin');

    if (metin) {
        // Sayfanın tamamen yüklendiğinden emin olmak için 1000ms (1 saniye) bekleyelim.
        // Bu süre, sayfanın dinamik yüklemesinin tamamlanması için önemlidir.
        setTimeout(() => {
            
            // 2. Sayfadaki hedef metin kutusunu, form üzerinden daha kesin bir şekilde bul
            // input[name="q"] seçicisini tekrar deniyoruz, bu sefer daha uzun gecikme ile.
            // Alternatif olarak: document.forms["lexi"].querySelector('input[name="q"]');
            const hedefKutu = document.querySelector('input[name="q"]'); 

            if (hedefKutu) {
                // 3. Metni kutuya yapıştır
                hedefKutu.value = metin;

                // 4. Sitenin kendi JavaScript'ini tetiklemek için olayları gönder
                // Hem 'input' hem de 'change' olaylarını göndermek, sitenin yapıştırmayı algılamasını sağlar.
                ['input', 'change'].forEach(eventType => {
                    const event = new Event(eventType, { bubbles: true });
                    // Gerekirse event'e ek veri de ekleyebiliriz, ancak şimdilik bu yeterli.
                    hedefKutu.dispatchEvent(event);
                });

                // 5. İsteğe bağlı: Kutuyu odakla
                hedefKutu.focus();

                console.log("Lexilogos: Seçili metin başarıyla yapıştırıldı (v1.2).");
                
            } else {
                console.error("Lexilogos: Hedef metin kutusu bulunamadı (v1.2).");
            }
        }, 1000); // **1 Saniye (1000ms) bekleme**
    }
})();
