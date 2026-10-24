'use client';
import NotificationForm from "./notificationForm";
import NotificationTable from "./notificationTable";
import { Box, Button, Code, HStack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useClipboard } from "@chakra-ui/react";

interface Props {
  userRole: "ADMIN" | "PROVIDER" | "USER" | undefined
  userId: string | undefined
}

export default function Main({ userRole, userId }: Props) {
  const { onCopy, hasCopied } = useClipboard(userId ?? "");

  return (
    <Box>
      <Tabs variant="soft-rounded" colorScheme="blue" size="sm" isLazy>
        <Box maxW="400px" mx="auto" mt={8} px={6}>
          <TabList bg="gray.100" p={1} borderRadius="full">
              { userRole === 'ADMIN' && <Tab flex={1}>Send a Notification</Tab> }
              <Tab flex={1}>View Notifications</Tab>
          </TabList>
        </Box>
        <TabPanels>
          { userRole === 'ADMIN' && 
          <TabPanel p={0}>
            <NotificationForm />
          </TabPanel>
          }
          <TabPanel p={0}>
            <NotificationTable />
          </TabPanel>
        </TabPanels>
      </Tabs>
      { userRole === "PROVIDER" &&
      <HStack justify="center" spacing={2} mt={10} mb={6} px={6} fontSize="sm" color="gray.500" flexWrap="wrap">
        <Text>Your ntfy.sh topic:</Text>
        <Code colorScheme="blue" px={2} py={1} borderRadius="md" fontSize="sm">{userId}</Code>
        <Button size="xs" variant="ghost" colorScheme="blue" onClick={onCopy}>
          {hasCopied ? "Copied!" : "Copy"}
        </Button>
      </HStack>
      }
    </Box>

  );
}
