import { ArrowDownIcon } from "../icons";
import { pxToRem } from "../../lib/chakra-ui";
import { useCamp } from "../../lib/hooks";
import {
  VStack,
  HStack,
  IconButton,
  Button,
  Text,
  Box,
} from "@chakra-ui/react";

export default function BookingPanel() {
  var { camp } = useCamp();

  return (
    <VStack
      w="full"
      minW={pxToRem(400)}
      maxW={pxToRem(400)}
      bg="b.grey0"
      shadow="md"
      gap={pxToRem(2)}
      px={pxToRem(16)}
      py={pxToRem(6)}
      rounded={pxToRem(12)}
      position="sticky"
      top={pxToRem(64)}
    >
      <HStack justifyContent="space-between" w="full">
        <HStack>
          <Text fontFamily="heading" fontSize="lg">
            {camp?.price}
          </Text>
          <Text fontSize="xs">/unit</Text>
        </HStack>

        <Text fontSize={pxToRem(12.8)}>Minimum nights: 1</Text>
      </HStack>

      {/* Select guests */}
      <HStack justifyContent="space-between" w="full" h={pxToRem(34)}>
        <HStack>
          <Text fontFamily="heading" fontSize="md">
            Guests
          </Text>

          <Text fontSize={pxToRem(12.8)}>No guest</Text>
        </HStack>

        <IconButton aria-label="Select guests" variant="icon-ghost">
          <ArrowDownIcon className="icon-normal-stroke" />
        </IconButton>
      </HStack>

      {/* Select check in */}
      <HStack justifyContent="space-between" w="full" h={pxToRem(34)}>
        <HStack>
          <Text fontFamily="heading" fontSize="md">
            Check in
          </Text>

          <Text fontSize={pxToRem(12.8)}>Select date</Text>
        </HStack>

        <IconButton aria-label="Select guests" variant="icon-ghost">
          <ArrowDownIcon className="icon-normal-stroke" />
        </IconButton>
      </HStack>

      {/* Select check out */}
      <HStack justifyContent="space-between" w="full" h={pxToRem(34)}>
        <HStack>
          <Text fontFamily="heading" fontSize="md">
            Check out
          </Text>

          <Text fontSize={pxToRem(12.8)}>Select date</Text>
        </HStack>

        <IconButton aria-label="Select guests" variant="icon-ghost">
          <ArrowDownIcon className="icon-normal-stroke" />
        </IconButton>
      </HStack>

      <Box>
        <Button variant="solid" px={pxToRem(64)} h={pxToRem(48)}>
          Book now
        </Button>
      </Box>
    </VStack>
  );
}
