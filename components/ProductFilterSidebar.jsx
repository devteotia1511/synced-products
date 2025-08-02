"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Filter, X } from "lucide-react";

const allBrands = ["Nike", "Roadster", "Mast & Harbour", "HRX"];
const allColors = ["Blue", "Black", "White", "Green"];
const allDiscounts = ["10", "30", "50", "70"];

export default function ProductFilterSidebar({ filters, setFilters, onClearAll }) {
  const [tempFilters, setTempFilters] = useState(filters);
  const [showSidebar, setShowSidebar] = useState(true);

  const handleApply = () => setFilters(tempFilters);
  const handleClear = () =>
    setTempFilters({ brand: [], color: [], discount: "", price: 10000 });

  return (
    <div className="w-full md:w-72">
      <div className="p-2 border-b flex justify-between items-center gap-2">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold">Filters</h2>
          <Button variant="ghost" size="icon" onClick={() => setShowSidebar(!showSidebar)}>
            {showSidebar ? <X size={20} /> : <Filter size={20} />}
          </Button>
        </div>
        <Button size="sm" variant="destructive" 
        onClick={() => {
          const cleared = { brand: [], color: [], discount: "", price: 10000 };
          setFilters(cleared);
          setTempFilters(cleared);
        }}>
          Clear All
        </Button>
      </div>

      {showSidebar && (
        <div className="p-4 border-l space-y-6 sticky top-12 h-screen overflow-auto bg-white">
          <div className="space-y-2 border-b border-gray-200 pb-4">
            <div className="flex justify-between">
              <h3 className="font-semibold">Brand</h3>
              <div className="flex gap-2">
                <Button className="p-1" variant="outline" size="xs" onClick={() => setTempFilters({ ...tempFilters, brand: [] })}>Clear</Button>
                <Button className="p-1" variant="default" size="xs" onClick={handleApply}>Apply</Button>
              </div>
            </div>
            <ScrollArea className="h-32 pr-2">
              {allBrands.map((brand) => (
                <div key={brand} className="flex items-center space-x-2 mt-1">
                  <Checkbox
                    checked={tempFilters.brand.includes(brand)}
                    onCheckedChange={(checked) => {
                      setTempFilters((prev) => ({
                        ...prev,
                        brand: checked
                          ? [...prev.brand, brand]
                          : prev.brand.filter((b) => b !== brand),
                      }));
                    }}
                  />
                  <label>{brand}</label>
                </div>
              ))}
            </ScrollArea>
          </div>

          <div className="space-y-2 border-b border-gray-200 pb-4">
            <div className="flex justify-between">
              <h3 className="font-semibold">Price</h3>
              <div className="flex gap-2">
                <Button variant="outline" className="p-1" size="xs" onClick={() => setTempFilters({ ...tempFilters, price: 10000 })}>Clear</Button>
                <Button variant="default" size="xs" className="p-1" onClick={handleApply}>Apply</Button>
              </div>
            </div>
            <Slider defaultValue={[tempFilters.price]} max={20000} step={100} onValueChange={([v]) => setTempFilters({ ...tempFilters, price: v })} />
          </div>

          <div className="space-y-2 border-b border-gray-200 pb-4">
            <div className="flex justify-between">
              <h3 className="font-semibold">Color</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="xs" className="p-1" onClick={() => setTempFilters({ ...tempFilters, color: [] })}>Clear</Button>
                <Button variant="default" size="xs" className="p-1" onClick={handleApply}>Apply</Button>
              </div>
            </div>
            {allColors.map((color) => (
              <div key={color} className="flex items-center space-x-2 mt-1">
                <Checkbox
                  checked={tempFilters.color.includes(color)}
                  onCheckedChange={(checked) => {
                    setTempFilters((prev) => ({
                      ...prev,
                      color: checked
                        ? [...prev.color, color]
                        : prev.color.filter((c) => c !== color),
                    }));
                  }}
                />
                <label>{color}</label>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <h3 className="font-semibold">Discount</h3>
              <div className="flex gap-2">
                <Button variant="outline" className="p-1" size="xs" onClick={() => setTempFilters({ ...tempFilters, discount: "" })}>Clear</Button>
                <Button variant="default" className="p-1" size="xs" onClick={handleApply}>Apply</Button>
              </div>
            </div>
            {allDiscounts.map((d) => (
              <div key={d} className="flex items-center space-x-2 mt-1">
                <input type="radio" name="discount" checked={tempFilters.discount === d} onChange={() => setTempFilters({ ...tempFilters, discount: d })} />
                <label>{d}% or more</label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}