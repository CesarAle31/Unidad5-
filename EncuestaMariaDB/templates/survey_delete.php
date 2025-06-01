<div class="container my-5" style="max-width: 480px;">
  <h1 class="text-center mb-4 fw-bold text-danger" style="font-size: 2.5rem;">Eliminar Evaluaciones</h1>
  <form method="POST" action="/survey/removeEvaluation" class="card p-4 shadow-sm bg-white rounded-4" onsubmit="return validateForm();">
    <div class="mb-4">
      <label for="id" class="form-label fw-semibold" style="font-size: 1.25rem;">
        ID de la Evaluación <small class="text-muted" style="font-size: 0.9rem;">(opcional)</small>:
      </label>
      <input
        type="number"
        class="form-control"
        id="id"
        name="id"
        placeholder="Ingrese el ID de la evaluación"
        min="1"
        aria-describedby="idHelp"
        style="font-size: 1.2rem; padding: 0.5rem 0.75rem;"
      >
      <div id="idHelp" class="form-text" style="font-size: 0.9rem;">Puede dejar vacío si desea usar otro criterio.</div>
    </div>

    <div class="d-grid">
      <button type="submit" class="btn btn-danger btn-lg fw-bold" style="font-size: 1.3rem; padding: 0.6rem;">
        Eliminar Evaluaciones
      </button>
    </div>
  </form>
</div>

<script>
  function validateForm() {
    const id = document.getElementById('id').value.trim();

    if (!id) {
      alert('Por favor, proporcione el ID');
      return false;
    }
    return true;
  }
</script>
