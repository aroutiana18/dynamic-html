let i = 0;
let timer;

document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll("#lesimages img");
    const pause = document.getElementById("pause");
    const gauche = document.getElementById("gauche");
    const droite = document.getElementById("droite");

    /*
     * Correction : afficheImage était déclarée deux fois dans ce même bloc.
     * La 2ème déclaration (avec MAJ des bulles) écrasait la 1ère silencieusement.
     * On garde une seule version qui gère les deux cas.
     */
    function afficheImage(index) {
        images.forEach((img) => img.classList.remove("visible"));
        images[index].classList.add("visible");

        document.querySelectorAll(".bubble").forEach((b, idx) => {
            b.classList.toggle("active", idx === index);
        });
    }

    function imageSuivante() {
        i = (i + 1) % images.length;
        afficheImage(i);
    }

    function imagePrecedente() {
        i = (i - 1 + images.length) % images.length;
        afficheImage(i);
    }

    function start() {
        clearInterval(timer);
        if (pause) pause.style.display = "none";
        timer = setInterval(imageSuivante, 5000);
    }

    function stop() {
        clearInterval(timer);
        if (pause) pause.style.display = "block";
    }

    afficheImage(i);
    start();

    droite.addEventListener("click", () => {
        stop();
        imageSuivante();
        start();
    });

    gauche.addEventListener("click", () => {
        stop();
        imagePrecedente();
        start();
    });

    images.forEach((img) => {
        img.addEventListener("mouseenter", stop);
        img.addEventListener("mouseleave", start);
    });
});