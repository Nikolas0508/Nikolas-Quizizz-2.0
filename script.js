(function () {
    console.log("🚀 Iniciando testes de robustez...");

    let resultados = [];

    // 1. Remover eventos básicos (forma mais segura)
    try {
        window.onblur = null;
        window.onfocus = null;

        document.onvisibilitychange = null;

        resultados.push("✅ Eventos básicos limpos");
    } catch (e) {
        resultados.push("❌ Falha eventos básicos");
    }

    // 2. Simular foco ativo (sem quebrar site)
    try {
        document.hasFocus = () => true;
        resultados.push("✅ hasFocus sobrescrito");
    } catch (e) {
        resultados.push("❌ Falha hasFocus");
    }

    // 3. Limpar intervals (limitado pra não quebrar tudo)
    try {
        for (let i = 0; i < 1000; i++) {
            clearInterval(i);
        }
        resultados.push("✅ Intervals limpos");
    } catch (e) {
        resultados.push("❌ Falha intervals");
    }

    // 4. Bloquear alert
    try {
        window.alert = () => {};
        resultados.push("✅ alert bloqueado");
    } catch (e) {
        resultados.push("❌ Falha alert");
    }

    // 5. Reativar botão direito (mais confiável)
    try {
        document.querySelectorAll('*').forEach(el => {
            el.oncontextmenu = null;
            el.removeAttribute('oncontextmenu');
        });

        document.addEventListener('contextmenu', e => {
            e.stopPropagation();
        }, true);

        resultados.push("✅ Botão direito ativado");
    } catch (e) {
        resultados.push("❌ Falha botão direito");
    }

    // Resultado
    console.log("\n📊 RESULTADO:");
    resultados.forEach(r => console.log(r));

})();


// --- PAINEL SIMPLES ---
(function () {
    if (document.getElementById("nikolas-panel")) return;

    const panel = document.createElement("div");
    panel.id = "nikolas-panel";

    Object.assign(panel.style, {
        position: "fixed",
        top: "10px",
        left: "10px",
        zIndex: "999999",
        background: "rgba(10, 15, 30, 0.9)",
        padding: "10px 14px",
        borderRadius: "10px",
        color: "#4da6ff",
        fontFamily: "Arial, sans-serif",
        fontSize: "14px",
        fontWeight: "bold",
        boxShadow: "0 0 15px rgba(0,150,255,0.7)",
        border: "1px solid rgba(0,150,255,0.6)"
    });

    panel.textContent = "Nikolas Quizizz";

    document.body.appendChild(panel);

    console.log("🟢 Painel ativado");
})();
