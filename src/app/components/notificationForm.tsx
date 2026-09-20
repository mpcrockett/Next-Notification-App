"use client";
import useProviders from "@/utils/hooks/useProviders";
import { iForm } from "@/utils/Types";
import { useState } from "react";
import { Box, Button, FormLabel, Input, Select, SimpleGrid, Switch, Text, VStack } from '@chakra-ui/react'

const times = [
  '7:00 AM', '7:45 AM', '8:30 AM', '9:15 AM', '10:00 AM', '10:45 AM',
  '11:30 AM', '12:15 PM', '1:00 PM', '1:45 PM', '2:30 PM', '3:15 PM',
  '4:00 PM', '4:45 PM', '5:30 PM', '6:15 PM', '7:00 PM', '7:45 PM'
];

const rooms: string[] = [
  '1', '2', '3', '4', '5', '6', '7', '9', '10', '11', '12'
];

export default function NotificationForm() {
  const providers = useProviders();

  const [formData, setFormData] = useState<iForm>({
    apptTime: '',
    roomNumber: '',
    userId: '',
    message: ''
  });

  const [includeMessage, setIncludeMessage] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleSubmit = async (formData: iForm) => {
    setSubmitting(true);
    try {
      await fetch('/api/notifications/notification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
      setFormData({
        apptTime: formData.apptTime,
        roomNumber: '',
        userId: '',
        message: ''
      });
      setIncludeMessage(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box maxW="500px" mx="auto" mt={10} px={6}>
      <VStack spacing={5} align="stretch">

        <Select name="apptTime" value={formData.apptTime} onChange={handleChange}>
          <option value="">Appointment Time</option>
          {times.map((time) => (
            <option key={time} value={time}>{time}</option>
          ))}
        </Select>

        <Select name="userId" value={formData.userId} onChange={handleChange}>
          <option value="">Therapist</option>
          {providers.length > 0 && providers.map((provider) => (
            <option key={provider.id} value={provider.id}>{provider.name}</option>
          ))}
        </Select>

        <Box>
          <Text fontWeight="semibold" mb={2}>Select a Room</Text>
          <SimpleGrid columns={4} spacing={2}>
            {rooms.map((roomNumber) => (
              <Button
                key={roomNumber}
                as="label"
                colorScheme={formData.roomNumber === roomNumber ? 'blue' : 'gray'}
                variant={formData.roomNumber === roomNumber ? 'solid' : 'outline'}
                size="md"
              >
                <input
                  type="radio"
                  name="roomNumber"
                  value={roomNumber}
                  checked={formData.roomNumber === roomNumber}
                  onChange={handleChange}
                  style={{ display: 'none' }}
                />
                {roomNumber}
              </Button>
            ))}
          </SimpleGrid>
        </Box>

        <Box display="flex" alignItems="center" gap={3}>
          <FormLabel htmlFor="include-message" mb={0}>
            Include Message?
          </FormLabel>
          <Switch
            id="include-message"
            isChecked={includeMessage}
            onChange={() => setIncludeMessage(!includeMessage)}
          />
        </Box>

        {includeMessage && (
          <Input
            type="text"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Type your message..."
            size="sm"
          />
        )}

        <Button
          colorScheme="blue"
          onClick={() => handleSubmit(formData)}
          isLoading={submitting}
          loadingText="Submitting..."
        >
          Submit
        </Button>

      </VStack>
    </Box>
  );
}