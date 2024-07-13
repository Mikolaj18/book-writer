import {render, screen} from "@testing-library/react";
import {BooksLoadingState} from "@/app/books/books-loading-state";

it("Should render skeleton loader", () => {
   render(<BooksLoadingState/>);
   const loaderElements = screen.getAllByTestId('loading-item');
   expect(loaderElements.length).toBeGreaterThan(0);

   loaderElements.forEach(item => {
      expect(item).toHaveClass("animate-pulse");
   });
});