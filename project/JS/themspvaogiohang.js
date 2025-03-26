// Lấy ID sản phẩm từ URL (query string)
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

// Tìm sản phẩm trong mảng `products` từ data.js
const product = products.find((p) => p.id === productId);

// Xử lý giỏ hàng (sử dụng localStorage)
function addToCart() {
    if (!product) {
        alert("Sản phẩm không tồn tại!");
        return;
    }

    if (!selectedSize && product.sizes && product.sizes.length > 0) {
        alert("Vui lòng chọn kích thước trước khi thêm vào giỏ hàng!");
        return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Tạo object sản phẩm thêm vào giỏ hàng
    const productInCart = {
        id: product.id,
        name: product.name,
        price: product.price,
        size: selectedSize || "Mặc định",
        quantity: 1,
        image: product.images[0],
        color: product.colors[0],
    };

    // Kiểm tra nếu sản phẩm đã tồn tại (cùng ID và size)
    const existingProductIndex = cart.findIndex((item) => item.id === product.id && item.size === productInCart.size);
    if (existingProductIndex >= 0) {
        cart[existingProductIndex].quantity += 1; // Tăng số lượng nếu sản phẩm đã có trong giỏ
    } else {
        cart.push(productInCart); // Thêm sản phẩm mới nếu chưa có
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Sản phẩm đã được thêm vào giỏ hàng!");
}

document.querySelector(".btn-add-to-cart").addEventListener("click", addToCart);