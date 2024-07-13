import {render, screen} from "@testing-library/react";
import {CreateBookButton} from "@/app/books/create-book-button";
import {userEvent} from "@testing-library/user-event/";

jest.mock("convex/react", () => {
    const useMutation = jest.fn();
    const actual = jest.requireActual("convex/react");

    return {
        ...actual,
        useMutation,
    }
});

it('Should render create book button', async () => {
    render(<CreateBookButton/>);
    const createBookButton = screen.getByRole("button", {name: "Create new book"});
    expect(createBookButton).toBeInTheDocument();
});

it("Should open create book form", async () => {
    render(<CreateBookButton/>);
    const formButton = screen.getByRole("button", {name: "Create new book"});

    expect(formButton).toBeInTheDocument();

    await userEvent.click(formButton);
    const modalHeading = screen.getByRole("heading", {level: 2});

    expect(modalHeading).toBeInTheDocument();
    expect(modalHeading).toHaveClass("text-lg font-semibold leading-none tracking-tight");
});