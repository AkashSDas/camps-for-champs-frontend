import { useMutation } from "react-query";

import { Button, useToast } from "@chakra-ui/react";

import { useUser } from "../../lib/hooks";
import { queryClient } from "../../lib/react-query";
import { cancelOauthSignup } from "../../services/auth.service";
import { GetNewAccessTokenResponse } from "../../services/types/auth.service.type";

export default function CancelOauthSignup() {
  var toast = useToast();
  var { accessToken } = useUser();

  var mutation = useMutation({
    mutationFn: () => cancelOauthSignup(accessToken as string),
    onMutate: async function handelLogoutMutation() {
      var previousData = queryClient.getQueryData(
        "user"
      ) as GetNewAccessTokenResponse;

      queryClient.setQueryData("user", {
        success: false,
        message: "User oauth is cancelled",
        user: undefined,
        accessToken: undefined,
      } as GetNewAccessTokenResponse);

      toast({
        title: "Signup cancelled",
        description: "Oauth signup is cancelled",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      return { previousData };
    },
  });

  return (
    <Button
      variant="unstyled"
      color="b.blue4"
      fontWeight="medium"
      fontSize="sm"
      onClick={() => mutation.mutate()}
    >
      Cancel
    </Button>
  );
}
