<div class="container">
    <h1 class="text-center">Eliminar Evaluaciones</h1>
    <form method="POST" action="/survey/removeEvaluation" class="card p-4 shadow bg-white rounded-3">
        <div class="mb-3">
            <label for="id" class="form-label">ID de la Evaluación (opcional):</label>
            <input type="number" class="form-control" id="id" name="id" placeholder="ID de la evaluación">
        </div>
        <div class="mb-3">
            <label for="fecha" class="form-label">Fecha (opcional):</label>
            <input type="date" class="form-control" id="fecha" name="fecha">
        </div>
        <div class="text-center">
            <button type="submit" class="btn btn-danger">Eliminar Evaluaciones</button>
        </div>
    </form>
</div>
