import {render, screen} from "@testing-library/react";
import {ObjectNavigation} from "@/app/object-navigation";
import {Doc} from "../convex/_generated/dataModel";

it("Should render navigation with given props", () => {
    render(<ObjectNavigation previousItem={"PrevItem" as unknown as Doc<"books">} nextItem={"NextItem" as unknown as Doc<"books">} previousText={"PrevItemText"} nextText={"NextItemText"} url={"exampleurl"}/>);
    const previousItem = screen.getByRole("link", {name: "PrevItemText"});
    const nextItem = screen.getByRole("link", {name: "NextItemText"});

    expect(previousItem).toBeInTheDocument();
    expect(nextItem).toBeInTheDocument();
});