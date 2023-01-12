import { QueryClient, QueryClientProvider } from "react-query";

import { renderHook, waitFor } from "@testing-library/react";

import { useUser } from "../lib/hooks";
import * as service from "../services/auth.service";
import { accessTokenStub, userStub } from "../stubs/auth.stub";

var serviceMock = service as jest.Mocked<typeof service>;

jest.mock("../services/auth.service", () => ({
  getNewAccessToken: jest.fn(),
}));

describe("useUser", () => {
  it("get user data & access token", async () => {
    const queryClient = new QueryClient();
    const wrapper = ({ children }: any) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    serviceMock.getNewAccessToken.mockResolvedValueOnce({
      user: userStub(),
      accessToken: accessTokenStub(),
      success: true,
    });

    const { result } = renderHook(() => useUser(), { wrapper });
    await waitFor(() => expect(result.current.user).not.toBeUndefined());
  });
});
