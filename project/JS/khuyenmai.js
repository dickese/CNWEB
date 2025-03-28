
function addDiscount(product) {
    const originalPrice = product.price;
    const discountPercent = product.discount; 
    const discountedPrice = originalPrice * (1 - discountPercent / 100);

    return `
    <div>
        <p class="original-price" style="text-decoration: line-through; color: gray; display:inline">
            ${originalPrice.toLocaleString("vi-VN")} đ
        </p>
        <p class="discounted-price" style="color:rgb(63, 62, 62);font-weight: bold; display:inline; margin-left:10px">
            ${discountedPrice.toLocaleString("vi-VN")} đ
        </p>
    </div>
        <span class="btn discount-percent" style="background-color: #caaf6e; font-size:16px; color:white;font-weight: bold; padding:0 10px">
            ${discountPercent}%
        </span>
    `;
}
function loadCategoryList2(selectedCategory) {
    const categoryTitle = document.getElementById("category-title");
    const categoryListContainer = document.getElementById("category-list");

    categoryTitle.textContent = "Bộ sưu tập";
    categoryListContainer.innerHTML = "";

    Object.keys(categoryList).forEach(category => {
        const categoryBlock = document.createElement("div");
        categoryBlock.classList.add("category-block");
        categoryBlock.setAttribute("data-category", category);

        if (category === selectedCategory) {
            categoryBlock.classList.add("active");
        }

        const categoryName = category === "ao" ? "Áo" : category === "quan" ? "Quần" : "Phụ kiện";
        const categoryLink = document.createElement("a");
        categoryLink.classList.add("category-link");
        categoryLink.href = `Khuyenmai.html?category=${category}`;
        categoryLink.textContent = categoryName;
        categoryBlock.appendChild(categoryLink);

        const subCategoryList = document.createElement("ul");
        categoryList[category].forEach(subcategory => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `<a href="Khuyenmai.html?category=${category}&type=${subcategory.type}">${subcategory.name}</a>`;
            subCategoryList.appendChild(listItem);
        });

        categoryBlock.appendChild(subCategoryList);
        categoryListContainer.appendChild(categoryBlock);
    });
}
$(document).ready(function () {
    loadCategoryList2(null);
    const discountedProducts = products.filter(product => product.discount && product.discount > 0);

    if (discountedProducts.length === 0) {
        $("#products-container").html("<p>Không có sản phẩm khuyến mãi nào.</p>");
    } else {
        const productsContainer = $("#products-container");
        productsContainer.empty();

        discountedProducts.forEach(product => {
            const productCard = `
                <div class="col-md-4 mb-4">
                    <div class="card product-card">
                        <div class="image-container">
                            <img src="${product.images[0]}" class="card-img-top" alt="${product.name}">
                            <div class="overlay"></div>
                            <a href="#" class="btn btn-secondary view-details" data-id="${product.id}">Xem chi tiết</a>
                        </div> 
                        <div class="card-body">
                            <h5 class="card-title">${product.name} ${addDiscount(product)}</h5>
                        </div>
                    </div>
                </div>`;
            productsContainer.append(productCard);
        });
    }

    $(document).on("click", ".page-btn", function () {
        const page = $(this).data("page");
        if (page) {
            currentPage = page;
        } else if ($(this).hasClass("prev")) {
            currentPage = Math.max(1, currentPage - 1);
        } else if ($(this).hasClass("next")) {
            currentPage = Math.min(totalPages, currentPage + 1);
        }
        renderProductsPage(currentPage, discountedProducts);
    });

    $(document).on("click", ".view-details", function (event) {
        event.preventDefault();
        const productId = $(this).data("id");
        localStorage.setItem("id", productId);
        window.location.href = `./ChiTietSanPham.html?id=${productId}`;
    });
});