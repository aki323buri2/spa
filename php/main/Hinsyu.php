<?php

namespace Main;

use Illuminate\Database\Eloquent\Model;

class Hinsyu extends Model
{
    public static function route()
    {
    	\Route::group([
    		'prefix' => 'hinsyu', 
    		'middleware' => \Main\Http\Middleware\CorsMiddleware::class, 
    	], function ($router)
    	{
    		$router->get('/', self::class.'@index');
    	});
    }
    public function __construct()
    {
    	$this->connection = 'ebix';
    	$this->table = 'hinsyu';
    }
    public function index()
    {
    	return $this->limit(100)->get();
    }
}
