
let cenaVR;

function abrirVR() {
    if (document.getElementById("vr-container")) return;

    if (window.AFRAME) {
        construirCenaVR();
        return;
    }

    if (document.getElementById("aframe-script")) return;

    const script = document.createElement("script");

    script.id = "aframe-script";
    script.src = "https://aframe.io/releases/1.4.0/aframe.min.js";

    script.onload = construirCenaVR;

    script.onerror = function () {
        script.remove();
        alert("Não foi possível carregar o modo VR.");
    };

    document.head.appendChild(script);
}

function construirCenaVR() {
    if (document.getElementById("vr-container")) return;

    const container = document.createElement("div");
    container.id = "vr-container";

    container.style.position = "fixed";
    container.style.inset = "0";
    container.style.width = "100vw";
    container.style.height = "100vh";
    container.style.background = "black";
    container.style.zIndex = "99999";

    // Cena 360°
    cenaVR = document.createElement("a-scene");

    cenaVR.setAttribute("embedded", "");
    cenaVR.setAttribute("vr-mode-ui", "enabled: true");

    cenaVR.style.width = "100%";
    cenaVR.style.height = "100%";

    // Imagem panorâmica
    const panorama = document.createElement("a-sky");

    panorama.setAttribute(
        "src",
        "fotos/biblioteca_panoramica.jpeg"
    );

    panorama.setAttribute("rotation", "0 -90 0");

    // Câmera
    const camera = document.createElement("a-camera");

    camera.setAttribute("position", "0 1.6 0");
    camera.setAttribute("look-controls", "enabled: true");

    cenaVR.appendChild(panorama);
    cenaVR.appendChild(camera);

    // Botão fechar
    const fechar = document.createElement("button");

    fechar.innerText = "✖ Fechar VR";
    fechar.style.position = "absolute";
    fechar.style.top = "15px";
    fechar.style.right = "15px";
    fechar.style.zIndex = "100001";
    fechar.style.padding = "12px 20px";
    fechar.style.background = "#dc3545";
    fechar.style.color = "white";
    fechar.style.border = "none";
    fechar.style.borderRadius = "8px";

    fechar.onclick = fecharVR;

    // Botão ativar VR
    const ativar = document.createElement("button");

    ativar.innerText = "🥽 Ativar VR Box";
    ativar.style.position = "absolute";
    ativar.style.top = "15px";
    ativar.style.left = "15px";
    ativar.style.zIndex = "100001";
    ativar.style.padding = "12px 20px";
    ativar.style.background = "#164194";
    ativar.style.color = "white";
    ativar.style.border = "none";
    ativar.style.borderRadius = "8px";

    ativar.onclick = async function () {
        try {
            await cenaVR.enterVR();
        } catch (erro) {
            alert("Não foi possível iniciar o modo VR. Verifique se o navegador e o dispositivo oferecem suporte.");
            console.error(erro);
        }
    };

    container.appendChild(ativar);
    container.appendChild(fechar);

    document.body.appendChild(container);
    container.appendChild(cenaVR);
}

function fecharVR() {
    const container = document.getElementById("vr-container");

    if (!container) return;

    if (cenaVR && cenaVR.is("vr-mode")) {
        cenaVR.exitVR();
    }

    container.remove();
    cenaVR = null;
}
