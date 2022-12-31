import {
  Badge,
  Box,
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Icon,
  IconButton,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { FormState, useForm, UseFormRegister } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { number, object, string } from "yup";
import { useEditCamp, useUser } from "../../lib/hooks";
import { pxToRem } from "../../lib/pxToRem";
import { queryClient } from "../../lib/react-query";
import { updateCampSettings } from "../../services/camp";

enum ActivityType {
  TREKKING = "trekking",
  KAYAKING = "kayaking",
  OUTDOOR_GAMES = "outdoor_games",
  INDOOR_GAMES = "indoor_games",
  BIRD_WATCHING = "bird_watching",
  FISHING = "fishing",
}

export interface ActivityInput {
  type: ActivityType;
  price: number;
}

var activitySchema = object({
  type: string().oneOf(Object.values(ActivityType)).required("Required"),
  price: number().min(0).required("Required"),
});

export default function ActivityTab(): JSX.Element {
  var { camp } = useEditCamp();
  var { accessToken } = useUser();
  var router = useRouter();

  var { reset, register, handleSubmit, formState, setValue, getValues } =
    useForm<ActivityInput>({
      defaultValues: { type: ActivityType.TREKKING, price: 0 },
      resolver: yupResolver(activitySchema),
    });

  var mutation = useMutation({
    mutationFn: (data: ActivityInput) => onSubmit(data),
    onMutate: async () => {
      await queryClient.cancelQueries([
        "get-edit-camp",
        router.query.campId as string,
      ]);

      var previousCamp = queryClient.getQueryData([
        "get-edit-camp",
        router.query.campId as string,
      ]);

      console.log({ type: getValues().type, price: getValues().price });
      queryClient.setQueryData(
        ["get-edit-camp", router.query.campId as string],
        (old: any) => ({
          ...old,
          camp: {
            ...old.camp,
            activities: [
              ...old.camp.activities,
              { type: getValues().type, price: getValues().price },
            ],
          },
        })
      );

      toast.success("Activity added");

      return { previousCamp };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(
        ["get-edit-camp", router.query.campId as string],
        context?.previousCamp
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries([
        "get-edit-camp",
        router.query.campId as string,
      ]);
    },
  });

  async function onSubmit(data: ActivityInput) {
    if (camp?.activities.find((activity: any) => activity.type == data.type)) {
      toast.error("Activity already added");
      return;
    }

    var response = await updateCampSettings(
      camp?._id,
      { activities: [...camp.activities, data] },
      accessToken
    );

    if (response.error) toast.error(response.error.message);
  }

  return (
    <VStack w="full" gap={pxToRem(16)} maxW={pxToRem(800)} mb={pxToRem(64)}>
      <Box
        as="form"
        display="flex"
        flexDirection="column"
        alignItems="start"
        gap={pxToRem(32)}
        w="full"
        onSubmit={handleSubmit((data) => mutation.mutate(data))}
      >
        <ActivityTypeInput register={register} formState={formState} />
        <PriceInput register={register} formState={formState} />

        <Button
          maxW="fit-content"
          variant="regularSolid"
          type="submit"
          disabled={formState.isSubmitting}
        >
          {formState.isSubmitting ? "Saving..." : "Save"}
        </Button>

        <Divider />
      </Box>

      <VStack w="full" alignItems="start">
        <Heading fontSize="md">All Activities</Heading>
        {camp?.activities.map((activity: any) => (
          <ActivityItem key={activity.type} activity={activity} />
        ))}
      </VStack>
    </VStack>
  );
}

interface InputProps {
  formState: FormState<ActivityInput>;
  register: UseFormRegister<ActivityInput>;
}

function ActivityTypeInput({ register, formState }: InputProps) {
  return (
    <FormControl>
      <FormLabel htmlFor="price">Activity</FormLabel>
      <Input
        type="text"
        variant="base"
        {...register("type")}
        min={0}
        required
      />
      <FormErrorMessage>{formState.errors.type?.message}</FormErrorMessage>
    </FormControl>
  );
}

function PriceInput({ register, formState }: InputProps) {
  return (
    <FormControl>
      <FormLabel htmlFor="price">Price</FormLabel>
      <Input
        type="number"
        variant="base"
        {...register("price")}
        min={0}
        required
      />
      <FormErrorMessage>{formState.errors.price?.message}</FormErrorMessage>
    </FormControl>
  );
}

function ActivityItem({ activity }: any) {
  return (
    <HStack w="full" justifyContent="space-between" alignItems="center">
      <Box flexGrow={1}>
        <Text>{activity.type[0].toUpperCase() + activity.type.slice(1)}</Text>
      </Box>
      <Badge>₹{activity.price}</Badge>
      <IconButton variant="unstyled" aria-label="remove button">
        <Icon>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.2802 20.25H17.0002C19.7602 20.25 22.0002 18.01 22.0002 15.25V8.75C22.0002 5.99 19.7602 3.75 17.0002 3.75H10.2802C8.87018 3.75 7.53018 4.34 6.58018 5.39L3.05018 9.27C1.64018 10.82 1.64018 13.18 3.05018 14.73L6.58018 18.61C7.53018 19.66 8.87018 20.25 10.2802 20.25Z"
              stroke="#CDCDCD"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16.0001 14.47L11.0601 9.53003"
              stroke="#CDCDCD"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M11.0601 14.47L16.0001 9.53003"
              stroke="#CDCDCD"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </Icon>
      </IconButton>
    </HStack>
  );
}
