import useNotifications from "@/utils/hooks/useNotifications"
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"


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
              <Td>{x.userId}</Td>
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