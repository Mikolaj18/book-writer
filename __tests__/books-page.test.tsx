import {render, screen} from "@testing-library/react";
import BooksPage from "@/app/books/page";
import {useQuery} from "convex/react";

jest.mock("convex/react", () => {
    const useQuery = jest.fn();
    const useMutation = jest.fn();
    const actual = jest.requireActual("convex/react");

    return {
        ...actual,
        useQuery,
        useMutation,
    }
});

it("Should display loading state when data is loading", () => {
    render(<BooksPage/>);
    const loaderElements = screen.getAllByTestId('loading-item');
    expect(loaderElements.length).toBeGreaterThan(0);
    screen.debug();
});

it("Should display empty state when no books", () => {
    jest.mocked(useQuery).mockReturnValue([]);
    render(<BooksPage/>);

    const heading = screen.getByRole("heading", {level: 2});
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("It is a bit empty here. Go ahead and write something.");
});

it('Should successfully render books list', async () => {
    const mockedBooks = [
        { _id: "1", title: "Book 1", description: "description 1", coverUrl: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg" },
        { _id: "2", title: "Book 2", description: "description 2", coverUrl: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg" },
        { _id: "3", title: "Book 3", description: "description 3", coverUrl: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg" },
    ];

    jest.mocked(useQuery).mockReturnValue(mockedBooks);

    render(<BooksPage/>);
    const bookTitles = screen.getAllByRole('heading', { level: 3 });
    expect(bookTitles).toHaveLength(3);

    expect(screen.getByText('Book 1')).toBeInTheDocument();
    expect(screen.getByText('Book 2')).toBeInTheDocument();
    expect(screen.getByText('Book 3')).toBeInTheDocument();
});
