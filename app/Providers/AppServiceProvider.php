<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Database\Events\QueryExecuted;
use Illuminate\Support\Facades\DB;

class AppServiceProvider extends ServiceProvider {
    /**
     * Register any application services.
     */
    public function register(): void {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void {
        // Listening for Query Events
        DB::listen(function (QueryExecuted $query) {
            $query->sql;
            $query->bindings;
            $query->time;
            $query->toRawSql();
        });
    }
}
