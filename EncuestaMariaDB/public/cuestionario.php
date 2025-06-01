<!-- public/cuestionario.php -->
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Cuestionario Docente</title>
</head>
<body>
    <h2>Evaluación Docente</h2>
    <form action="guardar_respuesta.php" method="POST">
        <label>Nombre del docente:</label><br>
        <input type="text" name="docente" required><br><br>

        <label>Pregunta 1 (0-5):</label><br>
        <input type="number" name="pregunta1" min="0" max="5" required><br><br>

        <label>Pregunta 2 (0-5):</label><br>
        <input type="number" name="pregunta2" min="0" max="5" required><br><br>

        <label>Pregunta 3 (0-5):</label><br>
        <input type="number" name="pregunta3" min="0" max="5" required><br><br>

        <label>Comentarios:</label><br>
        <textarea name="comentarios"></textarea><br><br>

        <button type="submit">Enviar evaluación</button>
    </form>
</body>
</html>
