<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProfileController extends Controller
{
    // Show authenticated user's profile
    public function show(Request $request)
    {
        return response()->json([
            'data' => $request->user()
        ]);
    }
}
