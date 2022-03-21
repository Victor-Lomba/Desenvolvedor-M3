import "./products";

window.addEventListener("load",() => {
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


});
