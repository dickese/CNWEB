function renderProductDetail(product) {
    if (product) {
        $("#product-image").attr("src", product.images[0]);
        $("#product-title").text(product.name);
        $("#product-price").text(product.price.toLocaleString("vi-VN") + " đ");
        $("#product-description").text(product.description);

        const colorContainer = $("#product-color");
        colorContainer.text(product.colors.join(", "));

        const sizeContainer = $("#size-options");
        sizeContainer.empty();
        product.sizes.forEach(size => {
            sizeContainer.append(`<button class="btn border border-infor" style="margin-right: 5px">${size}</button>`);
        });
    }
    renderRelatedProducts(product);
}

function renderRelatedProducts(product) {
    const relatedProductsContainer = $("#related-products");
    relatedProductsContainer.empty();
    const related = products.filter(p => p.category === product.category && p.id !== product.id);
    related.forEach(relProduct => {
        const productCard = `
            <div class="col-md-4 mb-4">
                <div class="card product-card">
                    <div class="image-container">
                        <img src="${product.images[0]}" class="card-img-top" alt="${product.name}">
                        <div class="overlay"></div>
                        <a href="#" class="btn btn-primary view-details" data-id="${product.id}">Xem chi tiết</a>
                    </div> 
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="price">${product.price.toLocaleString("vi-VN")} đ</p>
                    </div>
                </div>
            </div>`;
        relatedProductsContainer.append(productCard);
    });
}

 $(document).ready(function () {
    const productId = localStorage.getItem("id")
    const product = products.find(p => p.id === productId)
    console.log(product)
    renderProductDetail(product);
});