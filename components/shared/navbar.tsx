import NextLink from "next/link";
import { useMutation } from "react-query";

import { Button, Center, Divider, HStack, IconButton, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Portal, Text, Tooltip, useToast } from "@chakra-ui/react";

import { pxToRem, theme } from "../../lib/chakra-ui";
import { useUser } from "../../lib/hooks";
import { queryClient } from "../../lib/react-query";
import { logout } from "../../services/auth.service";
import { GetNewAccessTokenResponse } from "../../services/types/auth.service.type";
import { AddIcon, FolderIcon, LoginIcon, LogoutIcon, SearchIcon, UserCircleIcon } from "../icons";
import Logo from "../icons/logo";

export default function Navbar(): JSX.Element {
  var toast = useToast();
  var { isLoggedIn, accessToken } = useUser();

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

  return (
    <HStack
      as="nav"
      w="full"
      h={pxToRem(56)}
      px={pxToRem(24)}
      justifyContent="space-between"
      alignItems="center"
      gap={pxToRem(16)}
      borderBottomWidth={pxToRem(1)}
      borderColor={theme.colors.b.grey2}
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
            <Popover variant="">
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
              <UserPopoverContent />
            </Popover>
          </Tooltip>
        )}
      </HStack>
    </HStack>
  );
}

function UserPopoverContent() {
  var { isLoggedIn, user } = useUser();

  function CreateCampButton() {
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
          <AddIcon h={20} w={20} className="icon-normal-stroke" />
          <Text>Create camp</Text>
        </HStack>
      </Button>
    );
  }

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
          <Text>All camps</Text>
        </HStack>
      </Button>
    );
  }

  function AdminContent() {
    if (isLoggedIn && user?.roles.includes("admin")) {
      return (
        <>
          <PopoverHeader
            fontSize="xs"
            letterSpacing={pxToRem(4)}
            mb={pxToRem(4)}
            borderBottom="none"
          >
            ADMIN
          </PopoverHeader>
          <CreateCampButton />
          <ViewAllCampsForAdminButton />
        </>
      );
    }

    return null;
  }

  return (
    <Portal>
      <PopoverContent mr={pxToRem(16)} boxShadow="md">
        <PopoverBody>
          <AdminContent />
        </PopoverBody>
      </PopoverContent>
    </Portal>
  );
}
