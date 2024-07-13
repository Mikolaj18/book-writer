import {render, screen} from "@testing-library/react";
import {BookLoadingState} from "@/app/books/[bookId]/book-loading-state";

it("Should render skeleton loader", () => {
   render(<BookLoadingState/>);
   const loaderElements = screen.getAllByTestId('loading-item');
   expect(loaderElements.length).toBeGreaterThan(0);

   loaderElements.forEach(item => {
      expect(item).toHaveClass("animate-pulse");
   });
});