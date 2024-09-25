const menuProducts = document.querySelector('.menu-products');
const tabs = document.querySelectorAll('.menu-tabs .tabs .tab');
const menuRefresh = document.querySelector('.menu-refresh');

let menuObj = getDataByCategory('coffee');
let total = (document.documentElement.scrollWidth > 1199) ? 8 : 4;
let page = 1;


function getTotalPages() {
    return (total > 0) ? Object.keys(menuObj).length / total : 1;
}

function showHideRefreshButton() {
    const totalPages = getTotalPages();
    if (page < totalPages) {
        menuRefresh.classList.remove('dnone');
    }
    else {
        if (!menuRefresh.classList.contains('dnone')) {
            menuRefresh.classList.add('dnone');
        }
    }
}

function getDataByCategory(category) {
    return Object.fromEntries(
        Object.entries(data).filter(([key, value]) => value.category == category)
    );
}

function createDataHTML() {
    let div;
    let offset = total * page - total;
    let i = offset;
    let endProduct = i + total;
    
    Object.keys(menuObj).forEach(function(key) {
        
        if (i >= offset && i < endProduct) {

            div = document.createElement('div');
            div.classList.add('menu-product');
            div.dataset.id = key;
            div.innerHTML = `<div class="product-image">
                            <img src="img/menu/${menuObj[key].category}/${menuObj[key].img}" alt="">
                        </div>
                        <div class="product-info">
                            <div class="product-wrapper">
                                <div class="product-title">${menuObj[key].name}</div>
                                <div class="product-description">
                                ${menuObj[key].description}
                                </div>
                            </div>
                            <div class="product-price">$${menuObj[key].price}</div>
                        </div>`;
            menuProducts.append(div);
            
        }
        i++;
        
    });

}

function removeActiveTabClass() {
	for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('active');
    }
}

function resizeWindow() {
    let newTotal;

	if (document.documentElement.scrollWidth > 1199) {
		newTotal = 8;
	}
    else {
		newTotal = 4;
	}

    if (newTotal !== total) {
        total = newTotal;
        page = 1;
        menuProducts.innerHTML = '';
        createDataHTML();
        showHideRefreshButton();
    }

    
}

window.addEventListener("resize", () => {
	resizeWindow();
});

tabs.forEach(tab => {
    tab.addEventListener('click', function () {
        page = 1;
        removeActiveTabClass();
        this.classList.add('active');
        menuObj = getDataByCategory(this.dataset.category);
        menuProducts.innerHTML = '';
        createDataHTML();
        showHideRefreshButton();
    });
});

menuRefresh.addEventListener('click', function () {
    page++;
    createDataHTML();
    showHideRefreshButton();
});

createDataHTML();
showHideRefreshButton();