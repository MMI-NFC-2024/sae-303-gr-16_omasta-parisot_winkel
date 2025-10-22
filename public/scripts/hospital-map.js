import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

async function renderHospitalMap() {
    const [departements, deptData] = await Promise.all([
        fetch("/assets/departements.json").then(r => r.json()),
        fetch("/assets/deptData.json").then(r => r.json())
    ]);

    const maxHosp = 30.035769871392294; // valeur fixe

    const plot = Plot.plot({
        width: 900,
        height: 600,
        projection: d3.geoMercator().center([2.2, 46.6]).scale(2000),
        marks: [
            Plot.geo(departements.features, {
                fill: d => {
                    const dept = deptData.find(x => x.codeDept === d.properties.code);
                    return dept ? d3.interpolateReds(dept.hospPer100k / maxHosp) : "#eee";
                },
                stroke: "white",
                tip: true,
                title: d => {
                    const dept = deptData.find(x => x.codeDept === d.properties.code);
                    return `${d.properties.nom} — ${dept ? dept.hospPer100k.toFixed(2) : "N/A"} hôpitaux/100k hab`;
                }
            })
        ],
        color: {
            type: "linear",
            scheme: "Reds",
            label: "Hôpitaux / 100 000 habitants",
            legend: true,
            domain: [0, maxHosp]
        },
        style: { background: "#f9f9f9", margin: "0 auto" }, // centrer le SVG dans le wrapper
    });


    document.getElementById("hospital-map-container").appendChild(plot);
}

renderHospitalMap();
