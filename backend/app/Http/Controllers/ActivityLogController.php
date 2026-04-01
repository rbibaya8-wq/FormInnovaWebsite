<?php

namespace App\Http\Controllers;

use App\Services\ActivityLogService;

class ActivityLogController extends Controller
{
    protected $activityLogService;

    public function __construct(ActivityLogService $activityLogService)
    {
        $this->activityLogService = $activityLogService;
    }

    public function index()
    {
        $logs = $this->activityLogService->getAllLogs();

        return response()->json($logs);
    }
}