"use client"
import { Therapist, iForm } from "@/utils/Types";
import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState<iForm>({
    apptTime: '',
    roomNumber: '',
    therapistId: 0,
  });

  const [submitting, setSubmitting] = useState<boolean>(false)

  const postNotification = async (form: iForm) => {
    try {
      console.log('post function')
      return await fetch('http://localhost:3001/api/notifications/notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
    } catch (error) {
      console.log(error);
    }
  };

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

  const handleSubmit = (formData: iForm) => {
    setSubmitting(true)
    postNotification(formData).then(() => {
        setSubmitting(false);
    });  
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
        {rooms.map((roomNumber) => (
          <label key={roomNumber}>
            <input
              type="radio"
              name="roomNumber"
              value={roomNumber}
              checked={formData.roomNumber === roomNumber}
              onChange={handleChange}
            />
            {roomNumber}
          </label>
        ))}
      </fieldset>
      <button type="button" onClick={() => handleSubmit(formData)} disabled={submitting}>
        {submitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}