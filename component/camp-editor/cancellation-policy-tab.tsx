import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  VStack,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  FormState,
  useForm,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { toast } from "react-hot-toast";
import { object, string } from "yup";
import { useEditCamp, useUser } from "../../lib/hooks";
import { pxToRem } from "../../lib/pxToRem";
import { updateCampSettings } from "../../services/camp";

enum CancellationPolicyType {
  FLEXIBLE = "flexible",
  MODERATE = "moderate",
  STRICT = "strict",
}

export interface CancellationPolicyInput {
  type: CancellationPolicyType;
  description?: string;
}

var cancellationPolicySchema = object({
  type: string()
    .oneOf(Object.values(CancellationPolicyType))
    .required("Required"),
  description: string().when("type", {
    is: CancellationPolicyType.FLEXIBLE,
    then: string().required("Required"),
  }),
});

export default function CancellationPolicyTab(): JSX.Element {
  var { camp } = useEditCamp();
  var { accessToken } = useUser();

  var { register, handleSubmit, formState, setValue } =
    useForm<CancellationPolicyInput>({
      defaultValues: {
        type: camp?.cancellationPolicy?.type,
        description: camp?.cancellationPolicy?.description ?? "",
      },
      resolver: yupResolver(cancellationPolicySchema),
    });

  async function onSubmit(data: CancellationPolicyInput) {
    var response = await updateCampSettings(
      camp?._id,
      { cancellationPolicy: data },
      accessToken
    );

    if (response.error) {
      toast.error(response.error.message);
    } else toast.success("Policy updated");
  }

  return (
    <Box
      as="form"
      mb={pxToRem(64)}
      display="flex"
      flexDirection="column"
      alignItems="start"
      gap={pxToRem(32)}
      w="full"
      maxW={pxToRem(800)}
      onSubmit={handleSubmit((data) => onSubmit(data))}
    >
      <PolicyInput
        register={register}
        formState={formState}
        setValue={setValue}
      />
      <DescriptionInput register={register} formState={formState} />

      <Button
        maxW="fit-content"
        variant="regularSolid"
        type="submit"
        disabled={formState.isSubmitting}
      >
        {formState.isSubmitting ? "Saving..." : "Save"}
      </Button>
    </Box>
  );
}

interface InputProps {
  formState: FormState<CancellationPolicyInput>;
  register: UseFormRegister<CancellationPolicyInput>;
}

function PolicyInput({
  formState,
  setValue,
}: InputProps & { setValue: UseFormSetValue<CancellationPolicyInput> }) {
  return (
    <VStack alignItems="start">
      <FormLabel htmlFor="type">Cancellation Policy</FormLabel>

      <RadioGroup
        defaultValue={formState.defaultValues?.type}
        onChange={(value) => {
          setValue("type", value as CancellationPolicyType);
        }}
      >
        <Radio value={CancellationPolicyType.FLEXIBLE} mr={pxToRem(16)}>
          Flexible
        </Radio>
        <Radio value={CancellationPolicyType.MODERATE} mr={pxToRem(16)}>
          Moderate
        </Radio>
        <Radio value={CancellationPolicyType.STRICT} mr={pxToRem(16)}>
          Strict
        </Radio>
      </RadioGroup>

      <FormErrorMessage>{formState.errors.type?.message}</FormErrorMessage>
    </VStack>
  );
}

function DescriptionInput({ register, formState }: InputProps) {
  return (
    <FormControl>
      <FormLabel htmlFor="description">Description</FormLabel>
      <Input
        id="description"
        as="textarea"
        type="text"
        variant="base"
        {...register("description")}
        h={pxToRem(180)}
        p={pxToRem(16)}
        minLength={0}
        maxLength={512}
      />
      <FormErrorMessage>
        {formState.errors.description?.message}
      </FormErrorMessage>
    </FormControl>
  );
}
