"use client"
import { Box, Button, Flex, SimpleGrid } from "@chakra-ui/react";
import { useState } from "react";


export default function Home() {
  
  const [room, setRoom] = useState<number | null>(0);
  // const [therapist, setTherapist] = useState<number | null>(0);

  const rooms: { [key: number]: string } = {
    1: "Room 1",
    2: "Room 2",
    3: "Room 3",
    4: "Room 4",
    5: "Room 5",
    6: "Room 6",
    7: "Room 7",
    8: "Room 8",
    9: "Room 9",
    10: "Room 10",
    11: "Room 11",
    12: "Room 12",
  };

  return (
    <Flex>
      <Box>
        <h1>Logo</h1>
      </Box>
      <Box>
        <h1>Appointment Time</h1>
      </Box>
      <Box>
        <SimpleGrid columns={3} gap={6}>
          {Object.keys(rooms).map((key) => (
            <Button key={key} onClick={() => setRoom(parseInt(key))} size="xl">
              {rooms[parseInt(key)]}
            </Button>
          ))}
        </SimpleGrid>
      </Box>
    </Flex>

  );
}
