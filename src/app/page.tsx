"use client"
import { Room } from "@/utils/Types";
import { Box, Button, createListCollection, Flex, Heading, SelectContent, SelectItem, SelectLabel, SelectRoot, SelectTrigger, SelectValueText, SimpleGrid } from "@chakra-ui/react";
import { useState } from "react";


export default function Home() {

  const [roomId, setRoomId] = useState<number | null>(0);
  const [therapistId, setTherapistId] = useState<number | null>(0);

  const rooms: Array<Room> = [
    {
      'id': 1,
      'name': "Room 1"
    },
    {
      'id': 2,
      'name': "Room 2"
    },
    {
      'id': 3,
      'name': "Room 3"
    },
    {
      'id': 4,
      'name': "Room 4"
    },
    {
      'id': 5,
      'name': "Room 5"
    },
    {
      'id': 6,
      'name': "Room 6"
    },
    {
      'id': 7,
      'name': "Room 7"
    },
    {
      'id': 9,
      'name': "Room 9"
    },
    {
      'id': 10,
      'name': "Room 10" 
    },
    {
      'id': 11,
      'name': "Room 11"
    },
    {
      'id': 12,
      'name': "Room 12"
    }
  ];

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
    <Flex id="MainBox">
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
          {rooms.map((room) => (
            <Button
              key={room.id}
              onClick={() => setRoomId(room.id)}
              colorPalette={room.id === roomId ? "red" : "gray"}
            >
              {room.name}
            </Button>
          ))}
        </SimpleGrid>
      </Box>
    </Flex>

  );
}
