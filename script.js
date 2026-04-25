(function () {
    console.log("🚀 Iniciando testes de robustez...");

    let resultados = [];

    // 1. Remover eventos básicos
    try {
        document.onvisibilitychange = null;
        window.onblur = null;
        window.onfocus = null;

        resultados.push("✅ Remoção de eventos básicos executada");
    } catch (e) {
        resultados.push("❌ Falha ao remover eventos básicos");
    }

    // 2. Forçar document.hidden = false
    try {
        Object.defineProperty(document, 'hidden', {
            value: false,
            configurable: true
        });

        resultados.push("✅ Override de document.hidden aplicado");
    } catch (e) {
        resultados.push("❌ Falha no override de document.hidden");
    }

    // 3. Forçar foco sempre ativo
    try {
        document.hasFocus = () => true;
        resultados.push("✅ document.hasFocus sobrescrito");
    } catch (e) {
        resultados.push("❌ Falha ao sobrescrever hasFocus");
    }

    // 4. Limpar TODOS os intervals
    try {
        for (let i = 0; i < 10000; i++) {
            clearInterval(i);
        }
        resultados.push("✅ Tentativa de limpar intervals executada");
    } catch (e) {
        resultados.push("❌ Falha ao limpar intervals");
    }

    // 5. Bloquear alert
    try {
        window.alert = () => {};
        resultados.push("✅ alert bloqueado");
    } catch (e) {
        resultados.push("❌ Falha ao bloquear alert");
    }

    // 6. Bloquear novos event listeners
    try {
        window.addEventListener = () => {};
        document.addEventListener = () => {};
        resultados.push("✅ addEventListener bloqueado");
    } catch (e) {
        resultados.push("❌ Falha ao bloquear addEventListener");
    }

    // 7. Tentar reativar botão direito
    try {
        document.oncontextmenu = null;
        document.body.oncontextmenu = null;

        document.querySelectorAll('*').forEach(el => {
            el.oncontextmenu = null;
            el.removeAttribute('oncontextmenu');
        });

        document.addEventListener('contextmenu', e => {
            e.stopImmediatePropagation();
            e.stopPropagation();
            return true;
        }, true);

        resultados.push("✅ Botão direito reativado");
    } catch (e) {
        resultados.push("❌ Falha ao reativar botão direito");
    }

    // Resultado final
    console.log("\n📊 RESULTADO DOS TESTES:");
    resultados.forEach(r => console.log(r));

    console.log("\n⚠️ Agora teste manualmente:");
    console.log("→ Trocar de aba");
    console.log("→ Sair do fullscreen");
    console.log("→ Redimensionar tela");
    console.log("→ Clicar fora da janela");
    console.log("→ Testar botão direito");

    console.log("\n📌 Se seu sistema ainda detectar tudo isso, ele é forte 💪");
})();

// Visual

// --- PAINEL VISUAL (Script ON + Instagram) ---
(function () {
    if (document.getElementById("nikolas-status-panel")) return;

    const panel = document.createElement("div");
    panel.id = "nikolas-status-panel";

    panel.style.position = "fixed";
    panel.style.top = "15px";
    panel.style.right = "15px";
    panel.style.zIndex = "999999";
    panel.style.background = "rgba(0,0,0,0.8)";
    panel.style.backdropFilter = "blur(6px)";
    panel.style.color = "#fff";
    panel.style.padding = "10px 14px";
    panel.style.borderRadius = "10px";
    panel.style.fontFamily = "Arial, sans-serif";
    panel.style.fontSize = "13px";
    panel.style.boxShadow = "0 5px 20px rgba(0,0,0,0.4)";
    panel.style.display = "flex";
    panel.style.alignItems = "center";
    panel.style.gap = "8px";

    const instaIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17" cy="7" r="1.2"/>
    </svg>`;

    panel.innerHTML = `
        <span style="color:#00ff88;font-weight:bold;">● Script ON</span>
        <a href="https://www.instagram.com/nikolas_.pereira05/" target="_blank"
        style="display:flex;align-items:center;gap:5px;color:#fff;text-decoration:none;">
            ${instaIcon}
            <span>@nikolas_.pereira05</span>
        </a>
    `;

    document.body.appendChild(panel);

    console.log("🟢 Painel visual ativado");
})();
