(function() {
    'use strict';

    console.log('%c✅ Script anti-detecção ativado!', 'color: lime; font-size: 16px;');

    // 1. Reabilita botão direito do mouse
    const enableRightClick = () => {
        document.oncontextmenu = null;
        document.body.oncontextmenu = null;
        window.oncontextmenu = null;

        // Remove listeners antigos de contextmenu
        document.addEventListener('contextmenu', (e) => {
            e.stopImmediatePropagation();
        }, true);

        // Remove on* handlers de todos os elementos
        const all = document.querySelectorAll('*');
        all.forEach(el => {
            el.oncontextmenu = null;
            el.onmousedown = null;
            el.onselectstart = null;
        });
    };

    // 2. Bloqueia detecção de troca de aba / visibilitychange
    const blockVisibilityDetection = () => {
        // Força sempre "visible"
        Object.defineProperty(document, 'visibilityState', {
            get: () => 'visible',
            configurable: true
        });

        Object.defineProperty(document, 'hidden', {
            get: () => false,
            configurable: true
        });

        // Remove ou neutraliza listeners de visibilitychange
        const originalAddEventListener = document.addEventListener;
        document.addEventListener = function(type, listener, options) {
            if (type === 'visibilitychange' || type === 'webkitvisibilitychange' || type === 'mozvisibilitychange') {
                console.log(`%c🚫 Listener de visibilitychange bloqueado`, 'color: orange');
                return;
            }
            return originalAddEventListener.apply(this, arguments);
        };

        // Dispara um evento fake de visible
        window.dispatchEvent(new Event('focus'));
        document.dispatchEvent(new Event('visibilitychange'));
    };

    // 3. Bloqueia detecção de saída de fullscreen
    const blockFullscreenDetection = () => {
        const originalExit = document.exitFullscreen || document.webkitExitFullscreen || document.mozCancelFullScreen;
        
        if (originalExit) {
            document.exitFullscreen = function() {
                console.log('%c🔄 Saída de tela cheia permitida (mas pode não funcionar 100% por segurança do navegador)', 'color: yellow');
                return Promise.resolve();
            };
        }

        // Neutraliza evento fullscreenchange
        document.addEventListener('fullscreenchange', (e) => {
            e.stopImmediatePropagation();
        }, true);

        document.addEventListener('webkitfullscreenchange', (e) => {
            e.stopImmediatePropagation();
        }, true);
    };

    // 4. Bloqueia detecção de resize da janela/tela
    const blockResizeDetection = () => {
        let lastWidth = window.innerWidth;
        let lastHeight = window.innerHeight;

        const originalResizeHandler = window.onresize;

        window.onresize = function(e) {
            // Só permite resize pequeno (ajuste fino) sem disparar alertas
            const diffW = Math.abs(window.innerWidth - lastWidth);
            const diffH = Math.abs(window.innerHeight - lastHeight);

            if (diffW > 50 || diffH > 50) {
                console.log('%c⚠️ Resize grande detectado, mas estamos mascarando...', 'color: orange');
                // Não deixa propagar para listeners do site
                e.stopImmediatePropagation();
            }

            lastWidth = window.innerWidth;
            lastHeight = window.innerHeight;

            if (typeof originalResizeHandler === 'function') originalResizeHandler.call(this, e);
        };

        // Sobrescreve addEventListener para resize também
        const origAdd = window.addEventListener;
        window.addEventListener = function(type, listener, options) {
            if (type === 'resize') {
                console.log('%c🚫 Listener de resize bloqueado/parcialmente ignorado', 'color: orange');
                // Ainda permite o evento, mas muitos sites verificam diferença grande
                return origAdd.call(this, type, listener, options);
            }
            return origAdd.apply(this, arguments);
        };
    };

    // 5. Bloqueia teclas comuns de atalho (F12, Ctrl+Shift+I, Esc em alguns casos)
    const blockShortcuts = () => {
        document.addEventListener('keydown', (e) => {
            // Permite F12 (devtools) mas bloqueia alguns outros
            if (e.key === 'F12' || 
                (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
                (e.ctrlKey && e.key === 'u')) {
                // Não bloqueamos totalmente devtools, mas logamos
                console.log('%c🔧 Atalho de devtools pressionado', 'color: cyan');
            }

            // Esc para sair de fullscreen - não bloqueamos (navegador não permite bloquear totalmente)
        }, true);
    };

    // Executa todas as funções
    enableRightClick();
    blockVisibilityDetection();
    blockFullscreenDetection();
    blockResizeDetection();
    blockShortcuts();

    // Atualiza periodicamente (alguns sites verificam de tempos em tempos)
    setInterval(() => {
        enableRightClick();
        window.dispatchEvent(new Event('focus'));
    }, 2000);

    console.log('%c🎉 Tudo configurado! Teste botão direito, troca de aba e ajuste de tela.', 'color: lime; font-weight: bold;');

(function () {
    if (document.getElementById("nikolas-panel")) return;

    const panel = document.createElement("div");
    panel.id = "nikolas-panel";

    Object.assign(panel.style, {
        position: "fixed",
        top: "10px",
        left: "10px",
        zIndex: "2147483647",
        background: "rgba(10, 15, 30, 0.9)",
        color: "#4da6ff",
        padding: "10px 14px",
        borderRadius: "10px",
        fontFamily: "Arial, sans-serif",
        fontSize: "14px",
        fontWeight: "bold",
        boxShadow: "0 0 15px rgba(0,150,255,0.7)",
        border: "1px solid rgba(0,150,255,0.6)"
    });

    panel.textContent = "Nikolas Quizizz";

    document.body.appendChild(panel);

    console.log("🟢 Painel visual ativado");
})();

})();
