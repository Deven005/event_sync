import { getRandomLightColor } from "@/Utils/Utils";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Timeline, {
  TimelineGroupBase,
  TimelineItemBase,
} from "react-calendar-timeline";
import AddEventForm from "../Events/AddEventForm";

// Type definitions for events and members
interface Event {
  clientName: string;
  startTime: string; // Start time in ISO format "YYYY-MM-DD HH:mm"
  endTime: string; // End time in ISO format "YYYY-MM-DD HH:mm"
  description: string;
  memberId: number | null; // Assigned member's ID, or null if unassigned
}

// Sample members and their schedules
const members = Array.from({ length: 5 }, (_, i) => `Member ${i + 1}`);

// Sample events with start and end time (including date)
let events: Event[] = [
  {
    clientName: "John Doe",
    startTime: "2024-03-18 09:30",
    endTime: "2024-03-18 10:10",
    description: "Meeting with Client A",
    memberId: 0, // Assigned to Member 1
  },
  {
    clientName: "Jane Smith",
    startTime: "2024-03-18 11:00",
    endTime: "2024-03-18 11:45",
    description: "Event Planning Discussion",
    memberId: 1, // Assigned to Member 2
  },
  {
    clientName: "Robert Brown",
    startTime: "2024-03-18 13:00",
    endTime: "2024-03-18 13:45",
    description: "Team Sync-Up",
    memberId: 2, // Assigned to Member 3
  },
  {
    clientName: "Emily Davis",
    startTime: "2024-03-18 15:00",
    endTime: "2024-03-18 15:30",
    description: "Strategy Session",
    memberId: 3, // Assigned to Member 4
  },
  {
    clientName: "Michael Johnson",
    startTime: "2024-03-18 16:00",
    endTime: "2024-03-18 17:00",
    description: "Client Feedback Review",
    memberId: 4, // Assigned to Member 5
  },
  {
    clientName: "Sarah Lee",
    startTime: "2024-03-18 10:00",
    endTime: "2024-03-18 10:45",
    description: "Design Review Meeting",
    memberId: null, // Unassigned
  },
  {
    clientName: "William Brown",
    startTime: "2024-03-18 12:00",
    endTime: "2024-03-18 12:45",
    description: "Budget Planning",
    memberId: null, // Unassigned
  },
];

