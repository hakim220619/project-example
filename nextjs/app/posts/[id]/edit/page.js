"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import api from "../../../../lib/api";

export default function EditPostPage() {
    const router = useRouter();
    const params = useParams();
    const postId = params.id;

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchPost = async () => {
            const token = localStorage.getItem("token");
            try {
                const res = await api.get(`/posts/${postId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setTitle(res.data.data.title);
                setContent(res.data.data.content);
            } catch (err) {
                console.error(err);
                alert("Failed to fetch post.");
                router.push("/posts");
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [postId, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        const token = localStorage.getItem("token");

        try {
            await api.put(
                `/posts/${postId}`,
                { title, content },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            router.push("/posts");
        } catch (err) {
            console.error(err);
            alert("Failed to update post.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <p className="text-center mt-10">Loading post...</p>;

    return (
        <div className="p-6 max-w-3xl mx-auto">
            {/* Back button */}
            <button
                onClick={() => router.back()}
                className="btn btn-outline mb-4"
            >
                &larr; Back
            </button>

            <h1 className="text-3xl font-bold mb-6 text-gray-800">Edit Post</h1>

            {/* Form container */}
            <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title input */}
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

                    {/* Content textarea */}
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

                    {/* Action buttons */}
                    <div className="flex gap-4 justify-start">
                        <button
                            type="submit"
                            className={`btn btn-primary ${saving ? "loading" : ""}`}
                            disabled={saving}
                        >
                            {saving ? "Saving..." : "Update Post"}
                        </button>
                        <button
                            type="button"
                            onClick={() => router.back()}
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
