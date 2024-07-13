import {render, screen} from "@testing-library/react";
import {DeleteChapterButton} from "@/app/books/[bookId]/delete-chapter-button";
import {Id} from "../convex/_generated/dataModel";
import {useMutation} from "convex/react";
import {userEvent} from "@testing-library/user-event/";

jest.mock("convex/react", () => {
    const useMutation = jest.fn();
    const actual = jest.requireActual("convex/react");

    return {
        ...actual,
        useMutation,
    }
});

it("Should call useMutation delete function", async () => {
    const mockDeleteChapter = jest.fn();
    jest.mocked(useMutation).mockReturnValue(mockDeleteChapter as any);

    render(<DeleteChapterButton chapterId={"123" as Id<"chapters">} bookId={"456" as Id<"books">}/>);
    const user = userEvent.setup();
    const bookActionsButton = screen.getByRole("button");
    await user.click(bookActionsButton);

    const confirmButton = screen.getByRole("button", {name: "Continue"});

    expect(confirmButton).toBeInTheDocument();

    await user.click(confirmButton);
    expect(mockDeleteChapter).toHaveBeenCalled();
    expect(mockDeleteChapter).toHaveBeenCalledWith({
        chapterId: "123",
        bookId: "456",
    });
});