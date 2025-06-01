<?php

namespace core;

class TemplateEngine
{
    public static function render($view, $data = [])
    {
        extract($data);
        ob_start();
        $viewPath = __DIR__ . "/../templates/views/$view.php";

        if (!file_exists($viewPath)) {
            die("Error: La vista '$view' no existe en $viewPath.");
        }

        include $viewPath;
        $content = ob_get_clean();

        $layoutPath = __DIR__ . "/../templates/layout.php";

        if (!file_exists($layoutPath)) {
            die("Error: El layout principal no existe en $layoutPath.");
        }

        include $layoutPath;
    }

    public static function renderPartial($view, $data = [])
    {
        extract($data);
        $viewPath = __DIR__ . "/../templates/views/$view.php";

        if (!file_exists($viewPath)) {
            die("Error: La vista parcial '$view' no existe en $viewPath.");
        }

        include $viewPath;
    }
}