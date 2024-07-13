import {render, screen} from "@testing-library/react";
import {BookActions} from "@/app/books/book-actions";
import {Id} from "../convex/_generated/dataModel";
import {userEvent} from "@testing-library/user-event/";
import {useMutation} from "convex/react";

jest.mock("convex/react", () => {
    const useMutation = jest.fn();
    const actual = jest.requireActual("convex/react");

    return {
        ...actual,
        useMutation,
    }
});

const mockedBook = {
    _id: "exampleId" as Id<"books">,
    description: "exampleDesc",
    fileId: "exampleFileId" as Id<"_storage">,
    title: "exampleTitle",
    tokenIdentifier: "exampleUser",
    coverUrl: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0Jns4Ibl9pld6e7pCtu7c5ISdFCiVDt6y3Q&s`,
    _creationTime: 1720810063952.1719,
}


it("Should open book actions", async () => {
    render(<BookActions book={mockedBook}/>);
    const user = userEvent.setup();
    const bookActionsButton = screen.getByRole("button");
    await user.click(bookActionsButton);
    const deleteButton = screen.getByRole('menuitem', { name: /delete/i });
    expect(deleteButton).toBeInTheDocument();

    await user.click(deleteButton);
});


it("Should delete modal be visible", async () => {
    render(<BookActions book={mockedBook}/>);
    const user = userEvent.setup();
    const bookActionsButton = screen.getByRole("button");
    await user.click(bookActionsButton);

    const deleteButton = screen.getByRole('menuitem', { name: /delete/i });
    expect(deleteButton).toBeInTheDocument();

    await user.click(deleteButton);
    const modalHeading = screen.getByRole("heading", {level: 2});
    expect(modalHeading).toBeInTheDocument();
    expect(modalHeading).toHaveClass("text-lg font-semibold");
});

it("Should call delete book mutation", async () => {
    const mockDeleteBook = jest.fn();
    jest.mocked(useMutation).mockReturnValue(mockDeleteBook as any);

    render(<BookActions book={mockedBook}/>);
    const user = userEvent.setup();
    const bookActionsButton = screen.getByRole("button");
    await user.click(bookActionsButton);

    const deleteButton = screen.getByRole('menuitem', { name: /delete/i });
    expect(deleteButton).toBeInTheDocument();

    await user.click(deleteButton);

    const submitButton = screen.getByRole("button", {name: "Continue"});
    await user.click(submitButton);

    expect(mockDeleteBook).toHaveBeenCalled();
    expect(mockDeleteBook).toHaveBeenCalledWith({
        bookId: "exampleId"
    });
});


