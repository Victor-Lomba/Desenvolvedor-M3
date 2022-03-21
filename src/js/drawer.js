

window.addEventListener("load",() => {
    const filterOpen = document.querySelector(".open-mobile-filter");
    const filterClose = document.querySelector(".close-mobile-filter");
    const filterconfirm = document.querySelector(".confirm-filter-mobile"); 
    const orderByClose = document.querySelector(".close-mobile-orderBy");
    const orderByOpen = document.querySelector(".mobile-orderBy");
    const filterMenu = document.querySelector("aside");
    const orderByMeny = document.querySelector(".ordenar-drawer")
    const content = document.querySelector("section");

    orderByClose.addEventListener("click",() => {
        orderByMeny.classList.remove("show");
        content.classList.remove("order-by");
        
    });

    orderByOpen.addEventListener("click",() => {
        orderByMeny.classList.add("show");
        content.classList.add("order-by");
        
    });


    filterOpen.addEventListener("click",() => {
        filterMenu.classList.add("show");
        content.classList.add("hide");
        
    });

    filterconfirm.addEventListener("click",() => {
        filterMenu.classList.remove("show");
        content.classList.remove("hide");
        
    })

    filterClose.addEventListener("click",() => {
        filterMenu.classList.remove("show");
        content.classList.remove("hide");
        
    });
    
    
});