"use client";
import { useState } from "react";
import moment from "moment";

interface Event {
  clientName: string;
  startTime: string;
  endTime: string;
  description: string;
  memberId: number | null;
}

interface AddEventFormProps {
  onAddEvent: (newEvent: Event) => void;
}

export default function AddEventForm({ onAddEvent }: AddEventFormProps) {
  const [clientName, setClientName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");
  const [memberId, setMemberId] = useState<number | null>(null);

  const handleAddEvent = () => {
    if (!clientName || !startTime || !endTime || !description) {
      alert("Please fill in all fields.");
      return;
    }

    if (moment(startTime).isAfter(moment(endTime))) {
      alert("Start time must be before end time.");
      return;
    }

    const newEvent: Event = {
      clientName,
      startTime,
      endTime,
      description,
      memberId,
    };

    console.log("startTime: ", startTime);
    console.log("endTime: ", endTime);

    onAddEvent(newEvent);

    // Reset form fields
    setClientName("");
    setStartTime("");
    setEndTime("");
    setDescription("");
    setMemberId(null);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2">Add New Event</h3>
      <div className="grid grid-cols-2 gap-3">
        <input
          type="text"
          className="p-2 border rounded"
          placeholder="Client Name"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
        />
        <input
          type="text"
          className="p-2 border rounded"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="datetime-local"
          className="p-2 border rounded"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
        <input
          type="datetime-local"
          className="p-2 border rounded"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
        <input
          type="number"
          className="p-2 border rounded"
          placeholder="Member ID (Optional)"
          value={memberId ?? ""}
          onChange={(e) =>
            setMemberId(e.target.value ? parseInt(e.target.value) : null)
          }
        />
      </div>
      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={handleAddEvent}
      >
        Add Event
      </button>
    </div>
  );
}
