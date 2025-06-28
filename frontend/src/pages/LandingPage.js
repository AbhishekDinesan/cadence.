import React from "react"
import Navbar from '../components/navbar';
import {Button, Box, Center, Stack, MotionBox, Heading, Highlight, Text} from "@chakra-ui/react"
import { useNavigate } from 'react-router-dom';

export default function LandingPage(){
    const navigate = useNavigate();
    return (
    <Stack>
        <Center>
            <Heading fontSize={"7xl"}>Cadence.. </Heading>
        </Center>
        <Center mt={10}>
        <Text>
        working and collaborating on music shouldn't be hard
        </Text>
        </Center>
        <Center mt={10}>
            <Button onClick={() => navigate("/composer")} m={5}> Composer Mode </Button>
            <Button m={5}> Login with Spotify </Button>
        </Center>
    </Stack>
    )
}
