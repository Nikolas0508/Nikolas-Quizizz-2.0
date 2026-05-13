(function() {
    'use strict';
    console.log('%c✅ Script anti-detecção Nikolas ativado!', 'color: lime; font-size: 16px;');

    // 1. Reabilita botão direito do mouse
    const enableRightClick = () => {
        document.oncontextmenu = null;
        document.body.oncontextmenu = null;
        window.oncontextmenu = null;

        document.addEventListener('contextmenu', (e) => {
            e.stopImmediatePropagation();
            return true;
        }, true);

        const all = document.querySelectorAll('*');
        all.forEach(el => {
            el.oncontextmenu = null;
            el.onmousedown = null;
            el.onselectstart = null;
            el.oncopy = null;
            el.onpaste = null;
            el.oncut = null;
        });
    };

    // 2. Bloqueia detecção de troca de aba / visibilitychange
    const blockVisibilityDetection = () => {
        Object.defineProperty(document, 'visibilityState', {
            get: () => 'visible',
            configurable: true
        });
        Object.defineProperty(document, 'hidden', {
            get: () => false,
            configurable: true
        });

        const originalAddEventListener = document.addEventListener;
        document.addEventListener = function(type, listener, options) {
            if (['visibilitychange', 'webkitvisibilitychange', 'mozvisibilitychange'].includes(type)) {
                console.log('%c🚫 Listener de visibilitychange bloqueado', 'color: orange');
                return;
            }
            return originalAddEventListener.apply(this, arguments);
        };

        window.dispatchEvent(new Event('focus'));
        document.dispatchEvent(new Event('visibilitychange'));
    };

    // 3. Bloqueia detecção de saída de fullscreen
    const blockFullscreenDetection = () => {
        const originalExit = document.exitFullscreen || document.webkitExitFullscreen || document.mozCancelFullScreen;
       
        if (originalExit) {
            document.exitFullscreen = function() {
                console.log('%c🔄 Saída de tela cheia mascarada', 'color: yellow');
                return Promise.resolve();
            };
        }

        ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange'].forEach(event => {
            document.addEventListener(event, (e) => e.stopImmediatePropagation(), true);
        });
    };

    // 4. Bloqueio AVANÇADO de redimensionamento da janela
    const blockResizeDetection = () => {
        let lastWidth = window.innerWidth;
        let lastHeight = window.innerHeight;

        const originalOnResize = window.onresize;

        window.onresize = function(e) {
            const diffW = Math.abs(window.innerWidth - lastWidth);
            const diffH = Math.abs(window.innerHeight - lastHeight);

            if (diffW > 30 || diffH > 30) {
                console.log('%c⚠️ Resize detectado - mascarando...', 'color: orange');
                e.stopImmediatePropagation();
            }

            lastWidth = window.innerWidth;
            lastHeight = window.innerHeight;

            if (typeof originalOnResize === 'function') originalOnResize.call(this, e);
        };

        // Bloqueia novos listeners de resize
        const origAdd = window.addEventListener;
        window.addEventListener = function(type, listener, options) {
            if (type === 'resize') {
                console.log('%c🚫 Listener de resize bloqueado/parcialmente ignorado', 'color: orange');
                // Ainda registra, mas o handler acima filtra
            }
            return origAdd.apply(this, arguments);
        };
    };

    // 5. LIBERA e protege Copia, Cola e Seleção de texto
    const enableCopyPaste = () => {
        // Reabilita eventos
        document.oncopy = null;
        document.onpaste = null;
        document.oncut = null;
        document.onselectstart = null;

        // Força permissão via CSS
        const style = document.createElement('style');
        style.textContent = `
            * {
                -webkit-user-select: text !important;
                -moz-user-select: text !important;
                -ms-user-select: text !important;
                user-select: text !important;
            }
        `;
        document.head.appendChild(style);

        // Intercepta addEventListener para bloquear quem tenta desabilitar
        const originalAdd = document.addEventListener;
        document.addEventListener = function(type, listener, options) {
            if (['copy', 'paste', 'cut', 'selectstart'].includes(type)) {
                console.log(`%c📋 ${type} liberado`, 'color: lime');
                return;
            }
            return originalAdd.apply(this, arguments);
        };

        // Permite Ctrl+C, Ctrl+V, Ctrl+X globalmente
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && ['c','v','x'].includes(e.key.toLowerCase())) {
                console.log(`%c📋 Atalho ${e.key.toUpperCase()} liberado`, 'color: lime');
                // Não impede a propagação
            }
        }, true);
    };

    // 6. Bloqueia atalhos perigosos (mantém devtools)
    const blockShortcuts = () => {
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
                (e.ctrlKey && e.key === 'u')) {
                console.log('%c🔧 Atalho de devtools pressionado', 'color: cyan');
            }
        }, true);
    };

    // ===================== EXECUÇÃO =====================
    enableRightClick();
    blockVisibilityDetection();
    blockFullscreenDetection();
    blockResizeDetection();
    enableCopyPaste();
    blockShortcuts();

    // Atualização periódica
    setInterval(() => {
        enableRightClick();
        enableCopyPaste();
        window.dispatchEvent(new Event('focus'));
    }, 1500);

    // Painel visual
    if (!document.getElementById("nikolas-panel")) {
        const panel = document.createElement("div");
        panel.id = "nikolas-panel";
        Object.assign(panel.style, {
            position: "fixed",
            top: "10px",
            left: "10px",
            zIndex: "2147483647",
            background: "rgba(10, 15, 30, 0.95)",
            color: "#4da6ff",
            padding: "12px 16px",
            borderRadius: "10px",
            fontFamily: "Arial, sans-serif",
            fontSize: "14px",
            fontWeight: "bold",
            boxShadow: "0 0 15px rgba(0,150,255,0.7)",
            border: "1px solid rgba(0,150,255,0.6)"
        });
        panel.textContent = "Nikolas Quizizz";
        document.body.appendChild(panel);
    }

    console.log('%c🎉 Nikolas Quizizz carregado! (Copia, Cola, Resize, Tela Cheia, Aba)', 'color: lime; font-weight: bold;');
})();
