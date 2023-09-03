import "/src/main.scss";
import "/src/components/product-card.scss";

const productList = document.querySelector("procuct-card");
if (productList.length < 6) {
    for (let i = 0; i < productList.length; i++) {
        console.log(`Processing product card ${i + 1}`);
    }
} else {
    console.log("No product cards found");
}