<?php

namespace Main;

use Illuminate\Database\Eloquent\Model;

class Buka extends Model 
{
	public static function route()
	{
		\Route::group([
			'prefix' => 'buka', 
			'middleware' => \Main\Http\Middleware\CorsMiddleware::class, 
		], function ($router)
		{
			$router->get('/', self::class.'@index');
		});
	}
	public function index()
	{
		return [
			[ 'syozok' => 170, 'bukm' => '水産１課' ], 
			[ 'syozok' => 150, 'bukm' => '水産２課' ], 
			[ 'syozok' => 131, 'bukm' => '水産３課' ], 
			[ 'syozok' => 141, 'bukm' => '水産４課' ], 
			[ 'syozok' => 160, 'bukm' => '日配１課' ], 
			[ 'syozok' => 134, 'bukm' => '日配２課' ], 
			[ 'syozok' => 165, 'bukm' => '日配２課Ｂ' ], 
			[ 'syozok' => 161, 'bukm' => '日配３課' ], 
			[ 'syozok' => 610, 'bukm' => '東水産' ], 
			[ 'syozok' => 620, 'bukm' => '東日配' ], 
			[ 'syozok' => 710, 'bukm' => '山陰量販' ], 
			[ 'syozok' => 910, 'bukm' => '西水産１課' ], 
			[ 'syozok' => 920, 'bukm' => '西水産２課' ], 
			[ 'syozok' => 930, 'bukm' => '西水産鮮魚Ｔ' ], 

		];
	}
}