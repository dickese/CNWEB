const accounts = [
    {
        "username": "admin",
        "password" :"123456"
    },
    {
        "username": "sa",
        "password" :"sapassword"
    }
]

const products = [
  {
    id: "AR250118NT",
    name: "Áo Sơ Mi Nam Trắng",
    price: 599000, 
    description: "Áo sơ mi trắng tay dài, chất liệu cao cấp, phù hợp với nhiều hoàn cảnh.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Trắng"],
    material: "Cotton cao cấp",
    category: "ao",
    images: [
      "../IMG/ao/aoTrang/a1.webp"
    ],
    stock: 25,
    rating: 4.8,
    reviews: 152,
    type: "ao-thun"
  },
  {
    id: "AR250120BL",
    name: "Áo Sơ Mi Nam Xanh Biển",
    price: 629000,
    description: "Áo sơ mi xanh biển, thiết kế trẻ trung, phong cách hiện đại.",
    sizes: ["M", "L", "XL"],
    colors: ["Xanh Biển"],
    material: "Linen pha Cotton",
     category: "quan",
    images: [
      "../IMG/quan/dsc08155-2.webp"
    ],
    stock: 18,
    rating: 4.7,
    reviews: 98,
    type: "quan-jean"
  },
      {
    id: "AR250120BL",
    name: "Áo Sơ Mi Nam Xanh Biển",
    price: 629000,
    description: "Áo sơ mi xanh biển, thiết kế trẻ trung, phong cách hiện đại.",
    sizes: ["M", "L", "XL"],
    colors: ["Xanh Biển"],
    material: "Linen pha Cotton",
     category: "ao",
    images: [
      "../IMG/ao/aoTrang/a2.webp"
    ],
    stock: 18,
    rating: 4.7,
    reviews: 98,
    type: "ao-khoac"
  },
      {
    id: "AR250120BL",
    name: "Áo Sơ Mi Nam Xanh Biển",
    price: 629000,
    description: "Áo sơ mi xanh biển, thiết kế trẻ trung, phong cách hiện đại.",
    sizes: ["M", "L", "XL"],
    colors: ["Xanh Biển"],
    material: "Linen pha Cotton",
     category: "ao",
    images: [
      "../IMG/ao/aoTrang/a2.webp"
    ],
    stock: 18,
    rating: 4.7,
    reviews: 98,
    type: "ao-so-mi"
  },
        {
    id: "AR250120BL",
    name: "Áo Sơ Mi Nam Xanh Biển",
    price: 629000,
    description: "Áo sơ mi xanh biển, thiết kế trẻ trung, phong cách hiện đại.",
    sizes: ["M", "L", "XL"],
    colors: ["Xanh Biển"],
    material: "Linen pha Cotton",
     category: "quan",
    images: [
      "../IMG/quan/qjr241251._1.webp"
    ],
    stock: 18,
    rating: 4.7,
    reviews: 98,
    type: "quan-short"
  },
        {
    id: "AR250120BL",
    name: "Áo Sơ Mi Nam Xanh Biển",
    price: 629000,
    description: "Áo sơ mi xanh biển, thiết kế trẻ trung, phong cách hiện đại.",
    sizes: ["M", "L", "XL"],
    colors: ["Xanh Biển"],
    material: "Linen pha Cotton",
     category: "quan",
    images: [
      "../IMG/quan/qjr241252._1-2.webp"
    ],
    stock: 18,
    rating: 4.7,
    reviews: 98,
    type: "quan-au"
  },
        {
    id: "AR250120BL",
    name: "Áo Sơ Mi Nam Xanh Biển",
    price: 629000,
    description: "Áo sơ mi xanh biển, thiết kế trẻ trung, phong cách hiện đại.",
    sizes: ["M", "L", "XL"],
    colors: ["Xanh Biển"],
    material: "Linen pha Cotton",
     category: "A",
    images: [
      "../IMG/ao/aoTrang/a2.webp"
    ],
    stock: 18,
    rating: 4.7,
    reviews: 98,
    type: "3"
  },
        {
    id: "AR250120BL",
    name: "Áo Sơ Mi Nam Xanh Biển",
    price: 629000,
    description: "Áo sơ mi xanh biển, thiết kế trẻ trung, phong cách hiện đại.",
    sizes: ["M", "L", "XL"],
    colors: ["Xanh Biển"],
    material: "Linen pha Cotton",
     category: "A",
    images: [
      "../IMG/ao/aoTrang/a2.webp"
    ],
    stock: 18,
    rating: 4.7,
    reviews: 98,
    type: "2"
  },
        {
    id: "AR250120BL",
    name: "Áo Sơ Mi Nam Xanh Biển",
    price: 629000,
    description: "Áo sơ mi xanh biển, thiết kế trẻ trung, phong cách hiện đại.",
    sizes: ["M", "L", "XL"],
    colors: ["Xanh Biển"],
    material: "Linen pha Cotton",
     category: "A",
    images: [
      "../IMG/ao/aoTrang/a2.webp"
    ],
    stock: 18,
    rating: 4.7,
    reviews: 98,
    type: "4"
  },
        {
    id: "AR250120BL",
    name: "Áo Sơ Mi Nam Xanh Biển",
    price: 629000,
    description: "Áo sơ mi xanh biển, thiết kế trẻ trung, phong cách hiện đại.",
    sizes: ["M", "L", "XL"],
    colors: ["Xanh Biển"],
    material: "Linen pha Cotton",
     category: "A",
    images: [
      "../IMG/ao/aoTrang/a2.webp"
    ],
    stock: 18,
    rating: 4.7,
    reviews: 98,
    type: "1"
  },
        {
    id: "AR250120BL",
    name: "Áo Sơ Mi Nam Xanh Biển",
    price: 629000,
    description: "Áo sơ mi xanh biển, thiết kế trẻ trung, phong cách hiện đại.",
    sizes: ["M", "L", "XL"],
    colors: ["Xanh Biển"],
    material: "Linen pha Cotton",
     category: "A",
    images: [
      "../IMG/ao/aoTrang/a2.webp"
    ],
    stock: 18,
    rating: 4.7,
    reviews: 98,
    type: "2"
  },
        {
    id: "AR250120BL",
    name: "Áo Sơ Mi Nam Xanh Biển",
    price: 629000,
    description: "Áo sơ mi xanh biển, thiết kế trẻ trung, phong cách hiện đại.",
    sizes: ["M", "L", "XL"],
    colors: ["Xanh Biển"],
    material: "Linen pha Cotton",
     category: "A",
    images: [
      "../IMG/ao/aoTrang/a2.webp"
    ],
    stock: 18,
    rating: 4.7,
    reviews: 98,
    type: "3"
  },
      {
    id: "AR250120BL",
    name: "Áo Sơ Mi Nam Xanh Biển",
    price: 629000,
    description: "Áo sơ mi xanh biển, thiết kế trẻ trung, phong cách hiện đại.",
    sizes: ["M", "L", "XL"],
    colors: ["Xanh Biển"],
    material: "Linen pha Cotton",
    category: "A",
    images: [
      "../IMG/ao/aoTrang/a2.webp"
    ],
    stock: 18,
    rating: 4.7,
    reviews: 98,
    type: "4"
    },
  {
    id: "AR250122GR",
    name: "Áo Sơ Mi Nam Xám",
    price: 579000,
    description: "Áo sơ mi xám nhẹ nhàng, dễ phối đồ, phù hợp cho công sở và sự kiện.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Xám"],
    material: "Cotton lạnh",
     category: "quan",
    images: [
      "../IMG/ao/aoTrang/ar250118nt._2.webp"
    ],
    stock: 30,
    rating: 4.6,
    reviews: 85,
    type: "quan-dai"
  },
  {
    id: "AR250125BK",
    name: "Áo Sơ Mi Nam Đen",
    price: 650000,
    description: "Áo sơ mi đen sang trọng, phù hợp với phong cách lịch lãm.",
    sizes: ["M", "L", "XL"],
    colors: ["Đen"],
    material: "Cotton lụa",
     category: "A",
    images: [
      "https://owen.vn/media/catalog/product/a/r/ar250125bk-1.jpg",
      "https://owen.vn/media/catalog/product/a/r/ar250125bk-2.jpg",
    ],
    stock: 20,
    rating: 4.9,
    reviews: 210,
    type: "2"
  },
  {
    id: "AR250130RD",
    name: "Áo Sơ Mi Nam Đỏ Đô",
    price: 599000,
    description: "Áo sơ mi đỏ đô nổi bật, phong cách mạnh mẽ và thời thượng.",
    sizes: ["S", "M", "L"],
    colors: ["Đỏ Đô"],
    material: "Linen Cotton",
     category: "A",
    images: [
      "https://owen.vn/media/catalog/product/a/r/ar250130rd-1.jpg",
      "https://owen.vn/media/catalog/product/a/r/ar250130rd-2.jpg",
    ],
    stock: 15,
    rating: 4.5,
    reviews: 73,
    type: "3"
  },
  {
    id: "AR250135NV",
    name: "Áo Sơ Mi Nam Xanh Navy",
    price: 629000,
    description: "Áo sơ mi xanh navy lịch lãm, dễ phối đồ, phù hợp cho mọi dịp.",
    sizes: ["M", "L", "XL"],
    colors: ["Xanh Navy"],
    material: "Oxford Cotton",
     category: "Q",
    images: [
      "https://owen.vn/media/catalog/product/a/r/ar250135nv-1.jpg",
      "https://owen.vn/media/catalog/product/a/r/ar250135nv-2.jpg",
    ],
    stock: 22,
    rating: 4.8,
    reviews: 135,
    type: "4"
  },
  {
    id: "AR250140GR",
    name: "Áo Sơ Mi Nam Kẻ Sọc Xám",
    price: 589000,
    description: "Áo sơ mi kẻ sọc xám, thiết kế trẻ trung và năng động.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Xám Sọc"],
    material: "Cotton Pha Spandex",
    category: "Q",
    images: [
      "https://owen.vn/media/catalog/product/a/r/ar250140gr-1.jpg",
      "https://owen.vn/media/catalog/product/a/r/ar250140gr-2.jpg",
    ],
    stock: 28,
    rating: 4.7,
    reviews: 120,
    type: "1"
  }
];

window.products = products
window.accounts = accounts


