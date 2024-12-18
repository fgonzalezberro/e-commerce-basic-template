import React, { useState, useEffect } from "react";
import { FiSearch, FiShoppingCart, FiX, FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const categories = [
  "All",
  "Watches",
  "Accessories",
  "Electronics",
  "Fashion",
  "Bags",
  "Lifestyle"
];

const products = [
  {
    id: 1,
    name: "Modern Minimalist Watch",
    price: 199.99,
    category: "Watches",
    description: "Elegant timepiece with a clean design and premium materials. Perfect for everyday wear.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30"
  },
  {
    id: 2,
    name: "Premium Leather Wallet",
    price: 89.99,
    category: "Accessories",
    description: "Handcrafted leather wallet with multiple card slots and sophisticated finish.",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93"
  },
  {
    id: 3,
    name: "Wireless Earbuds",
    price: 159.99,
    category: "Electronics",
    description: "High-quality wireless earbuds with noise cancellation and premium sound.",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df"
  },
  {
    id: 4,
    name: "Designer Sunglasses",
    price: 129.99,
    category: "Fashion",
    description: "Stylish sunglasses with UV protection and contemporary design.",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f"
  },
  {
    id: 5,
    name: "Minimalist Backpack",
    price: 79.99,
    category: "Bags",
    description: "Sleek and functional backpack perfect for daily commute and travel.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62"
  },
  {
    id: 6,
    name: "Smart Water Bottle",
    price: 49.99,
    category: "Lifestyle",
    description: "Temperature-controlled water bottle with smart hydration tracking.",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8"
  }
];

const Header = ({ searchQuery, setSearchQuery }) => (
  <header className="sticky top-0 z-50 bg-white shadow-md">
    <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
      <div className="text-2xl font-bold">MinimalStore</div>
      <div className="flex-1 mx-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 pl-10 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>
      <div className="flex items-center space-x-6">
        <a href="#" className="hover:text-blue-500">Home</a>
        <a href="#" className="hover:text-blue-500">About</a>
        <button className="relative">
          <FiShoppingCart className="w-6 h-6" />
          <span className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">0</span>
        </button>
      </div>
    </nav>
  </header>
);

const Hero = () => (
  <div className="relative h-96 mb-8">
    <img
      src="https://images.unsplash.com/photo-1441986300917-64674bd600d8"
      alt="Store Hero"
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to MinimalStore</h1>
        <p className="text-xl mb-8">Discover our curated collection of premium products</p>
        <button className="bg-white text-black px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors">
          Shop Now
        </button>
      </div>
    </div>
  </div>
);

const Sidebar = ({ selectedCategory, setSelectedCategory }) => (
  <div className="w-64 bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-xl font-bold mb-4">Categories</h2>
    <ul className="space-y-2">
      {categories.map((category) => (
        <li key={category}>
          <button
            onClick={() => setSelectedCategory(category)}
            className={`w-full text-left p-2 rounded ${selectedCategory === category ? "bg-blue-500 text-white" : "hover:bg-gray-100"}`}
          >
            {category}
          </button>
        </li>
      ))}
    </ul>
  </div>
);

const ProductCard = ({ product, onClick }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
    <img
      src={product.image}
      alt={product.name}
      className="w-full h-48 object-cover"
      onError={(e) => {
        e.target.src = "https://images.unsplash.com/photo-1560393464-5c69a73c5770";
      }}
    />
    <div className="p-4">
      <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
      <p className="text-gray-600 mb-4">${product.price}</p>
      <button
        onClick={() => onClick(product)}
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
      >
        View Details
      </button>
    </div>
  </div>
);

const ProductModal = ({ product, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-lg max-w-2xl w-full relative">
      <button
        onClick={onClose}
        className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
      >
        <FiX className="w-6 h-6" />
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover rounded-lg"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1560393464-5c69a73c5770";
          }}
        />
        <div>
          <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-2xl font-bold mb-6">${product.price}</p>
          <button className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
);

const Footer = () => (
  <footer className="bg-gray-900 text-white py-12">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">MinimalStore</h3>
          <p className="text-gray-400">Your destination for premium products</p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Products</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Categories</h4>
          <ul className="space-y-2">
            {categories.slice(1).map((category) => (
              <li key={category}>
                <a href="#" className="text-gray-400 hover:text-white">{category}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
          <p className="text-gray-400 mb-2">Email: info@minimalstore.com</p>
          <p className="text-gray-400">Phone: +1 234 567 890</p>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
        <p>© 2024 MinimalStore. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

const WhatsAppButton = () => (
  <a
    href="https://wa.me/1234567890"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors z-50"
  >
    <FaWhatsapp className="w-6 h-6" />
  </a>
);

const MinimalistEcommerce = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedCategory === "All" || product.category === selectedCategory)
    );
    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Hero />
      <main className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <Sidebar
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={setSelectedProduct}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default MinimalistEcommerce;
