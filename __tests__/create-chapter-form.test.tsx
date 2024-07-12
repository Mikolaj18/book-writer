import {CreateChapterForm} from "@/app/books/[bookId]/create-chapter-form";
import {Id} from "../convex/_generated/dataModel";
import {render, screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event/";

jest.mock("convex/react", () => {
    const useMutation = jest.fn();
    const actual = jest.requireActual("convex/react");

    return {
        ...actual,
        useMutation,
    }
});

it("Should render all fields", async () => {
    render(<CreateChapterForm bookId={"123456" as Id<"books">} onChapterCreated={() => {}}/>);
    const titleField = screen.getByRole("textbox", {name: /title/i});
    const submitButton = screen.getByRole("button", {name: "Create"});

    expect(titleField).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
});

it("Should display error when form is not valid", async () => {
    render(<CreateChapterForm bookId={"123456" as Id<"books">} onChapterCreated={() => {}}/>);
    const user = userEvent.setup();
    const submitButton = screen.getByRole("button", {name: "Create"});

    await user.click(submitButton);

    const errorMessage = screen.getByText("String must contain at least 2 character(s)");
    expect(errorMessage).toBeInTheDocument();
});

it("Should error disappear when form is valid", async () => {
    render(<CreateChapterForm bookId={"123456" as Id<"books">} onChapterCreated={() => {}}/>);
    const user = userEvent.setup();
    const titleField = screen.getByRole("textbox", {name: /title/i});
    const submitButton = screen.getByRole("button", {name: "Create"});

    await user.click(submitButton);

    const errorMessage = screen.getByText("String must contain at least 2 character(s)");
    expect(errorMessage).toBeInTheDocument()

    await user.type(titleField, "Example chapter title");

    const errorMessageAfterFormFill = screen.queryByText("String must contain at least 2 character(s)");
    expect(errorMessageAfterFormFill).not.toBeInTheDocument();
});