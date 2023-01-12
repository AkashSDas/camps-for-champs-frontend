import { Box, Center, HStack, Image, Text, VStack } from "@chakra-ui/react";

import { pxToRem } from "../../lib/chakra-ui";

export default function PromotionCard(): JSX.Element {
  function Services(): JSX.Element {
    return (
      <HStack justifyContent="center" alignItems="center" gap={pxToRem(32)}>
        {["🌍 Solo", "🐶 Pets", "🥮 Food", "🏔️ View"].map((service) => (
          <Center
            key={service}
            fontFamily="heading"
            h={pxToRem(36)}
            px={pxToRem(16)}
            bg="b.grey0"
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
      as="aside"
      w={pxToRem(600)}
      rounded={pxToRem(50)}
      gap={pxToRem(32)}
      alignItems="center"
      py={pxToRem(32)}
      bg="b.orange1"
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

      <Text fontSize="xl" fontWeight="medium" color="b.grey4">
        Adventure is allowed
      </Text>
    </VStack>
  );
}
