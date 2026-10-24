import useNotifications from "@/utils/hooks/useNotifications"
import { Avatar, Box, HStack, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react"

const timeFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "short",
  timeStyle: "short",
});

export default function NotificationTable() {
  const notifications = useNotifications();

  return (
    <Box maxW="720px" mx="auto" mt={10} px={6}>
      <TableContainer w="100%" maxH="450px" overflowX="auto" overflowY="auto">
        <Table variant='simple' size="sm" fontSize="sm" sx={{ "th, td": { px: 3, py: 1.5 } }}>
          <Thead position="sticky" top={0} zIndex={1} bg="white">
            <Tr>
              <Th>Time Sent</Th>
              <Th>Therapist</Th>
              <Th>Appointment Time</Th>
              <Th>Room number</Th>
            </Tr>
          </Thead>
          <Tbody>
            {notifications.map((x) => ( 
              <Tr key={x.id}>
                <Td>{x.createdAt ? timeFormatter.format(new Date(x.createdAt)) : "—"}</Td>
                <Td>
                  <HStack spacing={2}>
                    <Avatar size="xs" name={x.user?.name} src={x.user?.image} />
                    <Text>{x.user?.name}</Text>
                  </HStack>
                </Td>
                <Td>{x.apptTime}</Td>
                <Td>{x.roomNumber}</Td>
              </Tr> )
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
};