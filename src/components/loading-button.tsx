import {Button} from "@/components/ui/button";
import {Loader2} from "lucide-react";
import {ButtonHTMLAttributes, type ReactNode} from "react";

type LoadingButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isLoading: boolean;
    loadingText: string;
};
export function LoadingButton({ isLoading, loadingText, children, ...props }: LoadingButtonProps) {
    return (
        <Button className="flex gap-1 items-center" disabled={isLoading} {...props}>
            {isLoading && <Loader2 className="animate-spin" />}
            {isLoading ? loadingText : children}
        </Button>
    );
}