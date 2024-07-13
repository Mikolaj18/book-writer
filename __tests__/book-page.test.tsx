import {render, screen} from "@testing-library/react";
import BookPage from "@/app/books/[bookId]/page";
import {useQuery} from "convex/react";
import {useParams} from "next/navigation";
import {useOptimistic} from "react";

jest.mock("next/navigation", () => ({
    useParams: jest.fn(),
}));

jest.mock("react", () => {
    const originalReact = jest.requireActual("react");
    return {
        ...originalReact,
        useOptimistic: jest.fn(),
    };
});

jest.mock("convex/react", () => {
    const useQuery = jest.fn();
    const useMutation = jest.fn();
    const actual = jest.requireActual("convex/react");

    return {
        ...actual,
        useQuery,
        useMutation,
    };
});


it('Should loading state be visible when books and chapters are loading', async () => {
    jest.mocked(useParams).mockReturnValue({bookId: "1"});
    render(<BookPage/>);

    const loaderElements = screen.getAllByTestId('loading-item');
    expect(loaderElements.length).toBeGreaterThan(0);
});

it('Should see empty state when there are no books and no chapters', async () => {
    jest.mocked(useParams).mockReturnValue({bookId: "1"});
    jest.mocked(useQuery).mockReturnValue([]);

    render(<BookPage/>);

    const heading = screen.getByRole('heading', {level: 2});
    const createChapterButton = screen.getByRole('button', {name: "Create new chapter"});

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("The book is already here. Time to add a chapter.");
    expect(createChapterButton).toBeInTheDocument();
});

it('Should display chapters on page', async () => {
    jest.mocked(useParams).mockReturnValue({bookId: "1"});

    const mockedChapters = [
        {_id: "1", title: "title1", content: " ", coverUrl: "/1015f/MainAfter.jpg", bookId: "1"},
        {_id: "2", title: "title2", content: " ", coverUrl: "/1015f/MainAfter.jpg", bookId: "1"},
        {_id: "3", title: "title3", content: " ", coverUrl: "/1015f/MainAfter.jpg", bookId: "1"},
    ];

    jest.mocked(useOptimistic).mockReturnValue([mockedChapters, jest.fn()]);
    const mockedBooks = [
        {
            _id: "1",
            title: "Book 1",
            description: "description 1",
            coverUrl: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
        },
        {
            _id: "xzx",
            title: "Book 1",
            description: "description 1",
            coverUrl: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
        }
    ];

    jest.mocked(useQuery).mockReturnValue(mockedBooks);
    render(<BookPage/>);
    const chapters = screen.getAllByRole("link", {name: "Edit"});
    expect(chapters).toHaveLength(3);
});

it('Should display only chapters that belong to specific book', async () => {
    jest.mocked(useParams).mockReturnValue({bookId: "1"});

    const mockedChapters = [
        {_id: "1", title: "title1", content: " ", coverUrl: "/1015f/MainAfter.jpg", bookId: "1"},
        {_id: "2", title: "title2", content: " ", coverUrl: "/1015f/MainAfter.jpg", bookId: "2"},
        {_id: "3", title: "title3", content: " ", coverUrl: "/1015f/MainAfter.jpg", bookId: "2"},
    ];

    jest.mocked(useOptimistic).mockReturnValue([mockedChapters, jest.fn()]);
    const mockedBooks = [
        {
            _id: "1",
            title: "Book 1",
            description: "description 1",
            coverUrl: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
        },
        {
            _id: "xzx",
            title: "Book 1",
            description: "description 1",
            coverUrl: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
        }
    ];
    jest.mocked(useQuery).mockReturnValue(mockedBooks);
    const filteredChapters = mockedChapters.filter(mockChapter => mockChapter.bookId === "1")
    render(<BookPage/>);
    expect(filteredChapters).toHaveLength(1);
});


