<?php

class Conexion
{
	public static $conexion;

	public static function getConexion()
	{
		self::$conexion  = new PDO('mysql:host=localhost;dbname=finan27', "root", "alexjar");
		self::$conexion->setAttribute(PDO::ATTR_AUTOCOMMIT, 1);

		return self::$conexion;
	}
}
