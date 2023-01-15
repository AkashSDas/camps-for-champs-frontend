import NextLink from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { useMutation } from "react-query";

import { Badge, Button, Center, Divider, HStack, IconButton, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Portal, Spinner, Text, Tooltip, useDisclosure, useToast, VStack } from "@chakra-ui/react";

import { pxToRem, theme } from "../../lib/chakra-ui";
import { useUser } from "../../lib/hooks";
import { queryClient } from "../../lib/react-query";
import { logout } from "../../services/auth.service";
import { createCamp } from "../../services/camp.service";
import { GetNewAccessTokenResponse } from "../../services/types/auth.service.type";
import { AddIcon, FolderIcon, LoginIcon, LogoutIcon, SearchIcon, UserCircleIcon } from "../icons";
import Logo from "../icons/logo";

export default function Navbar(): JSX.Element {
  var toast = useToast();
  var { isLoggedIn, accessToken, user } = useUser();

  var mutation = useMutation({
    mutationFn: () => logout(accessToken as string),
    onMutate: async function handelLogoutMutation() {
      var previousData = queryClient.getQueryData(
        "user"
      ) as GetNewAccessTokenResponse;

      queryClient.setQueryData("user", {
        success: false,
        message: "User is logged out",
        user: undefined,
        accessToken: undefined,
      } as GetNewAccessTokenResponse);

      toast({
        title: "Logged out",
        description: "You have been logged out successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      return { previousData };
    },
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <VStack w="full" position="fixed" gap={0} zIndex={10}>
      <HStack
        as="nav"
        w="full"
        h={pxToRem(56)}
        px={pxToRem(24)}
        justifyContent="space-between"
        alignItems="center"
        gap={pxToRem(16)}
        borderColor={theme.colors.b.grey2}
        bg={theme.colors.b.grey0}
      >
        <Logo />

        <HStack alignItems="center" gap={pxToRem(8)}>
          <Tooltip label="Search">
            <IconButton aria-label="Search camps" variant="icon-ghost">
              <SearchIcon className="icon-normal-stroke" h={20} w={20} />
            </IconButton>
          </Tooltip>

          <Center h={pxToRem(22)}>
            <Divider
              orientation="vertical"
              variant="solid"
              borderColor={theme.colors.b.grey2}
            />
          </Center>

          {isLoggedIn ? (
            <Tooltip label="Logout">
              <IconButton
                aria-label="Logout user"
                variant="icon-ghost"
                onClick={() => mutation.mutate()}
              >
                <LogoutIcon className="icon-normal-stroke" />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip label="Login">
              <NextLink href="/auth/login">
                <IconButton aria-label="Login with email" variant="icon-ghost">
                  <LoginIcon className="icon-normal-stroke" />
                </IconButton>
              </NextLink>
            </Tooltip>
          )}

          {!isLoggedIn && (
            <NextLink href="/auth/signup">
              <Button data-testid="get-started" variant="inverted">
                Get started
              </Button>
            </NextLink>
          )}

          {isLoggedIn && (
            <Tooltip label="Settings">
              <Popover
                closeOnEsc
                gutter={4}
                variant="responsive"
                onClose={onClose}
                onOpen={onOpen}
                isOpen={isOpen}
              >
                {/* Trigger */}
                <PopoverTrigger>
                  <IconButton
                    aria-label="User settings dropdown"
                    variant="icon-ghost"
                  >
                    <UserCircleIcon className="icon-normal-stroke" />
                  </IconButton>
                </PopoverTrigger>

                {/* Section */}
                <UserPopoverContent handleClose={onClose} />
              </Popover>
            </Tooltip>
          )}
        </HStack>
      </HStack>

      {isLoggedIn && user?.roles.includes("admin") && (
        <HStack
          position="absolute"
          top={50}
          borderTop="1px solid"
          borderTopColor={theme.colors.b.orange5}
          w="full"
          justifyContent="center"
        >
          <HStack
            bg={theme.colors.b.orange5}
            h={pxToRem(28)}
            px={pxToRem(12)}
            roundedBottomLeft={pxToRem(12)}
            roundedBottomRight={pxToRem(12)}
          >
            <Text fontFamily="heading" color={theme.colors.b.grey0}>
              Admin
            </Text>
          </HStack>
        </HStack>
      )}
    </VStack>
  );
}

function UserPopoverContent({ handleClose }: { handleClose: () => void }) {
  var { isLoggedIn, user } = useUser();

  function ViewAllCampsForAdminButton() {
    return (
      <Button
        variant="ghost"
        w="full"
        fontWeight="normal"
        justifyContent="start"
        fontSize="sm"
        h={pxToRem(36)}
        rounded="md"
      >
        <HStack gap={pxToRem(4)}>
          <FolderIcon h={20} w={20} className="icon-normal-stroke" />
          <Text fontSize="sm" fontWeight="medium">
            All camps
          </Text>
        </HStack>
      </Button>
    );
  }

  // Memoize this component because it was re-rendering CreateCampButton
  // component again & again. Another way to avoid re-rendering is to
  // add refetchOnMount to false (but user needs to be fetch again when
  // component remounts)
  var AdminContent = useCallback(() => {
    if (isLoggedIn && user?.roles.includes("admin")) {
      return (
        <>
          <PopoverHeader
            fontSize="xs"
            letterSpacing={pxToRem(2)}
            borderBottom="none"
          >
            ADMIN
          </PopoverHeader>
          <CreateCampButton handleClose={handleClose} />
          <ViewAllCampsForAdminButton />
        </>
      );
    }

    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, user?.roles]);

  return (
    <Portal>
      <PopoverContent w={pxToRem(240)} mr={pxToRem(24)} boxShadow="md">
        <PopoverBody>
          <AdminContent />
        </PopoverBody>
      </PopoverContent>
    </Portal>
  );
}

function CreateCampButton({ handleClose }: { handleClose: () => void }) {
  var toast = useToast();
  var router = useRouter();
  var { accessToken } = useUser();

  var mutation = useMutation({
    mutationFn: () => createCamp(accessToken as string),
    onSuccess: async function handleCreateCampSuccess(data, _variables) {
      if (data.success && data.camp) {
        toast({
          title: "Camp created",
          description: "You have created a new camp",
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        await queryClient.invalidateQueries(["edit-camp", data.camp.campId]);
        handleClose();
        router.push(`/admin/${data.camp.campId}`);
      } else {
        toast({
          title: "Failed to create camp",
          description: data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    },
    onError: function handleCreateCampError(error) {
      toast({
        title: "Failed to create camp",
        description:
          error instanceof Error ? error.message : "Something went wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  return (
    <Button
      variant="ghost"
      w="full"
      fontWeight="normal"
      justifyContent={mutation.isLoading ? "center" : "start"}
      fontSize="sm"
      h={pxToRem(36)}
      rounded="md"
      onClick={() => mutation.mutate()}
    >
      <HStack gap={pxToRem(4)}>
        {mutation.isLoading ? (
          <Spinner size="sm" />
        ) : (
          <>
            <AddIcon h={20} w={20} className="icon-normal-stroke" />
            <Text fontSize="sm" fontWeight="medium">
              Create camp
            </Text>
          </>
        )}
      </HStack>
    </Button>
  );
}
