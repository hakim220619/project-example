"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "../../lib/api";

export default function PostsPage() {
    const router = useRouter();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    const fetchPosts = async (page = 1) => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
            return;
        }

        setLoading(true);
        try {
            const res = await api.get(`/posts?page=${page}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const postsArray = Array.isArray(res.data.data?.data)
                ? res.data.data.data
                : [];

            setPosts(postsArray);
            setPage(res.data.data.current_page);
            setLastPage(res.data.data.last_page);
        } catch (err) {
            console.error("Failed to fetch posts:", err);
            localStorage.removeItem("token");
            router.push("/login");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts(page);
    }, [page]);

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this post?")) return;
        const token = localStorage.getItem("token");
        try {
            await api.delete(`/posts/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchPosts(page); // refresh current page
        } catch (err) {
            console.error("Failed to delete post:", err);
            alert("Failed to delete post.");
        }
    };

    if (loading) return <p className="text-center mt-10">Loading posts...</p>;

    // Generate sliding page numbers (max 5)
    const getPageNumbers = () => {
        const maxPages = 10;
        let start = Math.max(page - 2, 1);
        let end = Math.min(start + maxPages - 1, lastPage);

        // Adjust start if we are near the end
        start = Math.max(end - maxPages + 1, 1);

        const pages = [];
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    };

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.push("/dashboard")}
                        className="btn btn-outline px-3 py-1 rounded hover:bg-gray-100 transition"
                    >
                        &larr; Back
                    </button>
                    <h1 className="text-3xl font-bold text-gray-800">My Posts</h1>
                </div>
                <Link
                    href="/posts/create"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                >
                    Create New Post
                </Link>
            </div>

            {posts.length === 0 ? (
                <p className="text-gray-500 text-center mt-10">No posts found.</p>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map((post) => (
                            <div
                                key={post.id}
                                className="bg-white border rounded-xl shadow-sm p-5 flex flex-col justify-between hover:shadow-lg transition"
                            >
                                <div className="mb-4">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm line-clamp-3">
                                        {post.content}
                                    </p>
                                </div>
                                <div className="flex justify-end gap-2 mt-4">
                                    <Link
                                        href={`/posts/${post.id}/edit`}
                                        className="btn btn-sm btn-warning px-3 py-1 rounded"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(post.id)}
                                        className="btn btn-sm btn-error px-3 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center gap-2 mt-6">
                        <button
                            onClick={() => setPage(page - 1)}
                            disabled={page === 1}
                            className="btn btn-outline btn-sm px-3 py-1 rounded disabled:opacity-50"
                        >
                            Prev
                        </button>

                        {getPageNumbers().map((p) => (
                            <button
                                key={p}
                                onClick={() => setPage(p)}
                                className={`btn btn-sm px-3 py-1 rounded ${p === page ? "btn-primary text-white" : "btn-outline"
                                    }`}
                            >
                                {p}
                            </button>
                        ))}

                        <button
                            onClick={() => setPage(page + 1)}
                            disabled={page === lastPage}
                            className="btn btn-outline btn-sm px-3 py-1 rounded disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
