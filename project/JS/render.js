function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}
const itemsPerPage = 6
let currentPage = 1
let defaultProducts = products;
function renderProductsPage(page, products) {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const productsToShow = products.slice(start, end);

    const productsContainer = $("#products-container");
    productsContainer.empty();

    $.each(productsToShow, function (index, product) {
        const productCard = `
            <div class="col-md-4 mb-4">
                <div class="card product-card">
                    <div class="image-container">
                        <img src="${product.images[0]}" class="card-img-top" alt="${product.name}">
                        <div class="overlay"></div>
                        <a href="#" class="btn btn-secondary view-details" data-id="${product.id}">Xem chi tiết</a>
                    </div> 
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="price">${product.price.toLocaleString("vi-VN")} đ</p>
                    </div>
                </div>
            </div>`;
        productsContainer.append(productCard);
    });

    updatePagination(products);
}

function updatePagination(products) {
    const totalPages = Math.ceil(products.length / itemsPerPage);
    const paginationContainer = $("#pagination");
    paginationContainer.empty();

    paginationContainer.append(`<button class="page-btn prev" ${currentPage === 1 ? "disabled" : ""}>Previous</button>`);

    for (let i = 1; i <= totalPages; i++) {
        paginationContainer.append(`<button class="page-btn ${i === currentPage ? "active" : ""}" data-page="${i}">${i}</button>`);
    }

    paginationContainer.append(`<button class="page-btn next" ${currentPage === totalPages ? "disabled" : ""}>Next</button>`);
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
    renderProductsPage(currentPage, products);
});

const category = getQueryParam("category");
const type = getQueryParam("type");

function filterProducts(category, type) {
    const filteredProducts = products.filter(product => {
        return product.category === category && (!type || product.type === type);
    });

    if (filteredProducts.length === 0) {
        productsContainer.innerHTML = "<p>Không có sản phẩm nào trong danh mục này.</p>";
        return;
    }
    else {
        return filteredProducts
    }
}

function loadSubPage(category) {
    let subPage;
    if (category === "ao") {
        subPage = "Áo"
    }
    else if (category === "quan") {
        subPage = "Quần"
    }
    else {
        subPage = "Phụ kiện"
    }
    $("#sub").text(subPage)
}

function loadBanner(category) {
    const banner = banners.find(b => b.category === category)
    $(".banner-image").attr("src", banner.img);
    $(".banner-title").text(banner.title)
    $(".banner-desciption").text(banner.description)
}

function loadCategoryList(selectedCategory) {
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
        categoryLink.href = `SanPham.html?category=${category}`;
        categoryLink.textContent = categoryName;
        categoryBlock.appendChild(categoryLink);

        const subCategoryList = document.createElement("ul");
        categoryList[category].forEach(subcategory => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `<a href="SanPham.html?category=${category}&type=${subcategory.type}">${subcategory.name}</a>`;
            subCategoryList.appendChild(listItem);
        });

        categoryBlock.appendChild(subCategoryList);
        categoryListContainer.appendChild(categoryBlock);
    });
}

function loadFilterCategoryList(selectedCategory) {
    // Lấy các phần tử trong div.filter-dropdown (mobile)
    const filterCategoryTitle = document.getElementById("filter-category-title");
    const filterCategoryListContainer = document.getElementById("filter-category-list");

    // Cập nhật tiêu đề và xóa nội dung cũ
    if (filterCategoryTitle) filterCategoryTitle.textContent = "Bộ sưu tập";
    if (filterCategoryListContainer) filterCategoryListContainer.innerHTML = "";

    // Tạo danh sách danh mục
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
        categoryLink.href = `SanPham.html?category=${category}`;
        categoryLink.textContent = categoryName;
        categoryBlock.appendChild(categoryLink);

        const subCategoryList = document.createElement("ul");
        categoryList[category].forEach(subcategory => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `<a href="SanPham.html?category=${category}&type=${subcategory.type}">${subcategory.name}</a>`;
            subCategoryList.appendChild(listItem);
        });

        categoryBlock.appendChild(subCategoryList);
        if (filterCategoryListContainer) filterCategoryListContainer.appendChild(categoryBlock);
    });
}

////////////////////////////////////////
$(document).ready(function () {
    onChange();

    $(document).on("click", ".dropdown-item", function (event) {
        event.preventDefault();

        const category = $(this).closest(".dropdown").find(".category-parent").data("category");
        const subcategory = $(this).data("subcategory");

        const newUrl = `SanPham.html?category=${category}${subcategory ? `&type=${subcategory}` : ""}`;
        window.history.pushState({}, "", newUrl);

        renderProductsPage(1, filterProducts(category, subcategory));
    });
    $(document).on("click", ".view-details", function (event) {
        event.preventDefault();
        let productId = $(this).data("id");
        localStorage.setItem("id", productId)
        window.location.href = `./ChiTietSanPham.html?id=${productId}`;
    });

});

function toggleFilter() {
    const dropdown = document.getElementById('filter-dropdown');
    dropdown.classList.toggle('active');
}

// Đóng dropdown khi nhấn ra ngoài
document.addEventListener('click', function(event) {
    const dropdown = document.getElementById('filter-dropdown');
    const filterBtn = document.querySelector('.filter-btn');
    if (!dropdown.contains(event.target) && !filterBtn.contains(event.target)) {
        dropdown.classList.remove('active');
    }
});

function onChange() {
    const category = getQueryParam("category");
    const type = getQueryParam("type");
    loadSubPage(category);
    loadBanner(category);
    loadCategoryList(category);
    console.log("Calling loadFilterCategoryList with category:", category);
    loadFilterCategoryList(category);
    renderProductsPage(1, filterProducts(category, type));
}