import {render, screen} from "@testing-library/react";
import {CreateBookButton} from "@/app/books/create-book-button";

it('Should render create book button', async () => {
    render(<CreateBookButton/>);
    const createBookButton = screen.getByRole("button", {name: "Create new book"});
    expect(createBookButton).toBeInTheDocument();
});