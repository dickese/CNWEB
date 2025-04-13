document.addEventListener("DOMContentLoaded", function () {
    // Lấy các phần tử DOM
    const addToCartBtn = document.querySelector(".btn-add-to-cart");
    const successModal = document.getElementById("successModal");
    const errorModal = document.getElementById("errorModal");
    const closeSuccessModalBtn = document.getElementById("closeSuccessModalBtn");
    const closeErrorModalBtn = document.getElementById("closeErrorModalBtn");

    // Kiểm tra sự tồn tại của các phần tử
    if (!addToCartBtn || !successModal || !errorModal || !closeSuccessModalBtn || !closeErrorModalBtn) {
        console.error("Không tìm thấy một hoặc nhiều phần tử DOM cần thiết trong themspvaogiohang.js!");
        return;
    }

    // Khởi tạo window.selectedSize nếu chưa có
    if (!window.selectedSize) {
        window.selectedSize = "";
    }

    // Hàm đóng modal
    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) modal.style.display = "none";
    }

    // Gắn sự kiện đóng modal
    successModal.querySelector(".close").addEventListener("click", () => closeModal("successModal"));
    closeSuccessModalBtn.addEventListener("click", () => closeModal("successModal"));
    errorModal.querySelector(".close").addEventListener("click", () => closeModal("errorModal"));
    closeErrorModalBtn.addEventListener("click", () => closeModal("errorModal"));

    // Lấy thông tin sản phẩm
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");
    const product = products.find((p) => p.id === productId);

    // Debug: Kiểm tra productId và product
    console.log("Product ID from URL:", productId);
    console.log("Product found:", product);

    // Hàm thêm vào giỏ hàng
    function addToCart() {
        // Kiểm tra đăng nhập
        const loggedInUser = localStorage.getItem("loggedInUser");
        if (!loggedInUser) {
            alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!");
            window.location.href = "Dangnhap.html";
            return;
        }

        // Kiểm tra sản phẩm
        if (!product) {
            alert("Sản phẩm không tồn tại!");
            console.error("Product not found for ID:", productId);
            return;
        }

        // Kiểm tra kích thước
        console.log("Current selected size:", window.selectedSize);
        if (!window.selectedSize && product.sizes && product.sizes.length > 0) {
            document.getElementById("errorMessage").innerHTML = "Vui lòng chọn kích thước!";
            errorModal.style.display = "flex";
            return;
        }

        // Tạo key riêng cho giỏ hàng của người dùng
        const cartKey = `cart_${loggedInUser}`; // Ví dụ: "cart_admin" cho user "admin"
        console.log("Cart key:", cartKey);

        // Lấy giỏ hàng từ localStorage (riêng cho người dùng)
        let cart = JSON.parse(localStorage.getItem(cartKey)) || [];
        console.log("Current cart before adding:", cart);

        // Tạo đối tượng sản phẩm
        const productInCart = {
            id: product.id,
            name: product.name,
            price: ((product.discount ? product.price * (1 - product.discount / 100) : product.price).toLocaleString("vi-VN") + " đ"),
            actualPrice: product.discount ? product.price * (1 - product.discount / 100) : product.price,
            size: window.selectedSize || "Mặc định",
            quantity: 1,
            image: product.images ? product.images[0] : "../IMG/default.jpg",
            color: product.colors ? product.colors[0] : "Không xác định",
        };

        // Kiểm tra sản phẩm đã có trong giỏ hàng chưa
        const existingProductIndex = cart.findIndex(
            (item) => item.id === product.id && item.size === productInCart.size
        );
        if (existingProductIndex >= 0) {
            cart[existingProductIndex].quantity += 1;
        } else {
            cart.push(productInCart);
        }

        // Lưu giỏ hàng (riêng cho người dùng)
        try {
            localStorage.setItem(cartKey, JSON.stringify(cart));
            console.log("Cart after adding:", JSON.parse(localStorage.getItem(cartKey)));
        } catch (error) {
            console.error("Lỗi khi lưu giỏ hàng vào localStorage:", error);
            alert("Có lỗi xảy ra khi lưu giỏ hàng. Vui lòng thử lại!");
            return;
        }

        // Hiển thị modal thành công
        successModal.style.display = "flex";
    }

    // Gắn sự kiện cho nút "Thêm vào giỏ hàng"
    addToCartBtn.addEventListener("click", addToCart);
});