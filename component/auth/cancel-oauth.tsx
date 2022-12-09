import { toast } from "react-hot-toast";
import { useMutation } from "react-query";

import { Text } from "@chakra-ui/react";

import { useUser } from "../../lib/hooks";
import { queryClient } from "../../lib/react-query";
import { cancelOAuth } from "../../services/auth";

export default function CancelOAuthLink() {
  var { accessToken } = useUser();

  var mutation = useMutation({
    mutationFn: () => cancelOAuth(accessToken),
    onSuccess: async () => {
      await queryClient.invalidateQueries(["access-token"]);
      toast.success("Signup cancelled");
    },
    onError: (error: any) => {
      let errorMsg = error?.message;
      if (!errorMsg) toast.error("Something went wrong");
      else {
        if (Array.isArray(errorMsg)) {
          toast.error(error?.message[0] ?? "Something went wrong");
        } else toast.error(error?.message);
      }
    },
  });

  return (
    <Text
      onClick={() => mutation.mutate()}
      cursor="pointer"
      style={{ color: "#1877F2" }}
    >
      Start over
    </Text>
  );
}