const TeamView = () => {
  const [isClientSide, setIsClientSide] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<string>("unassigned"); // Default tab is "unassigned"
  const [items, setItems] = useState<TimelineItemBase<number>[]>([]);
  const [groups, setGroups] = useState<TimelineGroupBase[]>([]);
  const [assignedEvents, setAssignedEvents] = useState<Event[]>([]);
  const [showAddEventForm, setShowAddEventForm] = useState<boolean>(false); // State to toggle the form visibility
  // List of assigned members
  const assignedList = [0, 1, 2, 3, 4]; // Assume that memberId from 0 to 4 are assigned

  // Ensure the code runs only on the client side
  useEffect(() => {
    setIsClientSide(true);
    setGroups([
      ...members.map(
        (member, index) =>
          ({
            id: index,
            title: member,
          } as TimelineGroupBase)
      ),
    ]);
    setItems([
      ...events.map(
        (event, index) =>
          ({
            id: index + 1,
            group: event.memberId ?? -1,
            title: event.clientName,
            start_time: moment(event.startTime, "YYYY-MM-DD HH:mm").valueOf(),
            end_time: moment(event.endTime, "YYYY-MM-DD HH:mm").valueOf(),
            itemProps: {
              "aria-hidden": true,
              className: "weekend",
              style: {
                background: getRandomLightColor(),
                color: "black",
              },
            },
          } as TimelineItemBase<number>)
      ),
    ]);
    setAssignedEvents([
      ...events.filter(
        (event) =>
          event.memberId !== null && assignedList.includes(event.memberId)
      ),
    ]);
  }, [events]);

  const defaultTimeStart = moment(
    "2024-03-18 08:00",
    "YYYY-MM-DD HH:mm"
  ).valueOf();
  const defaultTimeEnd = moment(
    "2024-03-20 20:00",
    "YYYY-MM-DD HH:mm"
  ).valueOf();

  // Function to add a new event
  const handleAddEvent = (newEvent: Event) => {
    setItems((prevItems) => [
      ...prevItems,
      {
        id: prevItems.length + 1,
        group: newEvent.memberId ?? -1,
        title: newEvent.clientName,
        start_time: moment(newEvent.startTime).valueOf(),
        end_time: moment(newEvent.endTime).valueOf(),
        itemProps: {
          "aria-hidden": true,
          className: "weekend",
          style: {
            background: getRandomLightColor(),
            color: "black",
          },
        },
      },
    ]);
    setAssignedEvents((prevEvents) => [...prevEvents, newEvent]);
    setShowAddEventForm(false); // Hide form after adding event
  };

  // Function to assign a random member to all unassigned events
  const assignAllEvents = () => {
    const totalMembers = 5; // Assume you have 5 members (0 to 4)

    // Map through events and assign a random memberId to unassigned events
    const updatedEvents = events.map((event) => {
      if (event.memberId === null) {
        const randomMemberId = Math.floor(Math.random() * totalMembers); // Generate a random memberId (0-4)
        return { ...event, memberId: randomMemberId };
      }
      return event; // If already assigned, leave it as it is
    });

    // setEvents(updatedEvents); // Update the events with new memberId
    events = updatedEvents;

    // Convert updated events to the TimelineItemBase format
    setItems([
      ...updatedEvents.map(
        (event, index) =>
          ({
            id: index + 1,
            group: event.memberId ?? -1, // If memberId is null, use -1
            title: event.clientName,
            start_time: moment(event.startTime, "YYYY-MM-DD HH:mm").valueOf(),
            end_time: moment(event.endTime, "YYYY-MM-DD HH:mm").valueOf(),
            itemProps: {
              "aria-hidden": true,
              className: "weekend",
              style: {
                background: getRandomLightColor(), // Assuming getRandomLightColor() is a function that generates a random color
                color: "black",
              },
            },
          } as TimelineItemBase<number>)
      ),
    ]);
  };

  // Do not render the calendar view if it's not on the client side
  if (!isClientSide) {
    return null; // Or show a loading indicator
  }
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Layout with 3 columns */}
        <div className="grid grid-cols-3 gap-4 p-4">
          {/* Column 1 & 2: Timeline */}
          <div style={{ height: "500px" }} className="col-span-2">
            <Timeline
              groups={groups} // Pass groups (members) to the timeline
              items={items} // Pass events (items) to the timeline
              defaultTimeStart={defaultTimeStart} // Default start time (9 AM)
              defaultTimeEnd={defaultTimeEnd} // Default end time (6 PM)
            />
          </div>

          {/* Column 3: Assigned and Unassigned Tasks */}
          <div className="overflow-auto max-h-[500px] border-l p-4 bg-gray rounded-lg shadow-md">
            <div className="tabs">
              <button
                className={`tab ${
                  selectedTab === "unassigned" ? "active" : ""
                }`}
                onClick={() => setSelectedTab("unassigned")}
              >
                Unassigned Tasks
              </button>
              <button
                className={`tab ${selectedTab === "assigned" ? "active" : ""}`}
                onClick={() => setSelectedTab("assigned")}
              >
                Assigned Tasks
              </button>
            </div>

            {/* Add Event Form */}
            {showAddEventForm && (
              <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
                <div className="bg-white w-full max-w-[50%] h-auto max-h-[90vh] p-6 rounded-lg shadow-lg overflow-auto relative">
                  <button
                    className="absolute top-4 right-4 text-lg font-bold text-gray-700 hover:text-gray-900"
                    onClick={() => setShowAddEventForm(false)}
                  >
                    ✖
                  </button>
                  <h2 className="text-xl font-semibold mb-4">Add New Event</h2>
                  <AddEventForm onAddEvent={handleAddEvent} />
                </div>
              </div>
            )}

            {/* Show Assigned or Unassigned Tasks */}
            {selectedTab === "assigned" && assignedEvents.length > 0 && (
              <>
                {assignedEvents.map((event, index) => (
                  <div key={index}>
                    <div className="border rounded bg-white shadow-sm mb-2">
                      <div className="p-2 grid grid-cols-2 gap-3">
                        <div>
                          <div className="font-semibold">
                            {event.clientName}
                          </div>
                          <div className="text-sm text-gray-600">
                            {event.description}
                          </div>
                          <div className="text-sm text-gray-600">
                            From: {moment(event.startTime).format("HH:mm")} To:{" "}
                            {moment(event.endTime).format("HH:mm")}
                          </div>
                        </div>
                        <div className="text-center">
                          <p>{event.memberId?.toString()}</p>
                        </div>
                      </div>
                    </div>
                    <div className="divider" />
                  </div>
                ))}
              </>
            )}

            {selectedTab === "unassigned" &&
              events.filter((event) => event.memberId === null).length > 1 && (
                <>
                  <div className="assigned mb-4" onClick={assignAllEvents}>
                    <p>Assign All</p>
                  </div>
                  {events
                    .filter((event) => event.memberId === null)
                    .map((event, index) => (
                      <div key={index}>
                        <div className="border rounded bg-white shadow-sm mb-2">
                          <div className="p-2 grid grid-cols-2 gap-3">
                            <div>
                              <div className="font-semibold">
                                {event.clientName}
                              </div>
                              <div className="text-sm text-gray-600">
                                {event.description}
                              </div>
                              <div className="text-sm text-gray-600">
                                From: {moment(event.startTime).format("HH:mm")}{" "}
                                To: {moment(event.endTime).format("HH:mm")}
                              </div>
                            </div>
                            <div className="text-center">
                              <p>{event.memberId?.toString() ?? "NA"}</p>
                              <div className="assigned">Assign</div>
                            </div>
                          </div>
                        </div>
                        <div className="divider" />
                      </div>
                    ))}
                </>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamView;
