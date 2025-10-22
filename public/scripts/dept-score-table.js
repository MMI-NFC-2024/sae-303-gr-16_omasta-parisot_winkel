async function renderDeptScoreTableScrollable() {
    const [deptScore, fusionDept] = await Promise.all([
        fetch("/assets/deptScore.json").then(r => r.json()),
        fetch("/assets/fusionDept.json").then(r => r.json())
    ]);

    // Conteneur avec scroll
    const container = document.createElement("div");
    container.style.maxHeight = "400px"; // hauteur fixe
    container.style.overflowY = "auto";
    container.style.border = "1px solid #ccc";
    container.style.borderRadius = "6px";
    container.style.width = "100%";
    container.style.maxWidth = "900px";

    // Créer le tableau HTML
    const table = document.createElement("table");
    table.style.borderCollapse = "collapse";
    table.style.width = "100%";

    // En-tête
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    ["Département", "APL Moyenne", "Pauvreté (%)", "Hôpitaux/100k", "Discordance"].forEach(text => {
        const th = document.createElement("th");
        th.textContent = text;
        th.style.border = "1px solid #ccc";
        th.style.padding = "6px 12px";
        th.style.background = "#f0f0f0";
        th.style.position = "sticky";
        th.style.top = "0"; // garde l'entête visible
        th.style.textAlign = "center";
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Corps
    const tbody = document.createElement("tbody");
    deptScore.forEach(d => {
        const fusion = fusionDept.find(f => f.codeDept === d.codeDept);
        const pauvrete = fusion?.pauvrete ?? null;

        const tr = document.createElement("tr");
        [
            d.codeDept,
            d.aplMoy?.toFixed(2) ?? "—",
            pauvrete != null ? pauvrete.toFixed(1) : "—",
            d.hospPer100k?.toFixed(1) ?? "—",
            d.discordance?.toFixed(2) ?? "—"
        ].forEach(val => {
            const td = document.createElement("td");
            td.textContent = val;
            td.style.border = "1px solid #ccc";
            td.style.padding = "6px 12px";
            td.style.textAlign = "center";
            tr.appendChild(td);
        });

        tbody.appendChild(tr);
    });
    table.appendChild(tbody);

    container.appendChild(table);
    document.getElementById("table-container").appendChild(container);
}

renderDeptScoreTableScrollable();
