"use client"
import { Box, Button, createListCollection, Flex, Heading, SelectContent, SelectItem, SelectLabel, SelectRoot, SelectTrigger, SelectValueText, SimpleGrid } from "@chakra-ui/react";
import { useState } from "react";


export default function Home() {

  const [roomId, setRoomId] = useState<number | null>(0);
  const [therapistId, setTherapistId] = useState<number | null>(0);

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

  const therapists = [
    {
      id: 1,
      name: "Dr. John Doe",
    },
    {
      id: 2,
      name: "Dr. Jane Doe",
    },
    {
      id: 3,
      name: "Dr. John Smith"
    },
    {
      id: 4,
      name: "Dr. Jane Smith"
    },
  ];

  const frameworks = createListCollection({
    items: therapists.map((therapist) => ({
      label: therapist.id,
      value: therapist.name,
    })),
  })

  return (
    <Flex>
      <Box>
        <h1>Logo</h1>
      </Box>
      <Box>
        <h1>Appointment Time</h1>
      </Box>
      <Box>
        <SelectRoot collection={frameworks} size="sm" width="320px">
          <SelectLabel>Select Therapist</SelectLabel>
          <SelectTrigger>
            <SelectValueText placeholder="Select therapist" />
          </SelectTrigger>
          <SelectContent>
            {frameworks.items.map((therapist) => (
              <SelectItem item={therapist} key={therapist.label}>
                {therapist.value}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
      </Box>
      <Box>
        <Heading>Select a Room</Heading>
        <SimpleGrid columns={3} gap={6}>
          {Object.keys(rooms).map((key) => (
            <Button key={key} onClick={() => setRoomId(parseInt(key))} size="xl">
              {rooms[parseInt(key)]}
            </Button>
          ))}
        </SimpleGrid>
      </Box>
    </Flex>

  );
}
