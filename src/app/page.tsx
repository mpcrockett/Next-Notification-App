"use client"
import useTherapists from "@/utils/hooks/useTherapists";
import { iForm } from "@/utils/Types";
import { useState } from "react";
import NotificationForm from "./components/notificationForm";


export default function Home() {
  const therapists = useTherapists();
  const [formData, setFormData] = useState<iForm>({
    apptTime: '',
    roomNumber: '',
    therapistId: 0,
  });

  const [submitting, setSubmitting] = useState<boolean>(false)

  const postNotification = async (form: iForm) => {
    try {
      console.log('post function')
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
      therapistId: 0,
    })
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <NotificationForm 
        therapists={therapists}
        submitting={submitting}
        formData={formData}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
    </>

  );
}