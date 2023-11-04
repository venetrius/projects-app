<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Project extends Model
{
    use HasFactory;
    use SoftDeletes; // Enable Laravel's soft delete feature

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'name',
        'description',
        'technologies',
        'expected_length',
        'is_active',
        // 'is_deleted' is handled by SoftDeletes trait
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'technologies' => 'array',
        'is_active' => 'boolean',
        'is_deleted' => 'boolean',
    ];

    /**
     * Get the user that owns the project.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the list of technologies as an array.
     */
    public function getTechnologiesAttribute($value)
    {
        return json_decode($value);
    }

    /**
     * Set the list of technologies as a JSON string.
     */
    public function setTechnologiesAttribute($value)
    {
        $this->attributes['technologies'] = json_encode($value);
    }

    // included to be used with SoftDeletes trait
    public static function boot()
    {
        parent::boot();

        static::deleting(function($project) {
            $project->is_deleted = true;
            $project->save();
        });
    }
}
