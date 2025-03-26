function renderProductDetail(product) {
    if (product) {
        $("#product-image").attr("src", product.images[0]);
        $("#sub-img1").attr("src", product.images[0]);
        $("#sub-img2").attr("src", product.images[1]);
        $("#sub-img3").attr("src", product.images[2]);
        $("#product-title").text(product.name + ' - ' + product.id);
        $("#product-price").text(product.price.toLocaleString("vi-VN") + " đ");
        $("#product-description").text(product.description);

        const colorContainer = $("#product-color");
        colorContainer.text(product.colors.join(", "));

        const sizeContainer = $("#size-options");
        sizeContainer.empty();
        /*product.sizes.forEach(size => {
            sizeContainer.append(`<button class="btn border border-infor" style="margin-right: 5px">${size}</button>`);
        });*/
        product.sizes.forEach(size => {
            sizeContainer.append(
                `<button class="btn border border-infor size-button" style="margin-right: 5px" data-size="${size}">
                    ${size}
                 </button>`
            );
        });
    }
    renderRelatedProducts(product);
}
let selectedSize = ""; // Lưu trữ size được chọn

$(document).on("click", ".size-button", function () {
    $(".size-button").removeClass("selected"); // Bỏ chọn size cũ
    $(this).addClass("selected"); // Đánh dấu size mới được chọn
    selectedSize = $(this).data("size"); // Lấy giá trị size
});

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
    $(document).on("mouseenter", ".sub-img", function () {
        const newSrc = $(this).attr("src");
        $("#product-image").attr("src", newSrc);
    });
     $(document).on("mousemove", "#product-image", function (e) {
    const image = $(this);
    const offsetX = e.offsetX; 
    const offsetY = e.offsetY; 
    const width = image.width();
    const height = image.height();

    const posX = (offsetX / width) * 100; 
    const posY = (offsetY / height) * 100;

    image.css({
        "transform-origin": `${posX}% ${posY}%`, 
        "transform": "scale(2)",
    });
});

    $(document).on("mouseleave", "#product-image", function () {
    $(this).css({
        "transform": "scale(1)", 
        "transform-origin": "center center", 
    });
});
});