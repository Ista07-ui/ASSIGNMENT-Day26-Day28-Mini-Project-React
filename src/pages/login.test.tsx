import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "./login";
import "@testing-library/jest-dom";
import { useRouter } from "next/router";

// Mock next/router
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

// Mock next/link
jest.mock("next/link", () => ({
  __esModule: true,
  default: (props: any) => <a {...props}>{props.children}</a>,
}));

// Mock next/dynamic
jest.mock("next/dynamic", () => ({
  __esModule: true,
  default: () => {
    const DynamicComponent = () => null;
    DynamicComponent.displayName = 'LoadableComponent';
    DynamicComponent.preload = jest.fn();
    return DynamicComponent;
  },
}));

// Mock react-toastify module
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
  ToastContainer: () => <div>Toast Container</div>,
}));

describe("Login Page", () => {
  const mockPush = jest.fn();
  
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      pathname: '/login',
      query: {},
    });
    
    // Assign jest.fn() directly to global.fetch
    global.fetch = jest.fn();
    jest.clearAllMocks();
  });

  it("renders login form", () => {
    render(<Login />);
    expect(screen.getByRole("heading", { name: /Welcome Back!/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it("allows typing in email and password", () => {
    render(<Login />);
    
    const emailInput = screen.getByLabelText(/Email Address/i);
    const passwordInput = screen.getByLabelText(/Password/i);

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(emailInput).toHaveValue("test@example.com");
    expect(passwordInput).toHaveValue("password123");
  });

  it("submits the form and redirects on success", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      json: () => Promise.resolve({ token: "fake-token" }),
    });

    render(<Login />);
    
    // Fill out the form
    const emailInput = screen.getByLabelText(/Email Address/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    
    fireEvent.change(emailInput, { target: { value: "eve.holt@reqres.in" } });
    fireEvent.change(passwordInput, { target: { value: "cityslicka" } });
    
    const submitButton = screen.getByRole("button", { name: /Log In/i });
    
    // Submit
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    // Check redirection
    await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith("/users/2");
    }, { timeout: 3000 });
  });

  it("displays error on login failure", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      json: () => Promise.resolve({ error: "Missing password" }),
    });

    render(<Login />);
    
    await waitFor(() => {
         fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: "fail@test.com" } });
    });
    
    // Submit
    fireEvent.click(screen.getByRole("button", { name: /Log In/i }));

    await waitFor(() => {
      // screen.debug(); 
      // Check for either specific error OR generic error to diagnose
      const alert = screen.queryByRole('alert') || screen.queryByText(/Missing/i) || screen.queryByText(/Login failed/i);
      expect(alert).toBeInTheDocument();
    });
  });
});
