import {render, screen} from "@testing-library/react";
import BooksPage from "@/app/books/page";
import {userEvent} from "@testing-library/user-event/";

jest.mock("convex/react", () => {
    const useQuery = jest.fn();
    const useMutation = jest.fn();
    const actual = jest.requireActual("convex/react");

    const mockBooks = [
        { _id: "1", title: "Book 1", description: "description 1", coverUrl: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg" },
        { _id: "2", title: "Book 2", description: "description 2", coverUrl: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg" },
        { _id: "3", title: "Book 3", description: "description 3", coverUrl: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg" },
    ];

    useQuery.mockReturnValue(mockBooks);

    return {
        ...actual,
        useQuery,
        useMutation,
    }
});

it('Should succesfully render books list', async () => {
    render(<BooksPage/>);
    const bookTitles = screen.getAllByRole('heading', { level: 3 });
    expect(bookTitles).toHaveLength(3);

    expect(screen.getByText('Book 1')).toBeInTheDocument();
    expect(screen.getByText('Book 2')).toBeInTheDocument();
    expect(screen.getByText('Book 3')).toBeInTheDocument();
});

it("Should open create book form", async () => {
    render(<BooksPage/>);
    const user = userEvent.setup();
    const formButton = screen.getByRole("button", {name: "Create new book"});

    expect(formButton).toBeInTheDocument();

    await userEvent.click(formButton);
    const modalHeading = screen.getByRole("heading", {level: 2});

    expect(modalHeading).toBeInTheDocument();
    expect(modalHeading).toHaveClass("text-lg font-semibold leading-none tracking-tight");
})