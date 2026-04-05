"use client";

import { useState, useEffect } from "react";

export default function ProductPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("products");
    if (stored) setProducts(JSON.parse(stored));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!form.name || !form.price) {
      alert("Name and Price required!");
      return;
    }

    if (editingIndex !== null) {
      const updated = [...products];
      updated[editingIndex] = form;
      setProducts(updated);
      setEditingIndex(null);
    } else {
      setProducts([...products, form]);
    }

    setForm({ name: "", price: "", description: "", image: "" });
  };

  const handleEdit = (index: number) => {
    setForm(products[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index: number) => {
    const filtered = products.filter((_, i) => i !== index);
    setProducts(filtered);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Product Manager</h1>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-3 mb-6">
        <input
          className="w-full border p-2"
          placeholder="Product Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          className="w-full border p-2"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />
        <textarea
          className="w-full border p-2"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          className="w-full border p-2"
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />

        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          {editingIndex !== null ? "Update Product" : "Add Product"}
        </button>
      </form>

      <input
  placeholder="Search products..."
  className="border p-2 mb-4 w-full"
  onChange={(e) => setSearch(e.target.value)}
/>

      {/* PRODUCT LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((p, index) => (
          <div key={index} className="border p-4 rounded shadow hover:shadow-lg transition">
            {p.image && (
              <img src={p.image} className="h-40 w-full object-cover mb-2" />
            )}
            <h2 className="text-xl font-bold">{p.name}</h2>
            <p className="text-gray-600">${p.price}</p>
            <p>{p.description}</p>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => handleEdit(index)}
                className="bg-yellow-400 px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(index)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}