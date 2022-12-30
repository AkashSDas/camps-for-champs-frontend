import { Box, Center, HStack, Image, Text, VStack } from "@chakra-ui/react";

import { theme as customTheme } from "../../lib/chakra";
import { pxToRem } from "../../lib/pxToRem";

export default function Promotion() {
  function Services() {
    return (
      <HStack justifyContent="center" alignItems="center" gap={pxToRem(32)}>
        {["🌍 Solo", "🐶 Pets", "🥮 Food", "🏔️ View"].map((service) => (
          <Center
            key={service}
            fontFamily="heading"
            h={pxToRem(36)}
            px={pxToRem(16)}
            bg="white"
            rounded="full"
          >
            {service}
          </Center>
        ))}
      </HStack>
    );
  }

  return (
    <VStack
      w={pxToRem(660)}
      p={pxToRem(48)}
      rounded="3xl"
      bg={customTheme.colors.brand.lightOrange}
      alignItems="center"
      justifyContent="center"
      gap={pxToRem(32)}
    >
      <Services />

      <Box mixBlendMode="luminosity">
        <Image
          w={pxToRem(548)}
          h={pxToRem(400)}
          src="https://media.giphy.com/media/l0MYC0LajbaPoEADu/giphy.gif"
          alt="Welcome gif"
          objectFit="cover"
          rounded="3xl"
        />
      </Box>

      <Text fontSize="xl" fontWeight="semibold">
        Adventure is allowed
      </Text>
    </VStack>
  );
}
