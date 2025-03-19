"use client";
import "react-calendar-timeline/style.css"; // Import CSS for styling
import Header from "./Component/Header";
import { useState } from "react";
import Events from "./Component/Events/Events";
import TeamView from "./Component/Team/TeamView";
import TeamTracking from "./Component/Team/TeamTracking";

// If you're using the union type
type TabView = "events" | "teamView" | "teamTracking";

export default function Home() {
  const [showAddEventForm, setShowAddEventForm] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<TabView>("teamView");

  return (
    <div className="bg-white">
      <Header
        setShowAddEventForm={setShowAddEventForm}
        showAddEventForm={showAddEventForm}
        setActiveTab={setActiveTab}
        activeTab={activeTab}
      />
      {activeTab == "events" ? (
        <Events />
      ) : activeTab == "teamView" ? (
        <TeamView />
      ) : activeTab == "teamTracking" ? (
        <TeamTracking />
      ) : (
        <p>Nothing to show!</p>
      )}
    </div>
  );
}
