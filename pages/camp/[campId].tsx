import BookingPanel from "../../components/camps/booking-panel";
import CampInfo from "../../components/camps/camp-info";
import { Box, Center, Grid, GridItem, Spinner } from "@chakra-ui/react";
import { pxToRem } from "../../lib/chakra-ui";
import { useCamp, useCheckActiveBooking } from "../../lib/hooks";

export default function CampPage() {
  var { camp, isLoading } = useCamp();
  var { isLoading: checkingBooking } = useCheckActiveBooking();

  if (isLoading || !camp || checkingBooking) {
    return (
      <Center mt={pxToRem(40)}>
        <Box pt={pxToRem(128)}>
          <Spinner size="lg" />
        </Box>
      </Center>
    );
  }

  return (
    <Grid
      mt={pxToRem(40)}
      maxW={pxToRem(1264)}
      templateColumns="repeat(5, 1fr)"
      mx={pxToRem(32)}
    >
      <GridItem colSpan={4}>
        <CampInfo />
      </GridItem>

      <GridItem colSpan={1}>
        <BookingPanel />
      </GridItem>
    </Grid>
  );
}
