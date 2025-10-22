import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

async function renderHospitalsMap() {
    const [departements, finessWgs84] = await Promise.all([
        fetch("/assets/departements.json").then(r => r.json()),
        fetch("/assets/finessWgs84.json").then(r => r.json())
    ]);

    const plot = Plot.plot({
        width: 700,
        height: 700,
        projection: {
            type: "mercator",
            domain: departements
        },
        marks: [
            // Fond de carte (départements)
            Plot.geo(departements, {
                fill: "#f0f0f0",
                stroke: "#999",
                title: (d) => d.properties.nom,
                tip: false
            }),

            // Points des établissements hospitaliers
            Plot.dot(
                finessWgs84.filter((d) => d.lon && d.lat),
                {
                    x: "lon",
                    y: "lat",
                    fill: "#d62728",
                    r: 3,
                    stroke: "#fff",
                    strokeWidth: 0.5,
                    title: (d) => d.raison,
                    tip: true,
                    channels: { type: "Hôpitaux" } // permet à Plot de créer une entrée de légende
                }
            )
        ],
        color: {
            legend: true,
            label: "Type d’établissement",
            domain: ["Hôpitaux"],
            range: ["#d62728"]
        },
        style: {
            background: "white"
        }
    })

    document.getElementById("plot-container-4").appendChild(plot);
}

renderHospitalsMap();
