import {render, screen} from "@testing-library/react";
import ChapterPage from "@/app/books/[bookId]/[chapterId]/page";
import {useParams} from "next/navigation";
import {useMutation, useQuery} from "convex/react";
import {Id} from "../convex/_generated/dataModel";
import {userEvent} from "@testing-library/user-event/";

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

it("Should loading state be visible when data is loading", () => {
    jest.mocked(useParams).mockReturnValue({bookId: "1", chapterId: "3"});
    render(<ChapterPage/>);
    const loaderElements = screen.getAllByTestId('loading-item');
    expect(loaderElements.length).toBeGreaterThan(0);
});

it("Should render chapter page", () => {
    jest.mocked(useParams).mockReturnValue({bookId: "1", chapterId: "3"});

    const mockedChapters = [
        {_id: "1" as Id<"chapters">, title: "title1", content: " ", bookId: "123456" as Id<"books">, _creationTime: 123456, index: 1, tokenIdentifier: "exampleUser"},
        {_id: "2" as Id<"chapters">, title: "title2", content: " ", bookId: "123456" as Id<"books">, _creationTime: 123456, index: 1, tokenIdentifier: "exampleUser"},
        {_id: "3" as Id<"chapters">, title: "title3", content: " ", bookId: "123456" as Id<"books">, _creationTime: 123456, index: 1, tokenIdentifier: "exampleUser"},
    ];
    jest.mocked(useQuery).mockReturnValue(mockedChapters);

    render(<ChapterPage/>);

    const backButton = screen.getByRole("link", {name: "Back"});
    const richEditor = screen.getByTestId("rich-editor");
    const saveButton = screen.getByRole("button", {name: "Save"});

    expect(backButton).toBeInTheDocument();
    expect(richEditor).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
});

it("Should call edit chapter content mutation", async () => {
    jest.mocked(useParams).mockReturnValue({bookId: "1", chapterId: "3"});

    const mockEditContentChapter = jest.fn();
    jest.mocked(useMutation).mockReturnValue(mockEditContentChapter as any);

    const mockedChapters = [
        {_id: "1" as Id<"chapters">, title: "title1", content: " ", bookId: "123456" as Id<"books">, _creationTime: 123456, index: 1, tokenIdentifier: "exampleUser"},
        {_id: "2" as Id<"chapters">, title: "title2", content: " ", bookId: "123456" as Id<"books">, _creationTime: 123456, index: 1, tokenIdentifier: "exampleUser"},
        {_id: "3" as Id<"chapters">, title: "title3", content: " ", bookId: "123456" as Id<"books">, _creationTime: 123456, index: 1, tokenIdentifier: "exampleUser"},
    ];
    jest.mocked(useQuery).mockReturnValue(mockedChapters);

    render(<ChapterPage/>);
    const user = userEvent.setup();
    const saveButton = screen.getByRole("button", {name: "Save"});

    await user.click(saveButton);
    expect(mockEditContentChapter).toHaveBeenCalled();
    expect(mockEditContentChapter).toHaveBeenCalledWith({
        content: "",
        bookId: "1",
        chapterId: "3",
    })
});