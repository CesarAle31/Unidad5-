<div class="container">
    <h1 class="text-center">Actualizar Evaluaciones</h1>
    <form method="POST" action="/survey/updateEvaluation" class="card p-4 shadow bg-white rounded-3">
        <div class="mb-3">
            <label for="id" class="form-label">ID de la Evaluación:</label>
            <input type="number" class="form-control" id="id" name="id" placeholder="ID de la evaluación" required>
        </div>
        <div class="mb-3">
            <label for="docente" class="form-label">Docente:</label>
            <input type="text" class="form-control" id="docente" name="docente" placeholder="Nombre del docente" required>
        </div>
        <div class="mb-3">
            <label for="pregunta1" class="form-label">Respuesta a Pregunta 1:</label>
            <input type="number" class="form-control" id="pregunta1" name="pregunta1" placeholder="1-4" min="1" max="4">
        </div>
        <div class="mb-3">
            <label for="pregunta2" class="form-label">Respuesta a Pregunta 2:</label>
            <input type="number" class="form-control" id="pregunta2" name="pregunta2" placeholder="1-4" min="1" max="4">
        </div>
        <div class="mb-3">
            <label for="pregunta3" class="form-label">Respuesta a Pregunta 3:</label>
            <input type="number" class="form-control" id="pregunta3" name="pregunta3" placeholder="1-4" min="1" max="4">
        </div>
        <div class="mb-3">
            <label for="comentarios" class="form-label">Comentarios:</label>
            <textarea class="form-control" id="comentarios" name="comentarios" rows="3"></textarea>
        </div>
        <div class="text-center">
            <button type="submit" class="btn btn-primary">Actualizar Evaluación</button>
        </div>
    </form>
</div>