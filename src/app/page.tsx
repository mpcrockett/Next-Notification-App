"use client"
import { Therapist, iForm } from "@/utils/Types";
import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState<iForm>({
    apptTime: '',
    room: '',
    therapistId: '',
  });

  const [submitting, setSubmitting] = useState<boolean>(false)

  const times = [
    '07:00',
    '07:45',
    '08:30',
    '09:15',
    '10:00',
    '10:45',
    '11:30',
    '12:15',
    '13:00',
    '13:45',
    '14:30',
    '15:15',
    '16:00',
    '16:45',
    '17:30',
    '18:15',
    '19:00',
  ];

  const rooms: string[] = [
   '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'
  ];

  const therapists: Array<Therapist> = [
    {
      id: 1,
      name: "Dr. John Doe",
      email: "email",
      password: "password", 
    },
    {
      id: 2,
      name: "Dr. Jane Doe",
      email: "email",
      password: "password"
    },
    {
      id: 3,
      name: "Dr. John Smith",
      email: "email",
      password: "password"
    },
    {
      id: 4,
      name: "Dr. Jane Smith",
      email: "email",
      password: "password"
    },
  ];

  const handleSubmit = () => {
    setSubmitting(true);
    setTimeout(() => {
      console.log(formData);
      sendDiscordNotification(formData);
      setSubmitting(false);
      alert('Submitted')
    }, 2000);
    
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form>
      <select name="apptTime" value={formData.apptTime} onChange={handleChange}>
        <option value="">Appointment Time</option>
        {times.map((time) => (
          <option key={time} value={time}>{time}</option>
        ))}
      </select>
      <select name="therapistId" value={formData.therapistId} onChange={handleChange}>
        <option value="">Therapist</option>
        {therapists.map((therapist) => (
          <option key={therapist.id} value={therapist.id}>{therapist.name}</option>
        ))}
      </select>
      <fieldset>
        <legend>Select a Room</legend>
        {rooms.map((room) => (
          <label key={room}>
            <input
              type="radio"
              name="room"
              value={room}
              checked={formData.room === room}
              onChange={handleChange}
            />
            {room}
          </label>
        ))}
      </fieldset>
      <button type="button" onClick={handleSubmit} disabled={submitting}>
        {submitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}