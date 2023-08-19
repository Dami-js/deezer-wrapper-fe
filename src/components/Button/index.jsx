const Button = ({ children, className, ...props }) => {
    return (
        <button className={`bg-slate-400 p-3 rounded ${className}`} {...props}>
            {children}
        </button>
    );
};

export default Button;
