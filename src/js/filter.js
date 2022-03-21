const toggles = new Map();
let callbacks = [];

const setFilterValue = (key,value) => {
    toggles.set(key,value);
    callbacks.forEach(callback => callback());

}

export const onFilterChange = (callback) => {
    callbacks.push(() => callback());
}



window.addEventListener("load",() => {


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
});


export const filter = (array) => {
    let finalArray = [];
    let noColor = true;
    let noSize = true;
    let noPrice = true;

    let colors = ["Amarelo", "Azul", "Branco","Cinza", "Laranja","Verde","Vermelho", "Preto", "Rosa", "Vinho"];
    let sizes = ["P","M","G","GG","U","36","38","40","42","44","46"];
    let prices = ["0-50", "51-150", "151-300", "301-500", "501-+"];

    for(let i = 0; i < colors.length; i++){
        if(toggles.get(colors[i])){
            noColor = false;
            finalArray = [...finalArray, ...array.filter(product => product.color === colors[i])];
        }
    }
    for(let i = 0; i < sizes.length; i++) {
        if(toggles.get(sizes[i])) {
            finalArray = [...finalArray, ...array.filter(product => product.size.includes(sizes[i]))];
            noSize = false;
        }
    }
    for(let i = 0; i < prices.length; i++) {
        if(toggles.get(prices[i])) {
            finalArray = [...finalArray, ...array.filter(product => product.price >= parseInt(prices[i].split("-")[0]) && product.price <= parseInt(prices[i].split("-")[1].replace("+",Number.MAX_VALUE)) )];
            noPrice = false;
        }
    }


    if(noColor && noSize && noPrice) {
        finalArray = array;
    }

    return finalArray;
}