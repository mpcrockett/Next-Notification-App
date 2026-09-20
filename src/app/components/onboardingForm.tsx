"use client";

import { useState } from 'react';
import { Box, Button, Divider, Heading, Link, Radio, RadioGroup, Stack, Text, VStack } from '@chakra-ui/react'

interface Props {
  onComplete: () => void;
  userId: string | undefined;
}

export default function OnboardingPage({ onComplete, userId }: Props) {
  const [isProvider, setIsProvider] = useState(false);
  const [loading, setLoading] = useState(false);
  const [testSent, setTestSent] = useState(false);

  const handleTestClick = async () => {
    setLoading(true);
    const res = await fetch('/api/notifications/notification/test', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId })
    });

    if (res.ok) {
      setTestSent(true);
    } else {
      alert("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  const handleCompleteClick = async () => {
    setLoading(true);
    const res = await fetch('/api/user/onboard', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, isProvider })
    });

    if (res.ok) {
      onComplete();
    } else {
      alert("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <Box maxW="400px" mx="auto" mt="50px" textAlign="center">
      <Heading size="md" mb={6}>Complete Your Profile</Heading>

      <VStack spacing={6} align="stretch">
        <Box>
          <Text fontWeight="semibold" mb={2}>Select your role:</Text>
          <RadioGroup value={isProvider ? 'pt' : 'admin'}>
            <Stack direction="row" justify="center" spacing={6}>
              <Radio value="pt" onChange={() => setIsProvider(true)}>PT</Radio>
              <Radio value="admin" onChange={() => setIsProvider(false)}>Admin</Radio>
            </Stack>
          </RadioGroup>
        </Box>

        {isProvider && (
          <Stack spacing={3}>
            <Divider />
            <Box>
              <Text mb={2}>Providers, sign up to receive your notifications:</Text>
              <Stack direction="row" justify="center" spacing={4}>
                <Link
                  href="https://apps.apple.com/us/app/ntfy/id1625396347"
                  color="blue.500"
                  isExternal
                >
                  Download for iOS or Mac
                </Link>
                <Link
                  href="https://play.google.com/store/apps/details?id=io.heckel.ntfy"
                  color="blue.500"
                  isExternal
                >
                  Download for Android
                </Link>
              </Stack>
              <Text mt={3} fontSize="sm" color="gray.500">
                Your personal topic is <strong>{userId}</strong>
              </Text>
            </Box>
            <Button
              colorScheme={testSent ? 'green' : 'gray'}
              variant="outline"
              onClick={handleTestClick}
              isLoading={loading}
              loadingText="Sending..."
            >
              {testSent ? '✓ Test Sent!' : 'Send a Test Notification'}
            </Button>
            <Divider />
          </Stack>
        )}

        <Button
          colorScheme="blue"
          onClick={handleCompleteClick}
          isLoading={loading}
          loadingText="Saving..."
          isDisabled={isProvider && !testSent}
        >
          Complete Onboarding
        </Button>
      </VStack>
    </Box>
  );
}