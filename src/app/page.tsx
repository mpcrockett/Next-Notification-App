"use client"

import { iForm, iUser } from "@/utils/Types";
import { useState } from "react";
import NotificationForm from "./components/notificationForm";
import useProviders from "@/utils/hooks/useProviders";
import RegistrationForm from "./components/registrationForm";


export default function Home() {
  const providers = useProviders();
  const [user] = useState<iUser | null>(null);
  const [formData, setFormData] = useState<iForm>({
    apptTime: '',
    roomNumber: '',
    userId: 0,
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
      userId: 0,
    })
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      {!user && (
        <h2>Sign In with your <a href="/api/auth/signin">Google Account</a></h2>
      )}
      <NotificationForm 
        providers={providers}
        submitting={submitting}
        formData={formData}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
    </>

  );
}