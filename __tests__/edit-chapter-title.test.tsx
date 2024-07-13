import {EditChapterTitleForm} from "@/app/books/[bookId]/[chapterId]/edit-chapter-title";
import {render, screen} from "@testing-library/react";
import {Id} from "../convex/_generated/dataModel";
import {userEvent} from "@testing-library/user-event/";
import {useMutation} from "convex/react";

const mockedChapter = {
    _id: "1" as Id<"chapters">,
    bookId: "abc" as Id<"books">,
    content: "",
    title: "Example Title",
    index: 1720355094,
    tokenIdentifier: "Example User",
    _creationTime: 1720355094658.5068,
}

jest.mock("convex/react", () => {
    const useMutation = jest.fn();
    const actual = jest.requireActual("convex/react");

    return {
        ...actual,
        useMutation,
    }
});

it("Should form render with filled value", async () => {
   render(<EditChapterTitleForm chapter={mockedChapter} bookId={"abc" as Id<"books">} onChapterEdited={() => {}}/>);
   const titleField = screen.getByRole("textbox", {name: /title/i});
   const submitButton = screen.getByRole("button", {name: /update/i});

   expect(titleField).toBeInTheDocument();
   expect(titleField).toHaveValue("Example Title");

   expect(submitButton).toBeInTheDocument();
});

it("Should call update chapter title mutation", async () => {
    render(<EditChapterTitleForm chapter={mockedChapter} bookId={"abc" as Id<"books">} onChapterEdited={() => {}}/>);
    const mockEditChapter = jest.fn();
    jest.mocked(useMutation).mockReturnValue(mockEditChapter as any);
    const user = userEvent.setup();
    const titleField = screen.getByRole("textbox", {name: /title/i});
    const submitButton = screen.getByRole("button", {name: /update/i});

    await user.clear(titleField);
    await user.type(titleField, "Some title");
    await user.click(submitButton);

    expect(mockEditChapter).toHaveBeenCalled();
    expect(mockEditChapter).toHaveBeenCalledWith({
        title: "Some title",
        bookId: "abc",
        chapterId: "1"
    });
});