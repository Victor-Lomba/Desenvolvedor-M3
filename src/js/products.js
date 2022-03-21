import Cart from './cart.js';
import { filter, onFilterChange } from './filter.js';

let products = [];
let isLoading = true;
let page = 1;
const cart = new Cart();





fetch('http://localhost:5000/products?_limit=6',
).then(data => {
    data.json().then((json) => {
        setProducts(json);
    })
});



const updateProducts = () => {
    if(isLoading) return;
    const productsGrid = document.querySelector(".products-grid");
    productsGrid.innerHTML = "";
    filter(products).forEach(product => {
        productsGrid.innerHTML += `
            <div class="product ${product.color}">
                <img src="${product.image}" alt="${product.name}">
                <h3 class="product-title" >${product.name}</h3>
                <p class="price" >R$ ${product.price.toFixed(2).replace(".",",")}</p>
                <span class="installments">até ${product.parcelamento[0]}x de R$${product.parcelamento[1]}</span>
                <button class="button-buy-product" data-product-id="${product.id}" >COMPRAR</button>
            </div>
        `;
    })

    if(filter(products).length === 0){
        productsGrid.innerHTML = `
            <div class="product-not-found">
                <h3>Nenhum produto encontrado</h3>
            </div>
        `;
    }
    const buttons = document.querySelectorAll(".button-buy-product");
    buttons.forEach(button => {
        button.addEventListener("click",() => {
            const id = button.getAttribute("data-product-id");
            const product = products.find(product => product.id == id);
            cart.addItem(product);
        });
    });
};

const setProducts = (data) => {
    products = data;
    updateProducts();
}

onFilterChange(updateProducts);

const loadMore = () => {
    fetch(`http://localhost:5000/products?_limit=6&_page=${++page}`,
    ).then(data => {
        data.json().then((json) => {
            setProducts([...products, ...json]);
        })
    });
}

window.addEventListener("load",() => {
    isLoading = false;
    updateProducts();
    document.querySelector(".button-load-more").addEventListener("click",loadMore);
})