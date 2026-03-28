import api, { login, register, getUsers, getUser } from "./api";

// We don't need to mock axios module if we spy on the exported instance
// But to be safe lets keep it simple. api is axios.create()
// We can spy on api.post and api.get

describe("API Utilities", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("login", () => {
    it("should return data on successful login", async () => {
      const mockResponse = { data: { token: "fake-token" } };
      const postSpy = jest.spyOn(api, "post").mockResolvedValue(mockResponse);

      const result = await login("test@example.com", "password");
      expect(result).toEqual({ token: "fake-token" });
      expect(postSpy).toHaveBeenCalledWith("/login", {
        email: "test@example.com",
        password: "password",
      });
    });
  });

  describe("register", () => {
    it("should return data on successful register", async () => {
      const mockResponse = { data: { id: 1, token: "fake-token" } };
      const postSpy = jest.spyOn(api, "post").mockResolvedValue(mockResponse);

      const result = await register("test@example.com", "password");
      expect(result).toEqual(mockResponse.data);
      expect(postSpy).toHaveBeenCalledWith(
        "/register",
        { email: "test@example.com", password: "password" },
        expect.objectContaining({
            headers: expect.objectContaining({
                "Content-Type": "application/json",
            })
        })
      );
    });
  });

  describe("getUsers", () => {
    it("should fetch users list", async () => {
      const mockResponse = { data: { data: [] } };
      const getSpy = jest.spyOn(api, "get").mockResolvedValue(mockResponse);

      const result = await getUsers(2);
      expect(result).toEqual(mockResponse.data);
      expect(getSpy).toHaveBeenCalledWith("/users?page=2");
    });
  });

  describe("getUser", () => {
    it("should fetch single user details", async () => {
      const mockResponse = { data: { data: { id: 1 } } };
      const getSpy = jest.spyOn(api, "get").mockResolvedValue(mockResponse);

      const result = await getUser(1);
      expect(result).toEqual(mockResponse.data);
      expect(getSpy).toHaveBeenCalledWith("/users/1", expect.any(Object));
    });
  });
});
