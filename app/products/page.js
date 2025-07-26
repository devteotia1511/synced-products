"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [categories, setCategories] = useState(["All"]);
  const [maxPrice, setMaxPrice] = useState(10000);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      setProducts(data);
      const uniqueCategories = ["All", ...new Set(data.map((p) => p.category))];
      setCategories(uniqueCategories);
    };
    fetchProducts();
  }, []);

  const filtered = products.filter((p) => {
    const inINR = p.price * 83;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "All" || p.category === category;
    const matchPrice = inINR <= maxPrice;
    return matchSearch && matchCategory && matchPrice;
  });

  return (
    <div className="space-y-6 m-3 p-3">
      <h1 className="text-3xl font-bold font-serif mb-4">🛍️ Product Explorer</h1>

      {/* Filter Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-md"
        />

        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={category === cat ? "default" : "outline"}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>

        <div className="flex flex-col gap-1 max-w-sm">
          <label htmlFor="price">Max Price: ₹{maxPrice}</label>
          <Slider
            id="price"
            defaultValue={[maxPrice]}
            max={15000}
            min={100}
            step={100}
            onValueChange={([value]) => setMaxPrice(value)}
          />
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map((product) => (
          <Card key={product.id} className="p-4 space-y-2">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-contain"
            />
            <h2 className="font-semibold text-lg line-clamp-2">{product.title}</h2>
            <p className="text-sm text-gray-500">{product.category}</p>
            <p className="text-xl font-bold mt-2">₹{(product.price * 83).toFixed(0)}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}