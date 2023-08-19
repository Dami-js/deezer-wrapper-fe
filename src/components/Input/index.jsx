import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const Input = forwardRef(({ className, ...props }, ref) => {
    return (
        <div className={twMerge("mb-4", className)}>
            <input
                type="search"
                placeholder="Search"
                className={twMerge("flex w-full p-3 border rounded-full")}
                ref={ref}
                {...props}
            />
        </div>
    );
});

export default Input;
