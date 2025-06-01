<?php

namespace model;

use http\Params;

class SurveyModel {
    private $conn;

    public function __construct($conn) {
        $this->conn = $conn;
    }

    public function save($docente, $p1, $p2, $p3, $comentarios) {
        $stmt = $this->conn->prepare(
            "INSERT INTO respuestas (docente, pregunta1, pregunta2, pregunta3, comentarios) 
             VALUES (?, ?, ?, ?, ?)"
        );

        $stmt->bind_param("siiis", $docente, $p1, $p2, $p3, $comentarios);

        if ($stmt->execute()) {
            return [true, "Gracias por enviar tu evaluación."];
        } else {
            return [false, "Error al guardar los datos: " . $stmt->error];
        }
    }

    public function queryByTeacher($docente) {
        $sql = "SELECT * FROM respuestas WHERE docente LIKE ?";
        $stmt = $this->conn->prepare($sql);

        // Si el valor de $docente es numérico, usa una búsqueda exacta
        if (is_numeric($docente)) {
            $docente = (int)$docente; // Asegurarte de que sea un entero
            $sql = "SELECT * FROM respuestas WHERE docente = ?";
            $stmt = $this->conn->prepare($sql);
            $stmt->bind_param("i", $docente);
        } else {
            // Si no es numérico, usa LIKE para buscar coincidencias parciales
            $search = "%$docente%";
            $stmt->bind_param("s", $search);
        }

        $stmt->execute();
        $result = $stmt->get_result();

        // Verifica si hay resultados
        if ($result->num_rows > 0) {
            return $result->fetch_all(MYSQLI_ASSOC); // Devuelve los resultados como un arreglo asociativo
        }

        return []; // Si no hay resultados, devuelve un arreglo vacío
    }

    public function queryAllTeachers() {
        $sql ="
            SELECT DISTINCT docente 
            FROM evaluacion.respuestas 
            ";
        $stmt = $this->conn->prepare($sql);
        // Ejecutar
        $stmt->execute();
        // Obtener resultado
        $result = $stmt->get_result();
        $data=[];
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        return $data;
    }

    public function updateById($data) {
        $sql = "UPDATE respuestas SET docente = ?, pregunta1 = ?, pregunta2 = ?, pregunta3 = ?, comentarios = ? WHERE id = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param(
            "siiisi",
            $data['docente'],
            $data['pregunta1'],
            $data['pregunta2'],
            $data['pregunta3'],
            $data['comentarios'],
            $data['id']
        );

        return $stmt->execute();
    }

    public function deleteByCriteria($criteria) {
        $sql = "DELETE FROM respuestas WHERE 1=1";

        // Aplicar criterios dinámicamente
        $params = [];
        $types = "";

        if (!empty($criteria['id'])) {
            $sql .= " AND id = ?";
            $params[] = $criteria['id'];
            $types .= "i";
        }
        if (!empty($criteria['fecha'])) {
            $sql .= " AND fecha = ?";
            $params[] = $criteria['fecha'];
            $types .= "s";
        }

        $stmt = $this->conn->prepare($sql);
        if (!empty($params)) {
            $stmt->bind_param($types, ...$params);
        }

        return $stmt->execute();
    }

}
