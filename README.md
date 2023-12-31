# Crisp
## Project Overview
Crisp is an e-commerce theme website, that uses randomAPI "beers" to fetch the necessary data for the product page.
## Technology Stack
### Frontend:
* HTML
* SCSS
* JavaScript
* Twig
### Libraries
    Swiper.js: Modern JavaScript slider library. 
### Build Tools:
* Vite
## Challenges & Solutions

### Filtering system
Within this project, I faced many challenges toughest of which being the filtration system, that filters products based on their corresponding brands, to overcome this, I had to do some creative thinking:

* Firstly, I made a Fetch request to retrieve only the brands.
* Then, I cloned the retrieved data and added them to their corresponding div elements.
* I also limited the fetch request to only 15 brands, to not oversaturate the filter.
* After the data was retrieved, I had to compare the data to the fetched product data, so I isolated the brands and compared them.
* I also used a Set to store unique brand data so that the brand wouldn't repeat more than once in the filter.
* After the data was compared, and if the selected filter was the same as it is in the product, I then hid the rest of the products.
* After creating the filter and making it function, I ran into another problem, which was that the filter only worked on the originally fetched data. I had a 'load more' button which fetched new data, but the filter didn't recognize this data. To resolve this issue, I created an array that stored both the originally fetched data and the newly added data. I then compared the data in the array to the filter brand data.

### Accordion Menu
Another challenge was creating an accordion menu, specifically determining the correct height of each menu. I aimed to achieve this without using a fixed height to avoid potential issues in the future, such as cutting off content if the menu grows due to additional data.

* I opted not to use "overflow:scroll" as I considered it less user-friendly and instead sought to challenge myself. I addressed this issue with a single line of code that calculates the scroll height of the corresponding menu in pixels and then applies it to the menu itself (`accordionTexts[index].scrollHeight + "px"`).

* The next challenge with the menu was to make it exclusively functional on mobile devices. On desktop, the menu should remain fully visible at all times. To accomplish this, I implemented a simple if statement that checks the viewport width. If the viewport size indicates a mobile device, the code executes, otherwise, the height of each menu remains at 100%.

### Async functions
Throughout the creation of this project, I realized that a considerable amount of data was being retrieved, which could potentially lead to issues on the user end. For instance, data loading separately and at varied speeds might result in the website not functioning properly. To address this, I used async functions. These functions fetched data simultaneously for a more efficient outcome.

## Collaborations with Senior Developer
Throughout the development process, I regularly engaged in discussions and sought guidance from a senior developer. These interactions involved sharing my proposed solutions to a problem and obtaining feedback on better optimizations and different approaches to handling the problem in multiple ways.
The feedback received significantly contributed to my ability to handle one problem in multiple ways and to recognize if the code can be written more efficiently.