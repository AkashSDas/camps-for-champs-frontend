import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import { describe, expect, it } from "@jest/globals";

import { axiosInstance } from "../../lib/axios";
import { signup } from "../../services/auth.service";

// This sets the mock adapter on the default instance
var mock = new MockAdapter(axiosInstance, { onNoMatch: "throwException" });

describe("Auth services", () => {
  describe("signup", () => {
    describe("when the user is created successfully", () => {
      it("the return the user and access token", async () => {
        mock.onPost("/auth/email-signup").reply(201, {
          user: userStub(),
          accessToken: accessTokenStub(),
        });

        const result = await signup({
          email: userStub().email,
          password: "testingTEST123@",
        });

        expect(result).toMatchSnapshot();
        expect(result.accessToken).toBeDefined();
        expect(result.user).toBeDefined();
      });
    });

    describe("when the user already exist", () => {
      it("then get already exists error", async () => {
        mock.onPost("/auth/email-signup").reply(400, {
          statusCode: 400,
          message: "User already exists",
          error: "Bad Request",
        });

        const result = await signup({
          email: userStub().email,
          password: "testingTEST123@",
        });

        expect(result).toMatchSnapshot();
        expect(result.message).toEqual("User already exists");
      });
    });

    describe("network error", () => {
      it("then get already exists error", async () => {
        mock.onPost("/auth/email-signup").networkError();

        const result = await signup({
          email: userStub().email,
          password: "testingTEST123@",
        });

        expect(result).toMatchSnapshot();
        expect(result.message).toEqual("Network Error");
      });
    });
  });
});

function userStub() {
  return {
    email: "james@gmail.com",
    active: false,
    banned: false,
    verified: false,
    roles: ["base"],
    _id: "63bbc5597413cc38dacdaf59",
    oauthProviders: [],
    userId: "acc_XLL2Wp8C0k0eZWpY",
    createdAt: "2023-01-09T07:42:17.784Z",
    updatedAt: "2023-01-09T07:42:17.784Z",
    __v: 0,
  };
}

function accessTokenStub() {
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImphbWVzQGdtYWlsLmNvbSIsImlhdCI6MTY3MzI1MDEzNywiZXhwIjoxNjczMjUwNDM3fQ.u4ulNIxOfYKqjYFWUQzXoqWb0YCkKxRVxfPeHvDOI6k";
}
