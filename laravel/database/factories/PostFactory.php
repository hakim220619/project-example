<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    protected $model = \App\Models\Post::class;

    public function definition(): array
    {
        return [
            'user_id' => User::inRandomOrder()->first()->id ?? 1, // assign to a random existing user
            'title' => $this->faker->sentence(),
            'content' => $this->faker->paragraphs(3, true),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
