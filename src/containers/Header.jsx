import React from "react";
import Input from "../components/Input";
import Button from "../components/Button";

const Header = ({ handleHome, handleSubmit, onChange, value }) => {
    return (
        <>
            <header className="py-10 text-center">
                <a onClick={handleHome} className="text-blue-500 cursor-pointer">
                    Home
                </a>
            </header>
            <form
                className="flex items-start space-x-8"
                onSubmit={handleSubmit}
            >
                <Input
                    name="search"
                    className="flex-1"
                    onChange={onChange}
                    value={value}
                />
                <Button type="submit">Search</Button>
            </form>
        </>
    );
};

export default Header;
