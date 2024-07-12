import {render, screen} from "@testing-library/react";
import {CreateBookForm} from "@/app/books/create-book-form";
import {userEvent} from "@testing-library/user-event/";

jest.mock("convex/react", () => {
    const useMutation = jest.fn();
    const actual = jest.requireActual("convex/react");

    return {
        ...actual,
        useMutation,
    }
});

it('Should render all input fields and submit button', async () => {
    render(<CreateBookForm onBookCreated={() => {}}/>);
    const titleField = screen.getByRole("textbox", {name: /title/i});
    const descriptionField = screen.getByRole("textbox", {name: /description/i});
    const fileField = screen.getByLabelText("File");
    const submitButton = screen.getByRole("button", {name: "Create"});

    expect(titleField).toBeInTheDocument();
    expect(descriptionField).toBeInTheDocument();
    expect(fileField).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
});

it("Should all inputs be initially empty", () => {
    render(<CreateBookForm onBookCreated={() => {}}/>);
    const titleField = screen.getByRole("textbox", {name: /title/i});
    const descriptionField = screen.getByRole("textbox", {name: /description/i});

    expect(titleField).toHaveValue("");
    expect(descriptionField).toHaveValue("");
});

it("Should show error message when input is not valid", async () => {
    render(<CreateBookForm onBookCreated={() => {}}/>);
    const user = userEvent.setup();
    const submitButton = screen.getByRole("button", {name: "Create"});
    await user.click(submitButton);
    let minLengthErrorMessages = screen.getAllByText("String must contain at least 2 character(s)");
    const fileErrorMessage = screen.getByText("Input not instance of File");

    expect(minLengthErrorMessages).toHaveLength(2);

    const titleField = screen.getByRole("textbox", {name: /title/i});
    await user.type(titleField, "Example");
    await user.click(submitButton);

    minLengthErrorMessages = screen.getAllByText("String must contain at least 2 character(s)");
    expect(minLengthErrorMessages).toHaveLength(1);
    expect(fileErrorMessage).toBeInTheDocument();
});

it("Should errors disappear when form is valid", async () => {
    render(<CreateBookForm onBookCreated={() => {}}/>);
    const user = userEvent.setup();
    const titleField = screen.getByRole("textbox", {name: /title/i});
    const descriptionField = screen.getByRole("textbox", {name: /description/i});
    const fileField = screen.getByLabelText("File");
    const submitButton = screen.getByRole("button", {name: "Create"});

    await user.click(submitButton);

    let minLengthErrorMessages = screen.getAllByText("String must contain at least 2 character(s)");
    let fileErrorMessage = screen.getByText("Input not instance of File");

    expect(minLengthErrorMessages).toHaveLength(2);
    expect(fileErrorMessage).toBeInTheDocument();

    const file = new File(['foo'], 'test.jpg', {type: 'image/jpeg'})
    await user.type(titleField, "Example Title");
    await user.type(descriptionField, "Example Description");
    await user.upload(fileField, file);

    minLengthErrorMessages = screen.queryAllByText("String must contain at least 2 character(s)");
    const fileErrorAfterFileUpload = screen.queryByText("Input not instance of File");

    expect(minLengthErrorMessages).toHaveLength(0);
    expect(fileErrorAfterFileUpload).not.toBeInTheDocument();
});