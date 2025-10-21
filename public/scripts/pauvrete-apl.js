import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

async function renderPauvreteAPL() {
    // Chargement des données
    const [departements, fusionDept] = await Promise.all([
        fetch("/assets/departements.json").then((r) => r.json()),
        fetch("/assets/fusionDept.json").then((r) => r.json()),
    ]);

    const maxApl = Math.max(...fusionDept.map((d) => d.apl || 0));

    // Création du graphique
    const plot = Plot.plot({
        projection: d3.geoMercator().center([2.353, 47.0666]).scale(2300),
        color: {
            type: "quantize",
            scheme: "reds",
            label: "Taux de pauvreté (%)",
            legend: true,
        },
        opacity: {
            type: "linear",
            label: "Accessibilité médicale (APL)",
            domain: [0, maxApl],
        },
        marks: [
            Plot.geo(departements.features, {
                fill: (d) => {
                    const val = fusionDept.find((f) => f.codeDept === d.properties.code);
                    return val ? val.pauvrete : "#eee";
                },
                fillOpacity: (d) => {
                    const val = fusionDept.find((f) => f.codeDept === d.properties.code);
                    return val ? val.apl / maxApl : 0.1;
                },
                stroke: "white",
                strokeWidth: 0.5,
                title: (d) => {
                    const val = fusionDept.find((f) => f.codeDept === d.properties.code);
                    return val
                        ? `${d.properties.nom}\nTaux de pauvreté : ${val.pauvrete.toFixed(
                            1
                        )}%\nAPL : ${val.apl.toFixed(2)}`
                        : d.properties.nom;
                },
                tip: true,
            }),
        ],
        width: 900,
        height: 600,
        margin: 20,
        style: { background: "#f9f9f9" },
    });

    // Insertion du graphique dans la page
    document.getElementById("plot-container").appendChild(plot);
}

// Lancer le rendu
renderPauvreteAPL();
