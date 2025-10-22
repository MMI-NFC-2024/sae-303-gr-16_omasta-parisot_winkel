import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

async function renderAPLBar() {
    const aplDept = await fetch("/assets/aplDept.json").then(r => r.json());

    // Valeur par défaut pour selectedDept
    let selectedDept = aplDept[0].codeDept;

    // Création de la div pour le select
    const container = document.getElementById("barplot-container");
    const select = document.createElement("select");
    select.style.marginBottom = "20px";

    aplDept.forEach(d => {
        const option = document.createElement("option");
        option.value = d.codeDept;
        option.text = d.codeDept;
        select.appendChild(option);
    });

    select.value = selectedDept;
    container.appendChild(select);

    // Création du graphique
    const drawPlot = () => {
        const existingPlot = container.querySelector("svg");
        if (existingPlot) existingPlot.remove();

        const plot = Plot.plot({
            marks: [
                Plot.barX(aplDept, {
                    y: "codeDept",
                    x: "aplMoy",
                    fill: d => (d.codeDept === selectedDept ? "#4682b4" : "#4682b4"),
                    fillOpacity: d => (d.codeDept === selectedDept ? 1 : 0.3)
                }),
                Plot.text(aplDept, {
                    y: "codeDept",
                    x: "aplMoy",
                    text: d => d.aplMoy.toFixed(1),
                    dx: 15,
                    fill: d => (d.codeDept === selectedDept ? "black" : "#aaa"),
                    fontSize: 12
                })
            ],
            y: { label: "Département" },
            x: { label: "Moyenne APL" },
            width: 600,
            height: 1100
        });

        container.appendChild(plot);
    };

    drawPlot();

    // Mettre à jour le graphique quand on change de département
    select.addEventListener("change", (e) => {
        selectedDept = e.target.value;
        drawPlot();
    });
}

renderAPLBar();
