<div class="container">
    <h1 class="text-center">Consultar Evaluaciones</h1>
    <form method="POST" action="/survey/queryEvaluation" class="card p-4 shadow bg-white rounded-3">
        <div class="mb-3">
            <label for="docente" class="form-label">Docente:</label>
            <input type="text" class="form-control" id="docente" name="docente" placeholder="Nombre del docente">
        </div>
        <div class="text-center">
            <button type="submit" class="btn btn-secondary">Buscar Evaluaciones</button>
        </div>
    </form>

    <?php if (!empty($evaluaciones)): ?>
        <div class="mt-4">
            <h2>Resultados:</h2>
            <table class="table table-bordered">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Docente</th>
                    <th>Pregunta 1</th>
                    <th>Pregunta 2</th>
                    <th>Pregunta 3</th>
                    <th>Comentarios</th>
                </tr>
                </thead>
                <tbody>
                <?php foreach ($evaluaciones as $evaluacion): ?>
                    <tr>
                        <td><?= isset($evaluacion['id']) ? htmlspecialchars($evaluacion['id']) : 'N/A' ?></td>
                        <td><?= isset($evaluacion['docente']) ? htmlspecialchars($evaluacion['docente']) : 'N/A' ?></td>
                        <td><?= isset($evaluacion['pregunta1']) ? htmlspecialchars($evaluacion['pregunta1']) : 'N/A' ?></td>
                        <td><?= isset($evaluacion['pregunta2']) ? htmlspecialchars($evaluacion['pregunta2']) : 'N/A' ?></td>
                        <td><?= isset($evaluacion['pregunta3']) ? htmlspecialchars($evaluacion['pregunta3']) : 'N/A' ?></td>
                        <td><?= isset($evaluacion['comentarios']) ? htmlspecialchars($evaluacion['comentarios']) : 'N/A' ?></td>
                    </tr>
                <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    <?php endif; ?>
</div>