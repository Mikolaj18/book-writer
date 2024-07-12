import {render, screen} from "@testing-library/react";

import {EditBookForm} from "@/app/books/[bookId]/edit-book-form";
import {Id} from "../convex/_generated/dataModel";
import {userEvent} from "@testing-library/user-event/";

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

it("Should fields be filled with current book values", async () => {
    render(<EditBookForm book={mockedBook} onBookUpdated={() => {}}/>);
    const user = userEvent.setup();
    const titleField = screen.getByRole("textbox", {name: /title/i});
    const descriptionField = screen.getByRole("textbox", {name: /description/i});
    const submitButton = screen.getByRole("button", {name: "Update"});

    expect(titleField).toHaveValue("exampleTitle");
    expect(descriptionField).toHaveValue("exampleDesc");
    expect(submitButton).toBeInTheDocument();
});
