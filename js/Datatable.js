let barChart, pieChart;

function montant(q, p) {
  return q * p;
}

$(document).ready(function () {
  // Calcul des montants pour chaque ligne
  function calculerMontants() {
    for (let i = 1; i <= 6; i++) {
      const q = parseInt($("#q" + i).text());
      const p = parseInt($("#p" + i).text());
      const m = montant(q, p);
      $("#m" + i).html(m + " £");
    }
  }

  // Mise à jour des stats et des graphiques
  function updateStatsEtGraphes() {
    let totalMontant = 0;
    let totalQte = 0;
    const valeursMontants = [];

    table.rows({ search: "applied" }).every(function () {
      const row = $(this.node());

      const qte = parseInt(row.find("td:eq(0)").text());
      const montantStr = row
        .find(".montant")
        .text()
        .replace(/[^\d.]/g, "");
      const montant = parseFloat(montantStr);

      if (!isNaN(montant)) {
        valeursMontants.push(montant);
        totalMontant += montant;
      }

      if (!isNaN(qte)) {
        totalQte += qte;
      }
    });

    const moyenne =
      valeursMontants.length > 0
        ? (totalMontant / valeursMontants.length).toFixed(2)
        : 0;
    const min = valeursMontants.length > 0 ? Math.min(...valeursMontants) : 0;
    const max = valeursMontants.length > 0 ? Math.max(...valeursMontants) : 0;

    $("#PrixMinimal").val(min + " £");
    $("#PrixMoyenne").val(moyenne + " £");
    $("#PrixMaximal").val(max + " £");

    $("#total-qte").html(totalQte);
    $("#total-montant").html(totalMontant + " £");

    if (barChart && pieChart) {
      barChart.data.datasets[0].data = [min, moyenne, max];
      pieChart.data.datasets[0].data = [min, moyenne, max];
      barChart.update();
      pieChart.update();
    }
  }

  // Init DataTable
  const table = $("#maTable").DataTable({
    language: {
        search: "Rechercher :",
        lengthMenu: "Afficher _MENU_ entrées",
        info: "Affichage de _START_ à _END_ sur _TOTAL_ entrées",
        infoEmpty: "Aucune entrée",
        zeroRecords: "Aucun résultat trouvé",
        paginate: {
            first: "Première",
            last: "Dernière",
            next: "Suivante",
            previous: "Précédente"
        }
    },
    dom: '<"row mb-2"<"col-sm-6"l><"col-sm-6 text-end"f>>rt<"row mt-2"<"col-sm-6"i><"col-sm-6 text-end"p>>',
  });

  // Calcul initial des montants et stats
  calculerMontants();
  updateStatsEtGraphes();

  // Récupérer les valeurs pour initialiser les graphes
  const prixMin = parseFloat(
    $("#PrixMinimal")
      .val()
      .replace(/[^\d.]/g, "")
  );
  const prixMoy = parseFloat(
    $("#PrixMoyenne")
      .val()
      .replace(/[^\d.]/g, "")
  );
  const prixMax = parseFloat(
    $("#PrixMaximal")
      .val()
      .replace(/[^\d.]/g, "")
  );

  // Création des graphiques
  const barCtx = document.getElementById("barGraphe").getContext("2d");
  const pieCtx = document.getElementById("pieGraphe").getContext("2d");

  barChart = new Chart(barCtx, {
    type: "bar",
    data: {
      labels: ["Prix minimal", "Prix moyenne", "Prix maximal"],
      datasets: [
        {
          data: [prixMin, prixMoy, prixMax],
          backgroundColor: ["red", "orange", "green"],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: true },
        title: {
          display: true,
          text: "Graphe en barre",
          font: { size: 20 },
          color: "blue",
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { font: { size: 12 } },
        },
        x: {
          ticks: { font: { size: 12 } },
        },
      },
    },
  });

  pieChart = new Chart(pieCtx, {
    type: "pie",
    data: {
      labels: ["Prix minimal", "Prix moyenne", "Prix maximal"],
      datasets: [
        {
          data: [prixMin, prixMoy, prixMax],
          backgroundColor: ["red", "orange", "green"],
          hoverOffset: 12,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "right",
          labels: { font: { size: 12 } },
        },
        tooltip: { enabled: true },
        title: {
          display: true,
          text: "Graphe en camembert",
          font: { size: 20 },
          color: "blue",
        },
      },
    },
  });

  // Mise à jour dynamique après tri / recherche
  table.on("draw", function () {
    updateStatsEtGraphes();
  });
});
