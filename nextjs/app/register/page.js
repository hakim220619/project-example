"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../lib/api";


export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/register", form);
      router.push("/login");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-base-200">
      <form onSubmit={handleSubmit} className="card w-96 bg-base-100 shadow-xl p-6">
        <h2 className="text-2xl mb-4 font-bold text-center text-primary">
          Register
        </h2>

        {["name", "email", "password", "password_confirmation"].map((field) => (
          <input
            key={field}
            type={field.includes("password") ? "password" : "text"}
            placeholder={field.replace("_", " ")}
            className="input input-bordered w-full mb-3"
            value={form[field]}
            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
          />
        ))}

        <button type="submit" className="btn btn-primary w-full">
          Register
        </button>
      </form>
    </div>
  );
}
