import {render, screen} from "@testing-library/react";
import {ChapterLoadingState} from "@/app/books/[bookId]/[chapterId]/chapter-loading-state";

it("Should render skeleton loader", () => {
    render(<ChapterLoadingState/>);
    const loaderElements = screen.getAllByTestId('loading-item');
    expect(loaderElements.length).toBeGreaterThan(0);

    loaderElements.forEach(item => {
        expect(item).toHaveClass("animate-pulse");
    });
});