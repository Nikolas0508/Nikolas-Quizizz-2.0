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

(function () {
    if (document.getElementById("nikolas-panel")) return;

    const panel = document.createElement("div");
    panel.id = "nikolas-panel";

    panel.style.position = "fixed";
    panel.style.top = "10px";
    panel.style.left = "10px";
    panel.style.zIndex = "999999";
    panel.style.background = "rgba(10, 15, 30, 0.9)";
    panel.style.padding = "10px 14px";
    panel.style.borderRadius = "10px";
    panel.style.color = "#4da6ff";
    panel.style.fontFamily = "Arial, sans-serif";
    panel.style.fontSize = "14px";
    panel.style.fontWeight = "bold";
    panel.style.boxShadow = "0 0 15px rgba(0,150,255,0.7)";
    panel.style.border = "1px solid rgba(0,150,255,0.6)";

    panel.innerText = "Nikolas Quizizz ON";

    document.body.appendChild(panel);

    console.log("🟢 Painel simples ativado");
})();
