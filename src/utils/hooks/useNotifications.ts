import { useState, useEffect } from 'react';
import { iNotification } from '../Types';
import { useSession } from 'next-auth/react';

export default function useNotifications() {
  const [notifications, setNotifications] = useState<iNotification[]>([]);
  const { status } = useSession();

  useEffect(() => {
    if (status !== "authenticated") return;
    fetch('/api/notifications')
      .then(response => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if(data) return setNotifications(data.notifications);
        return
      })
      .catch((error) => {
        console.error("Error fetching notifications", error);
      });
  }, [status]);

  return notifications;
};

