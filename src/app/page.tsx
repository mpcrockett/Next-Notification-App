"use client"
import { Therapist, Notification } from "@/utils/Types";
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
  const [roomId, setRoomId] = useState<string | null>('');
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

  const rooms: string[] = [
   '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'
  ];

  const therapists: Array<Therapist> = [
    {
      id: 1,
      name: "Dr. John Doe",
      email: "email",
      password: "password", 
    },
    {
      id: 2,
      name: "Dr. Jane Doe",
      email: "email",
      password: "password"
    },
    {
      id: 3,
      name: "Dr. John Smith",
      email: "email",
      password: "password"
    },
    {
      id: 4,
      name: "Dr. Jane Smith",
      email: "email",
      password: "password"
    },
  ];

  const apptTimeFramework = createListCollection({
    items: times.map((time) => ({
      label: time,
      value: time,
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
        room: roomId,
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
            {rooms.map((room, index) => (
              <Button
                key={index}
                onClick={() => setRoomId(room)}
                colorPalette={room === roomId ? "red" : "gray"}
              >
                {room}
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