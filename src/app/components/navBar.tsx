'useClient';
import { Box, Flex, Image, Text, Spacer, Button } from '@chakra-ui/react';

interface Props {
  name: string,
  image: string,
  signOut: ({}) => void,
}

export function Navbar(props: Props) {
  return (
    <Box bg="blue.600" px={6} py={3} shadow="md">
      <Flex align="center">
        <Image src='/logo.png' alt="Clinic logo" h="40px" />
        <Spacer />
        <Text color="white" fontWeight="semibold">Welcome, {props.name}!</Text>
        <Spacer />
        <Button
          size="sm"
          variant="outline"
          colorScheme="whiteAlpha"
          onClick={() => props.signOut({ callbackUrl: '/' })}
        >
          Sign Out
        </Button>
      </Flex>
    </Box>
  );
}