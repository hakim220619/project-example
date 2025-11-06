<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Post;

class PostSeeder extends Seeder
{
    public function run(): void
    {
        // Create 20 dummy posts
        Post::factory()->count(20)->create();
    }
}
