"use client"
import { Room, Therapist } from "@/utils/Types";
import {
  Box,
  Button,
  createListCollection,
  Flex,
  Heading,
  SimpleGrid,
  Spinner
} from "@chakra-ui/react";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select"

import { useState } from "react";


export default function Home() {

  const [apptTime, setApptTime] = useState<string[]>([]);
  const [roomId, setRoomId] = useState<number | null>(0);
  const [therapistId, setTherapistId] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState<boolean>(false)

  const times = [
    '07:00',
    '07:45',
    '08:30',
    '09:15',
    '10:00',
    '10:45',
    '11:30',
    '12:15',
    '13:00',
    '13:45',
    '14:30',
    '15:15',
    '16:00',
    '16:45',
    '17:30',
    '18:15',
    '19:00',
  ];

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

  const therapists: Array<Therapist> = [
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

  const apptTimeFramework = createListCollection({
    items: times.map((time, index) => ({
      label: time,
      value: index,
    })),
  })

  const therapistFramework = createListCollection({
    items: therapists.map((therapist) => ({
      label: therapist.name,
      value: therapist.id,
    })),
  });

  const handleSubmit = () => {
    setSubmitting(true);
    setTimeout(() => {
      console.log({
        apptTime: apptTime[0],
        roomId,
        therapistId: therapistId[0],
      });

      setSubmitting(false);
      alert('Submitted')
    }, 2000);
    
  }

  return (
    <Flex justifyContent='center'>
      <Flex justifyContent='center' id="MainBox" flexDirection={"column"} p={"40px"} w="500px">
        <Box>
          <h1>Logo</h1>
        </Box>

        <Box>
          <SelectRoot collection={apptTimeFramework} size="sm" width="320px" padding="5px" value={apptTime} onValueChange={(e) => setApptTime(e.value)}>
            <SelectLabel>Select Appointment Time</SelectLabel>
            <SelectTrigger>
              <SelectValueText padding="4px" placeholder="Select appointment time" />
            </SelectTrigger>
            <SelectContent padding="4px">
              {apptTimeFramework.items.map((time) => (
                <SelectItem item={time} key={time.value}>
                  {time.label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
        </Box>

        <Box>
          <SelectRoot collection={therapistFramework} size="sm" width="320px" padding="5px" value={therapistId} onValueChange={(e) => setTherapistId(e.value)}>
            <SelectLabel>Select Therapist</SelectLabel>
            <SelectTrigger>
              <SelectValueText padding="4px" placeholder="Select therapist" />
            </SelectTrigger>
            <SelectContent padding="4px">
              {therapistFramework.items.map((therapist) => (
                <SelectItem item={therapist} key={therapist.value}>
                  {therapist.label}
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

        <Box p='20px'justifyContent='center' w='100%'>
          <Button w='100px' onClick={handleSubmit}>
            {submitting ? <Spinner /> : "Submit"}
          </Button> 
        </Box>
      </Flex>
    </Flex>


  );
}