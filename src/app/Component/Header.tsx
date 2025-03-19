import React, { useState } from "react";

// If you're using the union type
type TabView = "events" | "teamView" | "teamTracking";

interface HeaderType {
  setShowAddEventForm: any;
  showAddEventForm: boolean;
  activeTab: TabView;
  setActiveTab: any;
}
const Header = ({
  setShowAddEventForm,
  showAddEventForm,
  activeTab,
  setActiveTab,
}: HeaderType) => {
  return (
    <div className="flex justify-between p-4 border-b bg-gray-200">
      <h2 className="text-xl font-semibold">Schedule</h2>
      <div className="tabs">
        <button
          className={`tab ${activeTab === "events" ? "active" : ""}`}
          onClick={() => setActiveTab("events")}
        >
          Events
        </button>
        <button
          className={`tab ${activeTab === "teamView" ? "active" : ""}`}
          onClick={() => setActiveTab("teamView")}
        >
          Team View
        </button>
        <button
          className={`tab ${activeTab === "teamTracking" ? "active" : ""}`}
          onClick={() => setActiveTab("teamTracking")}
        >
          Team Tracking
        </button>
      </div>
      <button
        onClick={() => setShowAddEventForm(!showAddEventForm)} // Toggle form visibility
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Event
      </button>
    </div>
  );
};

export default Header;
