[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/tzO_JqWG)
- URL site WEB : https://sae303-gr16.netlify.app
- URL Notebook Observable : https://observablehq.com/d/ae36572f389d5914
- Nom : Winkel
- Prénom : Titouan
- Nom binome : Omasta-Parisot
- Prénom binome : Ethan

# Remarques :

Décrire ici les éléments techniques remarquables de votre site (interactions, navigation, responsive, accessibilité...).
Idéalement avec des liens vers votre site et/ou [votre code](https://github.blog/news-insights/product-news/relative-links-in-markup-files/)


Tout est fait avec des classes utilitaires, donc on voit clairement ce que fait chaque élément même si ça fait beaucoup de classes. les couleurs sont assez classiques, gris, bleu, vert, rouge, et les espacements sont réguliers. la typographie est cohérente et s’adapte selon la taille de l’écran. par exemple :

<div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
  <div class="p-8 md:p-12">
    <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-8">

la navigation reste toujours visible en haut. quand on clique sur un lien, la page descend doucement vers la section correspondante. les liens changent de couleur quand on passe la souris dessus. par exemple :

<nav class="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
  <div class="max-w-7xl mx-auto px-6">

les graphiques utilisent observable plot et d3. il y a une carte de france qui montre deux infos en même temps : la couleur indique la pauvreté et l’opacité l’accessibilité médicale. les infobulles montrent les infos au survol. par exemple :

const plot = Plot.plot({
    projection: d3.geoMercator().center([2.353, 47.0666]).scale(2300),
    color: { type: "quantize", scheme: "reds", label: "Taux de pauvreté (%)", legend: true },
    opacity: { type: "linear", label: "Accessibilité médicale (APL)", domain: [0, maxApl] },
    marks: [
        Plot.geo(departements.features, {
            fill: (d) => { const val = fusionDept.find(f => f.codeDept === d.properties.code); return val ? val.pauvrete : "#eee"; },
            fillOpacity: (d) => { const val = fusionDept.find(f => f.codeDept === d.properties.code); return val ? val.apl / maxApl : 0.1; },
            tip: true
        }),
    ],
});

il y a aussi un graphique en barres avec un menu pour choisir un département, quand on change de département le graphique se met à jour :

const select = document.createElement("select");
aplDept.forEach(d => {
    const option = document.createElement("option");
    option.value = d.codeDept;
    option.text = d.codeDept;
    select.appendChild(option);
});
select.addEventListener("change", e => {
    selectedDept = e.target.value;
    drawPlot();
});
const plot = Plot.plot({
    marks: [
        Plot.barX(aplDept, {
            fill: d => (d.codeDept === selectedDept ? "#4682b4" : "#4682b4"),
            fillOpacity: d => (d.codeDept === selectedDept ? 1 : 0.3)
        }),
    ],
});

le tableau de données est scrollable et l’entête reste visible quand on descend. les chiffres sont arrondis et les valeurs manquantes sont remplacées par un tiret. par exemple :

const container = document.createElement("div");
container.style.maxHeight = "400px";
container.style.overflowY = "auto";
const th = document.createElement("th");
th.style.position = "sticky";
th.style.top = "0";
th.style.background = "#f0f0f0";


la structure html est logique avec nav, main, section et footer. les titres sont dans le bon ordre et le site indique “lang=fr”. les icônes ont un texte et les contrastes sont corrects. par exemple :

<nav>...</nav>
<main class="min-h-screen">
  <section id="cartes">
    <h2>Cartographie de la Pauvreté et APL</h2>
  </section>
</main>
<footer>...</footer>
<a href="..." target="_blank" class="inline-flex items-center gap-2">
  <svg>...</svg>
  Source : data.gouv.fr
</a>


chaque section a une couleur et un petit numéro pour se repérer :

<span class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white text-xl font-bold">1</span>


les couleurs changent selon la section : bleu, indigo, vert… les liens externes ont des icônes et changent de couleur au survol :

<a href="https://www.data.gouv.fr/..." target="_blank"
   class="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors underline underline-offset-4">
    <svg class="h-4 w-4">...</svg>
    Source : data.gouv.fr
</a>

les couleurs suivent une logique simple : bleu pour info, jaune pour avertissement, rouge pour problème, vert pour succès. par exemple :

<div class="bg-blue-50 border-l-4 border-blue-400">Info</div>
<div class="bg-yellow-50 border-l-4 border-yellow-400">Avertissement</div>
<div class="bg-red-50 border-l-4 border-red-500">Erreur</div>
<div class="bg-green-50 border-l-4 border-green-500">Succès</div>


la stack technique est simple : astro pour le site, tailwind pour le style, d3 et observable plot pour les graphiques, netlify pour mettre le site en ligne :

{
  "dependencies": {
    "@astrojs/netlify": "^6.5.9",
    "@observablehq/plot": "^0.6.17",
    "astro": "^5.13.5",
    "d3": "^7.9.0",
    "tailwindcss": "^4.1.13"
  }
}
