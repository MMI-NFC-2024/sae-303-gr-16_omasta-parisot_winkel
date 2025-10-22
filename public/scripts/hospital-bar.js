import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";

async function renderHospitalsBar() {
    const sortedHospByDept = await fetch("/assets/sortedHospByDept.json").then(r => r.json());

    const plot = Plot.plot({
        marks: [
            Plot.barY(sortedHospByDept, {
                x: "codeDept",
                y: "count",
                fill: "#69b3a2",
                title: (d) => `Dept ${d.codeDept}: ${d.count}`
            }),
            Plot.text(sortedHospByDept, {
                x: "codeDept",
                y: "count",
                text: (d) => d.count,
                dy: "-8",
                fill: "black",
                fontSize: 16,
                fontWeight: "bold"
            })
        ],
        x: {
            label: "Département",
            grid: true,
            tickSize: 0,
            ticks: 10
        },
        y: {
            label: "Nombre d'établissements hospitaliers",
            grid: true,
            tickSize: 0,
            ticks: 5
        },
        width: 800,
        height: 500,
        style: {
            background: "linear-gradient(to right, #E5E5E5, #DDD6F3)",
            padding: "10px",
            borderRadius: "10px"
        },
        color: {
            scheme: "viridis"
        }
    })

    document.getElementById("plot-container-3").appendChild(plot);
}

renderHospitalsBar();
