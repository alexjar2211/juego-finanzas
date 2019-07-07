<?php

include_once 'conexion.php';

class Preguntas
{
	public function consultarPreguntas()
	{
		$conexion = Conexion::getConexion();

		$sql = "SELECT t.titulo,
							t.opcion_1 r1,
							t.opcion_2 r2,
							t.opcion_3 r3,
							t.opcion_4 r4,
							t.respuesta_correcta ok
				  FROM preguntas t";

		$stmt = $conexion->prepare($sql);
		$stmt->execute();

		$articulos = $stmt->fetchAll(PDO::FETCH_ASSOC);

		// print_r($articulos);

		echo json_encode($articulos);
	}


	public function consultarPuntuaciones()
	{
		$conexion = Conexion::getConexion();

		$sql = "SELECT p.nombre,
							p.puntos 
					FROM puntuaciones p
					ORDER BY p.puntos DESC LIMIT 5";

		$stmt = $conexion->prepare($sql);
		$stmt->execute();

		$articulos = $stmt->fetchAll(PDO::FETCH_ASSOC);

		echo json_encode($articulos);
	}

	public function guardarPuntuacion(){
		$conexion = Conexion::getConexion();

		$sql = "INSERT INTO puntuaciones (nombre, puntos)
					VALUES(:nombre, :puntos)";

		$stmt = $conexion->prepare($sql);
		$stmt->execute([
			'nombre' => $_POST['nombre'],
			'puntos' => $_POST['puntos']
		]);

		echo json_encode($stmt->rowCount());
	}
}

$preguntas = new Preguntas();

if ($_GET['action'] == 'consultar') {
	$preguntas->consultarPreguntas();
}elseif($_GET['action'] == 'consultarPuntuaciones'){
	$preguntas->consultarPuntuaciones();
}elseif($_GET['action'] == 'guardarPuntuacion'){
	$preguntas->guardarPuntuacion();
}
