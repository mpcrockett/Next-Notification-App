'use client';
import { useState } from "react";
import NotificationForm from "./notificationForm";
import NotificationTable from "./notificationTable";
import { Box, Button } from "@chakra-ui/react";

export default function Main() {
  const [tableView, setTableView] = useState<boolean>(false);

  return (
    <div>
      <Box maxW="500px" mx="auto" mt={10} px={6} >
        <Button px={6} colorScheme='blue' variant='link' onClick={() => setTableView(false)}>Send a Notifications</Button>  
        <Button px={6} colorScheme='blue' variant='link'onClick={() => setTableView(true)}>View Notifications</Button>
      </Box>
      { tableView ?  <NotificationTable /> : <NotificationForm /> }
    </div>
  );
}