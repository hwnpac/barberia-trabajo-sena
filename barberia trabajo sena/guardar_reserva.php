<?php
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "barberia";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Error de conexión: " . $conn->connect_error]);
    exit();
}

$nombre = $_POST['nombre'] ?? '';
$telefono = $_POST['telefono'] ?? '';
$fecha = $_POST['fecha'] ?? '';

if(empty($nombre) || empty($telefono) || empty($fecha)) {
    http_response_code(400);
    echo json_encode(["error" => "Todos los campos son obligatorios"]);
    exit();
}

$sql = "INSERT INTO reservas (nombre, telefono, fecha) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $nombre, $telefono, $fecha);

if($stmt->execute()) {
    echo json_encode(["success" => "Reserva guardada correctamente"]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Error al guardar reserva: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
