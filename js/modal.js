const modalElem = document.querySelector('#modal-menu');
const tabsSizes = document.querySelector('.tabs.sizes');
const tabsAdditives = document.querySelector('.tabs.additives');
const totalPriceDiv = document.querySelector('.modal-total .total-price');

const closeModal = event => {
    
    const target = event.target;
  
    if ( target === modalElem ||
        ('.modal-close' && target.closest('.modal-close')) ||
        event.code === 'Escape'
    ) {
        
        modalElem.style.opacity = 0;
    
        setTimeout(() => {
            modalElem.style.visibility = 'hidden';
            document.body.classList.remove('ohidden');
        }, 300);
    
        window.removeEventListener('keydown', closeModal);
    }
}
  
const openModal = (e) => {
    e.preventDefault();
    
    document.body.classList.add('ohidden');
    modalElem.style.visibility = 'visible';
    modalElem.style.opacity = 1;
    window.addEventListener('keydown', closeModal)
};

function createSizesHTML(sizesObj) {
    
    let tab;
    tabsSizes.innerHTML = '';
    Object.keys(sizesObj).forEach(function(key) {
        tab = document.createElement('div');

        tab.classList.add('tab');
        if (key == 's') tab.classList.add('active');

        tab.dataset.price = parseFloat(sizesObj[key]['add-price']);

        tab.innerHTML = `<div class="tab-icon">${key.toUpperCase()}</div><div class="tab-title">${sizesObj[key].size}</div>`;

        tabsSizes.append(tab);
    });
}

function createAdditivesHTML(addObj) {
    
    let tab;
    tabsAdditives.innerHTML = '';
    Object.keys(addObj).forEach(function(key) {
        tab = document.createElement('div');

        tab.classList.add('tab');

        tab.dataset.price = parseFloat(addObj[key]['add-price']);

        tab.innerHTML = `<div class="tab-icon">${parseInt(key) + 1}</div><div class="tab-title">${addObj[key].name}</div>`;

        tabsAdditives.append(tab);
    });
}

function changePrice() {
    
    const sizePriceDiv = document.querySelector('.tabs.sizes .active');
    const addTabs = tabsAdditives.querySelectorAll('.tab');
    let addPrice = 0;
    let totalPrice = 0;
        
    for (let i = 0; i < addTabs.length; i++) {
        if (addTabs[i].classList.contains('active')) {
            addPrice += parseFloat(addTabs[i].dataset.price);
        }
    }

    totalPrice = parseFloat(totalPriceDiv.dataset.price) + parseFloat(sizePriceDiv.dataset.price) + addPrice;

    totalPriceDiv.innerHTML = totalPrice.toFixed(2);

}

modalElem.addEventListener('click', closeModal);
  
document.querySelector('.show-products').addEventListener('click', function(event) {

    let productElement = event.target.closest('.menu-product');

    if (productElement && this.contains(productElement)) {
        
        let productObj = data[productElement.dataset.id];

        document.querySelector('.modal-img').src = `img/menu/${productObj.category}/${productObj.img}`;
        document.querySelector('.modal-title').innerHTML = productObj.name;
        document.querySelector('.modal-description').innerHTML = productObj.description;
        totalPriceDiv.innerHTML = productObj.price;
        totalPriceDiv.dataset.price = parseFloat(productObj.price);

        createSizesHTML(productObj.sizes);
        createAdditivesHTML(productObj.additives);

        openModal(event);
    }
});

tabsSizes.addEventListener('click', function(event) {

    let tabSizeElement = event.target.closest('.tab');

    if (tabSizeElement && this.contains(tabSizeElement)) {
        
        const activeTabs = tabsSizes.querySelectorAll('.tab');
        for (let i = 0; i < activeTabs.length; i++) {
            activeTabs[i].classList.remove('active');
        }

        tabSizeElement.classList.add('active');

        changePrice();
    }
});

tabsAdditives.addEventListener('click', function(event) {

    let tabAddElement = event.target.closest('.tab');

    if (tabAddElement && this.contains(tabAddElement)) {
        
        tabAddElement.classList.toggle('active');

        changePrice();
    }
});