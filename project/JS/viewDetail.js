function renderProductDetail(product) {
    if (product) {
        $("#product-image").attr("src", product.images[0] || "../IMG/default.jpg");
        $("#sub-img1").attr("src", product.images[0] || "../IMG/default.jpg");
        $("#sub-img2").attr("src", product.images[1] || product.images[0] || "../IMG/default.jpg");
        $("#sub-img3").attr("src", product.images[2] || product.images[0] || "../IMG/default.jpg");
        $("#product-title").text(product.name + " - " + product.id);
        $("#product-price").text(product.price.toLocaleString("vi-VN") + " đ");
        $("#product-description").text(product.description);

        const colorContainer = $("#product-color");
        colorContainer.text(product.colors ? product.colors.join(", ") : "Không xác định");

        const sizeContainer = $("#size-options");
        sizeContainer.empty();
        product.sizes.forEach(size => {
            sizeContainer.append(
                `<button class="btn border border-infor size-button" style="margin-right: 5px" data-size="${size}">
                    ${size}
                </button>`
            );
        });

        // Cập nhật breadcrumb
        const subBreadcrumb = $("#sub");
        const categoryName =
            product.category === "ao" ? "Áo" : product.category === "quan" ? "Quần" : "Phụ kiện";
        subBreadcrumb.text(categoryName);
    }
    renderRelatedProducts(product);
}

function renderRelatedProducts(product) {
    const relatedProductsContainer = $("#related-products");
    relatedProductsContainer.empty();

    if (!product) return;

    const related = products.filter(p => p.category === product.category && p.id !== product.id);
    related.slice(0, 3).forEach(relProduct => {
        const productCard = `
            <div class="col-md-4 mb-4">
                <div class="card product-card">
                    <div class="image-container">
                        <img src="${relProduct.images[0]}" class="card-img-top" alt="${relProduct.name}">
                        <div class="overlay"></div>
                        <a href="#" class="btn btn-primary view-details" data-id="${relProduct.id}">Xem chi tiết</a>
                    </div> 
                    <div class="card-body">
                        <h5 class="card-title">${relProduct.name}</h5>
                        <p class="price">${relProduct.price.toLocaleString("vi-VN")} đ</p>
                    </div>
                </div>
            </div>`;
        relatedProductsContainer.append(productCard);
    });
}

$(document).ready(function () {
    // Khởi tạo window.selectedSize nếu chưa có
    if (!window.selectedSize) {
        window.selectedSize = "";
    }

    // Lấy ID sản phẩm từ URL
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id") || localStorage.getItem("id");
    const product = products.find(p => p.id === productId);

    if (product) {
        renderProductDetail(product);
    } else {
        console.error("Không tìm thấy sản phẩm với ID:", productId);
    }

    // Xử lý chọn kích thước
    $(document).on("click", ".size-button", function () {
        $(".size-button").removeClass("selected");
        $(this).addClass("selected");
        window.selectedSize = $(this).data("size");
        console.log("Selected size:", window.selectedSize); // Debug để kiểm tra
    });

    // Xử lý hover ảnh phụ
    $(document).on("mouseenter", ".sub-img", function () {
        const newSrc = $(this).attr("src");
        $("#product-image").attr("src", newSrc);
    });

    // Xử lý phóng to ảnh
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

    // Xử lý nhấp vào "Xem chi tiết" trong sản phẩm liên quan
    $(document).on("click", ".view-details", function (event) {
        event.preventDefault();
        const productId = $(this).data("id");
        localStorage.setItem("id", productId);
        window.location.href = `./ChiTietSanPham.html?id=${productId}`;
    });
});