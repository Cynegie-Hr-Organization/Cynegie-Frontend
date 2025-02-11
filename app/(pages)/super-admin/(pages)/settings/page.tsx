"use client";

import SettingsForm from "./settings-form";

const SuperAdminSettings = () => {
  return (
    <div className="space-y-6 py-6">
      <h3 className="text-xl font-bold">Settings</h3>

      <SettingsForm />
    </div>
  );
};

export default SuperAdminSettings;
