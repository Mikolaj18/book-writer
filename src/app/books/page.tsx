import {CreateBookButton} from "@/app/books/create-book-button";

export default function BooksPage() {
    return (
        <main className="w-full space-y-8 p-12">
            <div className="flex justify-between items-center">
                <h1 className="text-4xl font-bold">My Books</h1>
                <CreateBookButton/>
            </div>
        </main>
    );
}