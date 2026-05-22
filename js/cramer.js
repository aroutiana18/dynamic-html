function resolution() {
  // Récupération des coefficients dans le champ
  const a1 = parseFloat(document.getElementById("a1").value) || 0;
  const a2 = parseFloat(document.getElementById("a2").value) || 0;
  const a3 = parseFloat(document.getElementById("a3").value) || 0;
  const a4 = parseFloat(document.getElementById("a4").value) || 0;

  const b1 = parseFloat(document.getElementById("b1").value) || 0;
  const b2 = parseFloat(document.getElementById("b2").value) || 0;
  const b3 = parseFloat(document.getElementById("b3").value) || 0;
  const b4 = parseFloat(document.getElementById("b4").value) || 0;

  const c1 = parseFloat(document.getElementById("c1").value) || 0;
  const c2 = parseFloat(document.getElementById("c2").value) || 0;
  const c3 = parseFloat(document.getElementById("c3").value) || 0;
  const c4 = parseFloat(document.getElementById("c4").value) || 0;
  console.log(a2);

  // Affichage de la matrice principale
  document.getElementById("ma1").textContent = a1;
  document.getElementById("ma2").textContent = a2;
  document.getElementById("ma3").textContent = a3;
  document.getElementById("mb1").textContent = b1;
  document.getElementById("mb2").textContent = b2;
  document.getElementById("mb3").textContent = b3;
  document.getElementById("mc1").textContent = c1;
  document.getElementById("mc2").textContent = c2;
  document.getElementById("mc3").textContent = c3;

  // Calcul déterminant (△) principale
  const delta = a1 * (b2 * c3 - c2 * b3) - a2 * (b1 * c3 - c1 * b3) + a3 * (b1 * c2 - c1 * b2);
  document.getElementById("delta").textContent = delta;

  // Affiche matrice X et calcul de △x
  document.getElementById("ma1_1").textContent = a4;
  document.getElementById("ma2_1").textContent = a2;
  document.getElementById("ma3_1").textContent = a3;
  document.getElementById("mb1_1").textContent = b4;
  document.getElementById("mb2_1").textContent = b2;
  document.getElementById("mb3_1").textContent = b3;
  document.getElementById("mc1_1").textContent = c4;
  document.getElementById("mc2_1").textContent = c2;
  document.getElementById("mc3_1").textContent = c3;

  const deltaX =
    a4 * (b2 * c3 - c2 * b3) -
    a2 * (b4 * c3 - c4 * b3) +
    a3 * (b4 * c2 - c4 * b2);
  document.getElementById("deltaX").textContent = deltaX;

  // Affiche matrice Y et calcul de △y
  document.getElementById("ma1_2").textContent = a1;
  document.getElementById("ma2_2").textContent = a4;
  document.getElementById("ma3_2").textContent = a3;
  document.getElementById("mb1_2").textContent = b1;
  document.getElementById("mb2_2").textContent = b4;
  document.getElementById("mb3_2").textContent = b3;
  document.getElementById("mc1_2").textContent = c1;
  document.getElementById("mc2_2").textContent = c4;
  document.getElementById("mc3_2").textContent = c3;

  const deltaY =
    a1 * (b4 * c3 - c4 * b3) -
    a4 * (b1 * c3 - c1 * b3) +
    a3 * (b1 * c4 - c1 * b4);
  document.getElementById("deltaY").textContent = deltaY;

  // Affiche matrice Z et calcul de △z
  document.getElementById("ma1_3").textContent = a1;
  document.getElementById("ma2_3").textContent = a2;
  document.getElementById("ma3_3").textContent = a4;
  document.getElementById("mb1_3").textContent = b1;
  document.getElementById("mb2_3").textContent = b2;
  document.getElementById("mb3_3").textContent = b4;
  document.getElementById("mc1_3").textContent = c1;
  document.getElementById("mc2_3").textContent = c4;
  document.getElementById("mc3_3").textContent = c3;

  const deltaZ =
    a1 * (b2 * c4 - c2 * b4) -
    a2 * (b1 * c4 - c1 * b4) +
    a4 * (b1 * c2 - c1 * b2);
  document.getElementById("deltaZ").textContent = deltaZ;


  // Calcul des solutions
  let x, y, z;
  if (delta !== 0) {
    x = deltaX / delta;
    y = deltaY / delta;
    z = deltaZ / delta;

    document.getElementById("valeurX").textContent = x.toFixed(4);
    document.getElementById("valeurY").textContent = y.toFixed(4);
    document.getElementById("valeurZ").textContent = z.toFixed(4);
  } else if (deltaX === 0 && deltaY === 0 && deltaZ === 0) {
    document.getElementById("valeurX").textContent = "Infinité de solution";
    document.getElementById("valeurY").textContent = "Infinité de solution";
    document.getElementById("valeurZ").textContent = "Infinité de solution";
  } else {
    document.getElementById("valeurX").textContent = "Pas de solution";
    document.getElementById("valeurY").textContent = "Pas de solution";
    document.getElementById("valeurZ").textContent = "Pas de solution";
  }

  // Affichage des résultats
  document.getElementById("result").style.display = "block";
}

// Cacher les résultats
function clean() {
  document.getElementById("result").style.display = "none";
}
