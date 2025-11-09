// ==UserScript==
// @name         Lexilogos Metin Yapıştırıcı (Kapsamlı Olay)
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  URL'den gelen 'metin' parametresini Lexilogos Grekçe kutusuna yapıştırır (Uzun bekleme ve tam olay seti).
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
        // Sayfanın DOM öğelerini oluşturması için daha uzun bir süre bekleyelim. (1.5 saniye)
        setTimeout(() => {
            
            // 2. Sayfadaki hedef metin kutusunu bul
            const hedefKutu = document.querySelector('input[name="q"]'); 

            if (hedefKutu) {
                
                // 3. Metni kutuya yapıştır
                hedefKutu.value = metin;

                // 4. Sitenin kendi JavaScript'ini tetiklemek için SIFIR AĞIRLIKLI tam olay seti gönder
                // Bu olay seti, hem klavye/input hem de form change olaylarını taklit eder.
                
                // a) Input Olayı (Değerin değiştiğini bildirir)
                hedefKutu.dispatchEvent(new Event('input', { bubbles: true }));

                // b) KeyUp/KeyDown Olayları (Klavyeden giriş yapılmış hissi verir)
                // Bu olayları göndermek zorunlu olmasa da, bazı sitelerde işe yarar.
                hedefKutu.dispatchEvent(new KeyboardEvent('keydown', { key: 'a', bubbles: true }));
                hedefKutu.dispatchEvent(new KeyboardEvent('keyup', { key: 'a', bubbles: true }));
                
                // c) Change Olayı (Alan odağını kaybettiğinde değerin değiştiğini bildirir)
                hedefKutu.dispatchEvent(new Event('change', { bubbles: true }));

                // d) Odaklanma (Focus)
                hedefKutu.focus();

                console.log("Lexilogos: Seçili metin başarıyla yapıştırıldı (v1.3).");
                
            } else {
                console.error("Lexilogos: Hedef metin kutusu bulunamadı (v1.3).");
            }
        }, 1500); // **1.5 Saniye (1500ms) bekleme**
    }
})();
