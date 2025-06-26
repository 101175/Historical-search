const duchies = document.querySelectorAll(".duchy");
const capturedList = document.getElementById("captured-list");

duchies.forEach(path => {
    path.addEventListener("click", () => {
        const color = document.getElementById("color").value;
        const tag = document.getElementById("tag").value;
        path.style.fill = color;

        const name = path.id.replace("duchy", "Duchy ");
        const li = document.createElement("li");
        li.textContent = `${name} - ${tag || "No tag"}`;
        capturedList.appendChild(li);
    });
});

function clearEmpire() {
    duchies.forEach(p => (p.style.fill = "#eee"));
    capturedList.innerHTML = "";
}