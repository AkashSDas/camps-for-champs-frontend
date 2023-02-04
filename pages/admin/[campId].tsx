import BasicSettings from "../../components/camp-settings/basic-settings";
import CampBookings from "../../components/camp-settings/bookings";
import CancellationPolicySettings from "../../components/camp-settings/cancellation-policy";
import ImagesSettings from "../../components/camp-settings/images";
import LocationSettings from "../../components/camp-settings/location";
import PublishSettings from "../../components/camp-settings/publish-settings";
import TimingSettings from "../../components/camp-settings/timing";
import { Box, Center, Image, Spinner, Text, VStack } from "@chakra-ui/react";
import { pxToRem } from "../../lib/chakra-ui";
import { Tab } from "../../components/camp-settings/layout";
import { useCallback, useEffect } from "react";
import { useEditCamp } from "../../lib/hooks";
import { useRouter } from "next/router";

export default function EditCampPage() {
  var router = useRouter();
  var tab = router.query.tab as Tab;
  var { isLoading, camp } = useEditCamp();

  // Using useCallback to prevent unnecessary re-rendering (continuously)
  var DisplayTab = useCallback(() => {
    switch (tab) {
      case Tab.SETTINGS:
        return <BasicSettings />;
      case Tab.LOCATION:
        return <LocationSettings />;
      case Tab.TIMING:
        return <TimingSettings />;
      case Tab.CANCELLATION:
        return <CancellationPolicySettings />;
      case Tab.ACTIVITIES:
        return <div>Activity</div>;
      case Tab.IMAGES:
        return <ImagesSettings />;
      case Tab.TAGS:
        return <div>Tag</div>;
      case Tab.DISCOUNTS:
        return <div>Discount</div>;
      case Tab.PUBLISH:
        return <PublishSettings />;
      case Tab.BOOKINGS:
        return <CampBookings />;
      default:
        return <div>Invalid tab</div>;
    }
  }, [tab]);

  useEffect(
    function handleTabChange() {
      if (camp && (!tab || !Object.values(Tab).includes(tab))) {
        router.replace(`/admin/${camp.campId}?tab=${Tab.SETTINGS}`);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tab, !!camp]
  );

  if (isLoading) {
    return (
      <Center>
        <Box pt={pxToRem(128)}>
          <Spinner size="lg" />
        </Box>
      </Center>
    );
  }

  if (!camp)
    return (
      <Center mt={pxToRem(64)}>
        <VStack gap={pxToRem(16)}>
          <Box mixBlendMode="luminosity">
            <Image
              w={pxToRem(614)}
              h={pxToRem(422)}
              src="https://media.giphy.com/media/kaq6GnxDlJaBq/giphy.gif"
              alt="Welcome gif"
              objectFit="cover"
              rounded="3xl"
            />
          </Box>

          <Text fontSize={pxToRem(56)} fontFamily="heading">
            Camp not found
          </Text>
        </VStack>
      </Center>
    );

  return <DisplayTab />;
}
