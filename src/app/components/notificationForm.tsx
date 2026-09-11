"use client";
import useProviders from "@/utils/hooks/useProviders";
import { iForm } from "@/utils/Types";
import { useState } from "react";

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

export default function NotificationForm() {
    const providers = useProviders();

    const [formData, setFormData] = useState<iForm>({
      apptTime: '',
      roomNumber: '',
      userId: 0,
      message: ''
    });

    const [includeMessage, setIncludeMessage] =useState<boolean>(false);
  
    const [submitting, setSubmitting] = useState<boolean>(false)
  
    const postNotification = async (form: iForm) => {
      try {
        return await fetch('/api/notifications/notification', {
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
  
    const handleSubmit = (formData: iForm) => {
      setSubmitting(true)
      postNotification(formData).then(() => {
        setSubmitting(false);
      });
       setFormData({
        apptTime: formData.apptTime,
        roomNumber: '',
        userId: 0,
        message: ''
      });
      setIncludeMessage(false);
    };
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
      <select name="userId" value={formData.userId} onChange={handleChange}>
        <option value="">Therapist</option>
        {providers.length > 0 && providers.map((provider) => (
          <option key={provider.id} value={provider.id}>{provider.name}</option>
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
        <fieldset>
        <legend>Include Message?</legend>
          <label key="no">
            <input
              type="radio"
              name="nolabel"
              value='No'
              checked={includeMessage === false}
              onChange={() => {
                setIncludeMessage(false)
              }}
            />
            No
          </label>
          <label key="yes">
            <input
              type="radio"
              name="yeslabel"
              value='Yes'
              checked={includeMessage === true}
              onChange={() => {
                setIncludeMessage(true)
              }}
            />
            Yes
          </label>
      </fieldset>
      {includeMessage && 
      <input
        type="text"
        id="message"
        name="message"
        value={formData.message}
        onChange={handleChange} 
        placeholder="Type your message.."
        minLength={4}
        maxLength={250}
       />}
    
      <button type="button" onClick={() => handleSubmit(formData)} disabled={submitting}>
        {submitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  )
};