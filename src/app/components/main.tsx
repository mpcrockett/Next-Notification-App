'use client';
import NotificationForm from "./notificationForm";
import NotificationTable from "./notificationTable";
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

export default function Main() {
  return (
    <Tabs variant="soft-rounded" colorScheme="blue" size="sm" isLazy>
      <Box maxW="400px" mx="auto" mt={8} px={6}>
        <TabList bg="gray.100" p={1} borderRadius="full">
          <Tab flex={1}>Send a Notification</Tab>
          <Tab flex={1}>View Notifications</Tab>
        </TabList>
      </Box>
      <TabPanels>
        <TabPanel p={0}>
          <NotificationForm />
        </TabPanel>
        <TabPanel p={0}>
          <NotificationTable />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
