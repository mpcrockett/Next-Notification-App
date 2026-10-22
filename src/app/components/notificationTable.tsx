import useNotifications from "@/utils/hooks/useNotifications"
import { Text } from "@chakra-ui/react"

export default function NotificationTable() {
  const notifications = useNotifications();
 
  return (
   <Text>Hello World!</Text>
  )
};