// ==UserScript==
// @name         Lexilogos Metin Yapıştırıcı (Gecikmeli)
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  URL'den gelen 'metin' parametresini Lexilogos Grekçe kutusuna yapıştırır (Gecikmeli).
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
        // Sayfanın DOM öğelerini oluşturmasını beklemek için kısa bir gecikme (500ms) ekleyelim
        setTimeout(() => {
            
            // 2. Sayfadaki hedef metin kutusunu bul
            // Lexilogos Grekçe metin kutusu için en güvenilir seçici 'input[name="q"]' veya '#q' ID'sidir.
            const hedefKutu = document.querySelector('input[name="q"], #q'); 

            if (hedefKutu) {
                // 3. Metni kutuya yapıştır
                hedefKutu.value = metin;

                // 4. Sitenin kendi JavaScript'ini tetiklemek için olayları gönder
                // 'input' ve 'change' olaylarını göndermek, sitenin yapıştırmayı algılamasını sağlar.
                ['input', 'change'].forEach(eventType => {
                    hedefKutu.dispatchEvent(new Event(eventType, { bubbles: true }));
                });

                // İsteğe bağlı: Kutuyu odakla
                hedefKutu.focus();

                console.log("Lexilogos: Seçili metin başarıyla yapıştırıldı (v1.1).");
                
            } else {
                console.error("Lexilogos: Hedef metin kutusu bulunamadı (v1.1).");
            }
        }, 500); // Yarım saniye (500 milisaniye) bekleme
    }
})();
