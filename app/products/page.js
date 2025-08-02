"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import ProductFilterSidebar from "@/components/ProductFilterSidebar";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const [filters, setFilters] = useState({
    brand: [],
    color: [],
    discount: "",
    price: 10000,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products?limit=100");
        const data = await res.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  const onClearAll = () => {
    setFilters({ brand: [], color: [], discount: "", price: 10000 });
    setSearch("");
  };

  const filtered = products.filter((p) => {
    const inINR = p.price * 86;
    const matchSearch = (p.title || "").toLowerCase().includes(search.toLowerCase());
    const matchPrice = inINR <= filters.price;

    const matchBrand =
      filters.brand.length === 0 ||
      filters.brand.some((b) =>
        (p.brand || "").toLowerCase().includes(b.toLowerCase())
      );

    const matchColor =
      filters.color.length === 0 ||
      filters.color.some((c) =>
        (p.description || "").toLowerCase().includes(c.toLowerCase())
      );

    const matchDiscount =
      filters.discount === "" ||
      p.discountPercentage >= parseInt(filters.discount);

    return (
      matchSearch && matchPrice && matchBrand && matchColor && matchDiscount
    );
  });

  return (
    <div className="flex flex-col md:flex-row">
      <ProductFilterSidebar
        filters={filters}
        setFilters={setFilters}
        onClearAll={onClearAll}
      />
  
      <div className="flex-1 p-4 space-y-4">
        <h1 className="text-3xl font-bold font-serif mb-4">
          🛍️ Product Explorer
        </h1>
  
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-md"
        />
  
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filtered.map((product) => (
            <Card key={product.id} className="p-4 space-y-2">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-48 object-contain rounded"
              />
              <h2 className="font-semibold text-lg line-clamp-2">
                {product.title}
              </h2>
              <p className="text-sm text-gray-500 capitalize">
                {product.category}
              </p>
              <p className="text-xl font-bold mt-2">
                ₹{(product.price * 86).toFixed(0)}
              </p>
              <p className="text-sm text-yellow-600">⭐ {product.rating}</p>
              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <Button variant="outline" className="w-full sm:w-auto">Add to Cart</Button>
                <Button className="w-full sm:w-auto">Buy Now</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}