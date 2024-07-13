import {render, screen} from "@testing-library/react";
import {ChapterList} from "@/app/books/[bookId]/chapter-list";
import {Id} from "../convex/_generated/dataModel";
import {useOptimistic} from "react";
import {userEvent} from "@testing-library/user-event/";
import {useMutation} from "convex/react";


jest.mock("react", () => {
    const originalReact = jest.requireActual("react");
    return {
        ...originalReact,
        useOptimistic: jest.fn(),
    };
});

jest.mock("convex/react", () => {
    const useMutation = jest.fn();
    const actual = jest.requireActual("convex/react");

    return {
        ...actual,
        useMutation,
    }
});

const mockedChapters = [
    {_id: "1" as Id<"chapters">, title: "title1", content: " ", bookId: "123456" as Id<"books">, _creationTime: 123456, index: 1, tokenIdentifier: "exampleUser"},
    {_id: "2" as Id<"chapters">, title: "title2", content: " ", bookId: "123456" as Id<"books">, _creationTime: 123456, index: 1, tokenIdentifier: "exampleUser"},
    {_id: "3" as Id<"chapters">, title: "title3", content: " ", bookId: "123456" as Id<"books">, _creationTime: 123456, index: 1, tokenIdentifier: "exampleUser"},
];

it('Should render chapters list', async () => {
    jest.mocked(useOptimistic).mockReturnValue([mockedChapters, jest.fn()]);
    render(<ChapterList chapters={mockedChapters} bookId={"123456" as Id<"books">} />);
    const items = screen.getAllByRole("link", {name: "Edit"});

    expect(items).toHaveLength(3);
});
