import PublicCamps from "../components/camps/public-camps";
import { pxToRem } from "../lib/chakra-ui";
import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";

export default function HomePage() {
  return (
    <VStack mx={pxToRem(24)}>
      <Header />
      <PublicCamps />
    </VStack>
  );
}

function Header() {
  return (
    <HStack
      as="section"
      mt={pxToRem(48)}
      px={pxToRem(72)}
      py={pxToRem(48)}
      gap={pxToRem(32)}
      backgroundColor="b.orange1"
      rounded="3xl"
    >
      <VStack maxW={pxToRem(582)} gap={pxToRem(24)} alignItems="start">
        <Heading size="4xl">
          Get some time to{" "}
          <Box as="span" className="orange-text-gradient">
            live
          </Box>
        </Heading>

        <Text fontWeight="medium">
          Have fun and spend time with your friends, family, pet OR go solo.
          Find a camp for your requirements!
        </Text>

        <Button variant="solid">Book your camp</Button>
      </VStack>

      <Box mixBlendMode="luminosity">
        <Image
          w={pxToRem(614)}
          h={pxToRem(422)}
          src="https://media.giphy.com/media/j7wBU7aHcKf7y/giphy.gif"
          alt="Welcome gif"
          objectFit="cover"
          rounded="3xl"
        />
      </Box>
    </HStack>
  );
}
