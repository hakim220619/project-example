"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MdEmail, MdLock } from "react-icons/md";
import api from "../../lib/api";


export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await api.post("/login", form);
            if (res.status === 200) {

                const { token } = res.data.data;
                localStorage.setItem("token", token);
                router.push("/dashboard");
            } else {
                setError(res.data?.message || "Login failed");
            }
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Invalid credentials");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-md bg-white text-gray-900 shadow-xl rounded-2xl p-8 border border-gray-100 transition-transform hover:scale-[1.01]">
                <h2 className="text-3xl font-bold text-center mb-4 text-blue-600">
                    Welcome Back 👋
                </h2>
                <p className="text-center text-sm text-gray-500 mb-6">
                    Please login to your account
                </p>

                {error && (
                    <div className="bg-red-100 text-red-700 rounded-lg p-2 text-sm mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-gray-600 mb-1 block">
                            Email
                        </label>
                        <div className="relative">
                            <MdEmail
                                size={20}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />
                            <input
                                type="email"
                                placeholder="you@example.com"
                                className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                value={form.email}
                                onChange={(e) =>
                                    setForm({ ...form, email: e.target.value })
                                }
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-600 mb-1 block">
                            Password
                        </label>
                        <div className="relative">
                            <MdLock
                                size={20}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                value={form.password}
                                onChange={(e) =>
                                    setForm({ ...form, password: e.target.value })
                                }
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2.5 rounded-lg font-semibold text-white transition-all duration-300 
              ${loading
                                ? "bg-blue-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700 active:scale-[0.98] shadow-lg hover:shadow-blue-200"}`}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
}
