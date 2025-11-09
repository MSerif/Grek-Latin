// ==UserScript==
// @name         Lexilogos Metin Yapıştırıcı
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  URL'den gelen 'metin' parametresini Lexilogos Grekçe kutusuna yapıştırır.
// @author       Gemini
// @match        https://www.lexilogos.com/keyboard/greek_conversion.htm
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    // 1. URL parametrelerini al
    const urlParams = new URLSearchParams(window.location.search);
    const metin = urlParams.get('metin');

    if (metin) {
        // 2. Sayfadaki hedef metin kutusunu bul
        // Lexilogos Grekçe metin kutusu 'input' tag'ine ve 'name="q"' özelliğine sahiptir.
        const hedefKutu = document.querySelector('input[name="q"]'); 

        if (hedefKutu) {
            // 3. Metni kutuya yapıştır
            hedefKutu.value = metin;

            // İsteğe bağlı: Kutuyu odakla (göz hizasına getirir)
            hedefKutu.focus();
            
            // Metin kutusunun değerinin değiştiğini sayfaya bildirmek için event tetikle
            hedefKutu.dispatchEvent(new Event('input', { bubbles: true }));

            console.log("Lexilogos: Seçili metin başarıyla yapıştırıldı.");
            
        } else {
            console.error("Lexilogos: Hedef metin kutusu bulunamadı.");
        }
    }
})();