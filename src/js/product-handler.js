export const appendProduct = (productElement, productCard, productImage, brand, name, price) => {
    const clonedProductElement = productElement.cloneNode(true);
    clonedProductElement.querySelector(".product-image").src = productImage;
    clonedProductElement.querySelector(".brand").innerText = brand;
    clonedProductElement.querySelector(".name").innerText = name;
    clonedProductElement.querySelector(".price").innerText = price;
    productCard.appendChild(clonedProductElement);
}

export const fetchProducts = async (productCard, productElement, count, productUrl) => {
    const productHide = productCard.querySelector(".product-card");
    if (productHide) {
        productHide.remove();
    }
    await fetch(productUrl, {
        method: "GET"
    })
        .then(response => response.json())
        .then(data => {
            if (productCard && productElement) {
                data.forEach((element, index) => {
                    const productImage = `https://picsum.photos/344/450/?v=${count}`;
                    appendProduct(productElement, productCard, productImage, element.brand, element.name, element.ibu)
                    count++;
                });
            }
        })
    return count;
}

const uniqueBrands = new Set();
const appendFilter = (filterElement, filterWrap, brand,) => {
    const clonedFilterElement = filterElement.cloneNode(true);
    clonedFilterElement.querySelector(".filters label").innerText = brand;
    clonedFilterElement.querySelector(".filters input").setAttribute("value", brand);
    clonedFilterElement.querySelector(".filters input").setAttribute("id", brand);
    clonedFilterElement.querySelector(".filters label").setAttribute("for", brand);
    filterWrap.appendChild(clonedFilterElement);
}
export const fetchFilter = async (filterElement, filterWrap) => {
    filterElement = filterWrap.removeChild(filterElement);
    await fetch("https://random-data-api.com/api/v2/beers?size=15", {
        method: "GET"
    })
        .then(response => response.json())
        .then(data => {
            if (filterElement && filterWrap) {
                data.forEach(beer => {
                    if (!uniqueBrands.has(beer.brand)) {
                        appendFilter(filterElement, filterWrap, beer.brand);
                        uniqueBrands.add(beer.brand);
                    }
                });
            }
        });
}


export const appendArticle = (articleElement, articleWrap, user, body, email,) => {
    const clonedArticleElement = articleElement.cloneNode(true);
    clonedArticleElement.querySelector(".article-heading").innerText = user;
    clonedArticleElement.querySelector(".article-text").innerText = body;
    clonedArticleElement.querySelector(".article-credits").innerText = email;
    articleWrap.appendChild(clonedArticleElement);
};
export const fetchArticle = async (articleElement, articleWrap) => {

    const articleHide = articleWrap.querySelector(".article");
    if (articleHide) {
        articleHide.remove();
    }

    await fetch(`https://jsonplaceholder.typicode.com/comments`, {
        method: "GET"
    })
        .then((response) => response.json())
        .then(comments => {
            if (articleElement && articleWrap) {
                const randomComments = shuffleComments(comments);
                randomComments.forEach((comment) => {
                    appendArticle(articleElement, articleWrap, comment.name, comment.body, comment.email);
                });
            }
        });
}
function shuffleComments(comments) {
    const shuffled = comments.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4);
}