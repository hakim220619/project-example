"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../../lib/api";

export default function CreatePost() {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            await api.post(
                "/posts",
                { title, content },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            router.push("/posts");
        } catch (err) {
            console.error(err);
            alert("Failed to create post");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-3xl mx-auto">
            {/* Back button */}
            <button
                onClick={() => router.push("/posts")}
                className="btn btn-outline mb-4 px-3 py-1 rounded hover:bg-gray-100 transition"
            >
                &larr; Back
            </button>

            <h1 className="text-3xl font-bold mb-6 text-gray-800">Create New Post</h1>

            <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Title</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter post title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="input input-bordered w-full border-gray-300"
                            required
                        />
                    </div>

                    {/* Content */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Content</span>
                        </label>
                        <textarea
                            placeholder="Enter post content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="textarea textarea-bordered w-full h-40 border-gray-300"
                            required
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4 justify-start">
                        <button
                            type="submit"
                            className={`btn bg-blue-600 text-white hover:bg-blue-700 ${loading ? "loading" : ""}`}
                            disabled={loading}
                        >
                            {loading ? "Creating..." : "Create Post"}
                        </button>
                        <button
                            type="button"
                            onClick={() => router.push("/posts")}
                            className="btn btn-outline"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
