<?php

namespace Main\Providers;

use Illuminate\Support\ServiceProvider;

class MainServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        $models = collect(glob(base_path('../php/main/*.php')))->map(function ($path)
        {
        	return '\\Main\\'.basenameWithoutExtension($path);
        })
        ->filter(function ($class)
        {
        	return method_exists($class, 'route');
        });
        $models->map(function ($class)
        {
        	$class::route();
        });

        config([ 'database.connections' => collect(config('database.connections'))->merge([
        	'ebix' => [
	        	'driver' => 'mysql', 
	        	'host' => 'localhost', 
	        	'port' => 3306, 
	        	'database' => 'ebix', 
	        	'username' => 'shokuryu', 
	        	'password' => 'shokuryu', 
	        	'charset' => 'utf8mb4', 
	        	'collation' => 'utf8mb4_unicode_ci', 
	        	'prefix' => '', 
	        ], 
        ])->all() ]);
    }

    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
