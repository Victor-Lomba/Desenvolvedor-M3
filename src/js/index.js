require("./products");
let toggles = new Map();

const setFilterValue = (key,value) => {
    toggles.set(key,value);
}

window.onload = () => {
    const dropButton = document.querySelector(".dropdown");
    const dropOption = document.querySelector(".dropdown-option");
    dropButton.addEventListener("mouseover",() => {
        dropOption.style.display = "block";
    });
    dropButton.addEventListener("mouseout",() => {
        dropOption.style.display = "none";
    });
    dropOption.addEventListener("click",() => {
        dropOption.style.display = "none";
    });


    const checkbox = document.querySelectorAll(".checkbox");

    checkbox.forEach(checkbox => {
        toggles.set(checkbox.id,false);
        checkbox.addEventListener("click",() => {
            const id = checkbox.id;
            console.log(toggles)
            setFilterValue(id,!toggles.get(id));
            checkbox.classList.toggle("checked",toggles.get(id));
        });
    });
}
