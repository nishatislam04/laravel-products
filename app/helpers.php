<?php

if (!function_exists("lg")) {
    function lg($message, $context = []) {
        return \Illuminate\Support\Facades\Log::debug($message, $context);
    }
}
