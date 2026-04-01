<?php

namespace App\Services;

use App\Models\Setting;

class SettingsService
{
    public function getSettings()
    {
        return Setting::first();
    }

    public function updateSettings(array $data)
    {
        $settings = Setting::first();

        if (!$settings) {
            $settings = Setting::create($data);
        } else {
            $settings->update($data);
        }

        return $settings;
    }
}