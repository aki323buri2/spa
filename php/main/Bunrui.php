<?php

namespace Main;

use Illuminate\Database\Eloquent\Model;

class Bunrui extends Model
{
    public static function route()
    {
    	\Route::group([
    		'prefix' => 'bunrui', 
    		'middleware' => \Main\Http\Middleware\CorsMiddleware::class, 
    	], function ($router)
    	{
    		$router->get('/', self::class.'@index');
    	});
    }
    public function __construct()
    {
    	$this->connection = 'ebix';
    	$this->table = 'bunui';
    }
    public function index()
    {
    	return $this->get();
    }
}
