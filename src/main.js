import "/src/scss/main.scss";
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { appendProduct, fetchProducts, fetchFilter, fetchArticle, } from "./js/product-handler";

const main = async () => {
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

    const navMenu = document.querySelector(".burger-menu");
    if (navMenu) {
        const navLinks = document.querySelector(".navigation");
        navMenu.addEventListener("click", () => {
            navLinks.classList.toggle("open-menu");
        });
    };
    const request1 = 'https://random-data-api.com/api/v2/beers?size=8';
    const request2 = 'https://random-data-api.com/api/v2/beers?size=4';

    const productCard = document.querySelector(".product-card");
    const productElement = document.querySelector(".product");

    let productsMain = document.querySelector(".products-wrapper .product-card");
    let count = 0;
    productsMain = await fetchProducts(productCard, productElement, count, request1);

    const loadMoreButton = document.querySelector(".products-wrapper .load-more");
    if (loadMoreButton) {
        loadMoreButton.addEventListener("click", async () => {
            count = await fetchProducts(productCard, productElement, count, request1);
            const newProducts = document.querySelectorAll(".products-wrapper .product");
            sortProductElements = [...sortProductElements, ...newProducts];
            filterProducts();
        });
    }

    let featuredProductCard = document.querySelector(".most-popular .product-card");
    count = 100;
    count = await fetchProducts(featuredProductCard, productElement, count, request2);

    let popularProductCard = document.querySelector(".featured .product-card");
    count = 1000;
    count = await fetchProducts(popularProductCard, productElement, count, request2);



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

    const articleElement = document.querySelector(".article");
    const articleWrap = document.querySelector(".blog");
    await fetchArticle(articleElement, articleWrap);

}
main();


function accordianLogic() {
    const menuButtons = document.querySelectorAll(".footer-menu");
    const accordionTexts = document.querySelectorAll(".footer-text");
    if (menuButtons.length && accordionTexts.length) {
        menuButtons.forEach((button, index) => {
            button.addEventListener("click", () => {
                const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
                if (viewportWidth <= 1200) {
                    accordionTexts[index].classList.toggle("open-footer");
                    if (accordionTexts[index].classList.contains("open-footer")) {
                        accordionTexts[index].style.maxHeight = accordionTexts[index].scrollHeight + "px";
                    } else {
                        accordionTexts[index].style.maxHeight = 0;
                    }
                }
            });
        });
    };
};
accordianLogic();
