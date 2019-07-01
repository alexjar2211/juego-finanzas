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
				  FROM preguntas AS t 
				  JOIN (SELECT ROUND(RAND() * (SELECT MAX(id_pregunta) FROM preguntas)) AS id) AS x 
				  WHERE t.id_pregunta >= x.id LIMIT 10";

		$stmt = $conexion->prepare($sql);
		$stmt->execute();

		$articulos = $stmt->fetchAll(PDO::FETCH_ASSOC);

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
}

$preguntas = new Preguntas();

if ($_GET['action'] == 'consultar') {
	$preguntas->consultarPreguntas();
}elseif($_GET['action'] == 'consultarPuntuaciones'){
	$preguntas->consultarPuntuaciones();
}
