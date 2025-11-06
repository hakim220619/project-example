<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * Display a listing of posts (with pagination)
     */
    public function index()
    {
        $posts = Post::latest()->paginate(10);

        return response()->json([
            'status' => true,
            'message' => 'Posts fetched successfully',
            'data' => $posts
        ]);
    }

    /**
     * Store a newly created post.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $post = Post::create([
            'title' => $validated['title'],
            'content' => $validated['content'],
            'user_id' => $request->user()->id,
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Post created successfully',
            'data' => $post
        ], 201);
    }

    /**
     * Display the specified post.
     */
    public function show(Post $post)
    {
        return response()->json([
            'status' => true,
            'message' => 'Post details fetched successfully',
            'data' => $post
        ]);
    }

    /**
     * Update the specified post.
     */
    public function update(Request $request, Post $post)
    {
        $this->authorizeUser($request, $post);

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'content' => 'sometimes|required|string',
        ]);

        $post->update($validated);

        return response()->json([
            'status' => true,
            'message' => 'Post updated successfully',
            'data' => $post
        ]);
    }

    /**
     * Remove the specified post.
     */
    public function destroy(Request $request, Post $post)
    {
        $this->authorizeUser($request, $post);

        $post->delete();

        return response()->json([
            'status' => true,
            'message' => 'Post deleted successfully'
        ]);
    }

    /**
     * Ensure that the authenticated user owns the post
     */
    private function authorizeUser(Request $request, Post $post)
    {
        if ($post->user_id !== $request->user()->id) {
            abort(403, 'Unauthorized action.');
        }
    }
}
