const toggles = new Map();
let order = 0;
let callbacks = [];

const setFilterValue = (key,value) => {
    toggles.set(key,value);
    callbacks.forEach(callback => callback());

}

export const onFilterChange = (callback) => {
    callbacks.push(() => callback());
}

const cleanFilter = () => {
    toggles.forEach((value, key) => {
        setFilterValue(key,false);
    });
    callbacks.forEach(callback => callback());
}



window.addEventListener("load",() => {


    const checkbox = document.querySelectorAll(".checkbox");
    
    const filterClean = document.querySelector(".clean-filter-mobile");

    
    filterClean.addEventListener("click",() => {
        cleanFilter();
        const checkboxes = document.querySelectorAll(".checkbox");
        checkboxes.forEach(checkbox => {
            checkbox.classList.remove("checked");
        });
    });
    
    checkbox.forEach(checkbox => {
        toggles.set(checkbox.id,false);
        checkbox.addEventListener("click",() => {
            const id = checkbox.id;
            setFilterValue(id,!toggles.get(id));
            checkbox.classList.toggle("checked",toggles.get(id));
        });
    });

    for(let i = 1; i < 4; i++){
        const buttonOrder = document.querySelectorAll(`.order-${i}`);
        buttonOrder.forEach(button => {
            button.addEventListener("click",() => {
                order = i;
                callbacks.forEach(callback => callback());
                document.querySelector(".ordenar-drawer").classList.remove("show");
                document.querySelector(".orderBy-text").innerHTML = button.innerHTML + "<img src='img/arrow.svg' alt='arrow down'>";
            });
        });
    }
});


export const filter = (array) => {
    let finalArray = array;
    let noColor = true;
    let noSize = true;
    let noPrice = true;

    let colors = ["Amarelo", "Azul", "Branco","Cinza", "Laranja","Verde","Vermelho", "Preto", "Rosa", "Vinho"];
    let sizes = ["P","M","G","GG","U","36","38","40","42","44","46"];
    let prices = ["0-50", "51-150", "151-300", "301-500", "501-+"];


    const filteredColors = colors.filter((color) => 
        {
            if(toggles.get(color)){
                noColor = false;
                return true;
            }
            return false;
        } );

        
    if(filteredColors.length > 0){
        finalArray = finalArray.filter(product => {
            return filteredColors.includes(product.color);
        })
    }   

    const filteredSizes = sizes.filter((size) => {
        if(toggles.get(size)){
            noSize = false;
            return true;
        }
        return false;
    });

    if(filteredSizes.length > 0){
        finalArray = finalArray.filter(product => {
            return filteredSizes.some(r => {
                console.log(r,product.size);
                return product.size.includes(r)});
        });
    }

    const filteredPrices = prices.filter((price) => {
        if(toggles.get(price)){
            noPrice = false;
            return true;
        }
        return false;
    })

    if(filteredPrices.length > 0){
        finalArray = finalArray.filter(product => {
            return filteredPrices.some(r => {
                console.log(r,product.price);
                return product.price >= parseInt(r.split("-")[0]) && product.price <= parseInt(r.split("-")[1].replace("+",Number.MAX_VALUE)); 
                });
        });
    }

    if(order === 1){
        finalArray.sort((a,b) => {
            if(a.date < b.date) return 1;
            if(a.date > b.date) return -1;
            return 0;
        });
    }

    if(order === 2){
        finalArray.sort((a,b) => a.price - b.price);
    }

    if(order === 3){
        finalArray.sort((a,b) => b.price - a.price);
    }


    if(noColor && noSize && noPrice) {
        finalArray = array;
    }

    return finalArray;
}