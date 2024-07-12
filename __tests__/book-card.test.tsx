import {render, screen} from "@testing-library/react";
import {BookCard} from "@/app/books/book-card";
import {Id} from "../convex/_generated/dataModel";

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

it('Should succesfully render book card', async () => {
    // render(<CreateBookForm onBookCreated={() => {}}/>);
    render(<BookCard book={mockedBook}/>);
    const heading = screen.getByRole("heading", { level: 3 });
    const description = screen.getByRole("paragraph");
    const cover = screen.getByRole("img");
    const button = screen.getByRole("link", {name: "Continue Writing"});

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("exampleTitle");

    expect(description).toBeInTheDocument();
    expect(description).toHaveTextContent("exampleDesc");

    expect(cover).toBeInTheDocument();
    expect(cover).toHaveAttribute('alt', 'book cover');

    expect(button).toBeInTheDocument();
});