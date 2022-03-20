export default function Cart(){
    this.items = JSON.parse(localStorage.getItem('cart')) || [];


    this.addItem = function(product){
        this.items.push(product);
        localStorage.setItem('cart', JSON.stringify(this.items));
        this.updateCounter();
    }
    
    this.updateCounter = function(){
        const bagCount = document.querySelector(".bag-count");
        bagCount.innerHTML = this.items.length;
        if(this.items.length > 0){
            bagCount.classList.add("show");
        }
        else{
            bagCount.classList.remove("show");
        }

    }

    this.removeItem = function(product){
        this.items.splice(this.items.indexOf(product), 1);
        localStorage.setItem('cart', JSON.stringify(this.items));
        this.updateCounter();
    }

    this.getItems = function(){
        return this.items;
    }

    this.getItemsCount = function(){
        return this.items.length;
    }

    this.updateCounter();
}