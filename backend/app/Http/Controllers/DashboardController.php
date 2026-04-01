<?php

namespace App\Http\Controllers;

use App\Services\DashboardService;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    protected $dashboardService;

    public function __construct(DashboardService $dashboardService)
    {
        $this->dashboardService = $dashboardService;
    }

    public function index(Request $request)
    {
        $year = $request->get('year');
        $month = $request->get('month');

        $stats = $this->dashboardService->getStatistics($year, $month);

        return response()->json($stats);
    }
}