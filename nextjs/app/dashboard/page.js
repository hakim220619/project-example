"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaUserCircle, FaSignOutAlt, FaFileAlt } from "react-icons/fa"; // FaFileAlt for Posts
import api from "../../lib/api";
import Link from "next/link";

export default function Dashboard() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
            return;
        }

        const fetchData = async () => {
            try {
                // Fetch profile
                const profileRes = await api.get("/profile", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(profileRes.data.data || profileRes.data);

                // Fetch posts
                const postsRes = await api.get("/posts", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setPosts(postsRes.data.data || postsRes.data);
            } catch (err) {
                console.error("Failed to fetch data:", err);
                localStorage.removeItem("token");
                router.push("/login");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [router]);

    const handleLogout = async () => {
        const token = localStorage.getItem("token");
        try {
            await api.post("/logout", null, {
                headers: { Authorization: `Bearer ${token}` },
            });
        } catch (err) {
            console.error("Logout failed:", err);
        } finally {
            localStorage.removeItem("token");
            router.push("/login");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800">
            <nav className="bg-white shadow-md p-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-blue-600">My Dashboard</h1>
                <button
                    onClick={handleLogout}
                    className="btn btn-error btn-sm text-white flex items-center gap-2"
                >
                    <FaSignOutAlt /> Logout
                </button>
            </nav>

            <main className="p-6 max-w-5xl mx-auto">
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <div className="flex items-center gap-4 mb-6">
                        <FaUserCircle className="text-5xl text-blue-500" />
                        <div>
                            <h2 className="text-xl font-semibold">{user?.name}</h2>
                            <p className="text-sm text-gray-500">{user?.email}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Posts card */}
                        <div>
                            <Link href="/posts">
                                <div className="card bg-blue-100 shadow-sm p-5 text-center rounded-xl cursor-pointer hover:bg-blue-200 transition">
                                    <FaFileAlt className="mx-auto text-blue-600 text-3xl mb-2" />
                                    <h3 className="font-semibold">Posts</h3>
                                    <p className="text-sm text-gray-600">
                                        You have {posts.length} {posts.length === 1 ? "post" : "posts"}
                                    </p>
                                </div>
                            </Link>
                        </div>

                        {/* Profile card */}
                        <div className="card bg-green-100 shadow-sm p-5 text-center rounded-xl">
                            <FaUserCircle className="mx-auto text-green-600 text-3xl mb-2" />
                            <h3 className="font-semibold">Profile</h3>
                            <p className="text-sm text-gray-600">Manage your account</p>
                        </div>

                        {/* Logout card */}
                        <div
                            onClick={handleLogout}
                            className="card bg-red-100 shadow-sm p-5 text-center rounded-xl cursor-pointer hover:bg-red-200 transition"
                        >
                            <FaSignOutAlt className="mx-auto text-red-600 text-3xl mb-2" />
                            <h3 className="font-semibold">Logout</h3>
                            <p className="text-sm text-gray-600">Click to log out</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
