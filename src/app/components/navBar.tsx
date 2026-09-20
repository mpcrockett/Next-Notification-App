'useClient';
import { Avatar, Box, Flex, Text, Spacer, Button } from '@chakra-ui/react';

interface Props {
  name: string,
  image: string,
  signOut: ({}) => void,
}

export function Navbar(props: Props) {
  return (
    <Box bg="blue.600" px={6} py={3} shadow="md">
      <Flex align="center">
        <Avatar size="sm" src={props.image} mr={3} />
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