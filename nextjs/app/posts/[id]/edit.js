"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import api from "../../../lib/api";

export default function EditPost() {
    const router = useRouter();
    const params = useParams();
    const postId = params.id;

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        const fetchPost = async () => {
            const token = localStorage.getItem("token");
            if (!token) return router.push("/login");

            try {
                const res = await api.get(`/posts/${postId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setTitle(res.data.data.title);
                setContent(res.data.data.content);
            } catch (err) {
                console.error(err);
                alert("Failed to fetch post");
                router.push("/posts");
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [postId, router]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setUpdating(true);
        try {
            const token = localStorage.getItem("token");
            await api.put(
                `/posts/${postId}`,
                { title, content },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            router.push("/posts");
        } catch (err) {
            console.error(err);
            alert("Failed to update post");
        } finally {
            setUpdating(false);
        }
    };

    if (loading) return <p>Loading post...</p>;

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
            <form onSubmit={handleUpdate} className="space-y-4">
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="input input-bordered w-full"
                    required
                />
                <textarea
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="textarea textarea-bordered w-full"
                    required
                ></textarea>
                <button type="submit" disabled={updating} className="btn btn-primary">
                    {updating ? "Updating..." : "Update Post"}
                </button>
            </form>
        </div>
    );
}
