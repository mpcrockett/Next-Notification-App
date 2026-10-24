import useNotifications from "@/utils/hooks/useNotifications"
import { Avatar, HStack, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react"


export default function NotificationTable() {
  const notifications = useNotifications();

  return (
    <TableContainer maxW="800px" mx="auto" mt={10} px={6}>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>Therapist</Th>
            <Th>Appointment Time</Th>
            <Th>Room number</Th>
            <Th>Time Sent</Th>
          </Tr>
        </Thead>
        <Tbody>
          {notifications.map((x) => ( 
            <Tr key={x.id}>
              <Td py={2}>
                <HStack spacing={3}>
                  <Avatar size="sm" name={x.user?.name} src={x.user?.image} />
                  <Text>{x.user?.name}</Text>
                </HStack>
              </Td>
              <Td>{x.apptTime}</Td>
              <Td>{x.roomNumber}</Td>
              <Td>{x.createdAt}</Td>
            </Tr> )
          )}
        </Tbody>
      </Table>
    </TableContainer>
  )
};