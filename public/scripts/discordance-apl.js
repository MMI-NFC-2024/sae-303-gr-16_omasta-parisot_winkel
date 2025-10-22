import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

async function renderDiscordance() {
    const [departements, deptScore] = await Promise.all([
        fetch("/assets/departements.json").then((r) => r.json()),
        fetch("/assets/deptScore.json").then((r) => r.json())
    ]);

    const plot = Plot.plot({
        width: 700,
        height: 500,
        projection: d3.geoMercator().center([2.2, 46.6]).scale(2000),
        color: {
            type: "diverging",
            scheme: "RdBu", // palette rouge ↔ bleu inversée automatiquement
            domain: [-1, 1],
            label: "Discordance APL – Hôpitaux/100k (normalisée)",
            legend: true
        },
        marks: [
            Plot.geo(departements, {
                fill: (d) => {
                    const dept = deptScore.find((x) => x.codeDept === d.properties.code);
                    return dept ? dept.discordance : null;
                },
                stroke: "#999",
                tip: true,
                title: (d) => {
                    const dept = deptScore.find((x) => x.codeDept === d.properties.code);
                    return dept
                        ? `${d.properties.nom
                        }\nDiscordance APL–Hôpitaux : ${dept.discordance.toFixed(2)}`
                        : d.properties.nom;
                }
            })
        ]
    })

    document.getElementById("plot-container-2").appendChild(plot);
}

renderDiscordance();
