import { useState, useEffect } from 'react';
import { iNotification } from '../Types';
import { useSession } from 'next-auth/react';

export default function useNotifications() {
  const [notifications, setNotifications] = useState<iNotification[]>([]);
  const { status } = useSession();

  useEffect(() => {
    if (status !== "authenticated") return;

    let timeout: ReturnType<typeof setTimeout> | undefined;
    let controller: AbortController | undefined;

    const poll = async () => {
      clearTimeout(timeout);
      controller?.abort();
      controller = new AbortController();
      try {
        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);
        const params = new URLSearchParams({ since: startOfToday.toISOString() });        const response = await fetch(`/api/notifications?${params}`, { signal: controller.signal });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        if (Array.isArray(data?.notifications)) {
          setNotifications(prev =>
            prev.length === data.notifications.length && prev[0]?.id === data.notifications[0]?.id
              ? prev
              : data.notifications
          );
        }
      } catch (error) {
        if ((error as Error).name === "AbortError") return;
        console.error("Error fetching notifications", error);
      }
      if (!document.hidden) timeout = setTimeout(poll, 10000);
    };

    // Pause polling in background tabs and refresh immediately on return
    const onVisibilityChange = () => {
      if (document.hidden) clearTimeout(timeout);
      else poll();
    };

    poll();
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      clearTimeout(timeout);
      controller?.abort();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [status]);

  return notifications;
};
