import "/src/scss/main.scss";
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { appendProduct, fetchProducts, fetchFilter } from "./js/product-handler";

const swiper = new Swiper('.swiper', {
    modules: [Navigation, Pagination, Autoplay],
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    },

    pagination: {
        el: '.swiper-pagination',
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

});



const request1 = 'https://random-data-api.com/api/v2/beers?size=8';
const request2 = 'https://random-data-api.com/api/v2/beers?size=5';

const productCard = document.querySelector(".product-card");
const productElement = document.querySelector(".product");

let productsMain = document.querySelector(".products-wrapper .product-card");
let countMain = 0;
productsMain = await fetchProducts(productCard, productElement, countMain, request1);

const loadMoreButton = document.querySelector(".products-wrapper .load-more");
if (loadMoreButton) {
    loadMoreButton.addEventListener("click", async () => {
        countMain = await fetchProducts(productCard, productElement, countMain, request1);
        const newProducts = document.querySelectorAll(".product");
        sortProductElements = [...sortProductElements, ...newProducts];
        filterProducts();
    });
}

let featuredProductCard = document.querySelector(".most-popular .product-card");
let count2 = 100;
count2 = await fetchProducts(featuredProductCard, productElement, count2, request2);

let popularProductCard = document.querySelector(".featured .product-card");
let count3 = 1000;
count3 = await fetchProducts(popularProductCard, productElement, count3, request2);



const filterWrap = document.querySelector(".filters-wrap");
const filterElement = document.querySelector(".filters");
await fetchFilter(filterElement, filterWrap);

let sortProductElements = document.querySelectorAll(".products-wrapper .product");
const filterChecks = document.querySelectorAll(".filters input");
const selectedFilters = [];

filterChecks.forEach((filterCheck) => {
    filterCheck.addEventListener("change", (event) => {

        if (event.target.checked) {
            selectedFilters.push(filterCheck.value.toLowerCase());
        } else {
            var index = selectedFilters.indexOf(filterCheck.value.toLowerCase());
            if (index !== -1) {
                selectedFilters.splice(index, 1);
            }
        }
        filterProducts();
    });
});
function filterProducts() {
    sortProductElements.forEach((productElement) => {
        const productBrandElement = productElement.querySelector(".brand").innerText;
        if (!selectedFilters.length || selectedFilters.includes(productBrandElement.toLowerCase())) {
            productElement.style.display = '';
        }
        else {
            productElement.style.display = 'none';
        }
    });
}