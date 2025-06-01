<?php
$host = "localhost";
$user = "root"; // o el que uses
$pass = "";
$db = "evaluacion";

// Conexión
$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Obtener datos
$docente = $_POST['docente'];
$p1 = $_POST['pregunta1'];
$p2 = $_POST['pregunta2'];
$p3 = $_POST['pregunta3'];
$comentarios = $_POST['comentarios'];

// Insertar en BD
$sql = "INSERT INTO respuestas (docente, pregunta1, pregunta2, pregunta3, comentarios)
        VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("siiis", $docente, $p1, $p2, $p3, $comentarios);

if ($stmt->execute()) {
    echo "✅ Evaluación registrada correctamente.";
} else {
    echo "❌ Error: " . $conn->error;
}

$stmt->close();
$conn->close();
?>
