import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    href?: string;
}

export const Button = ({
    children,
    variant = "primary",
    size = "md",
    className = "",
    href,
    ...props
}: ButtonProps) => {
    const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-300 rounded-sm focus:outline-none disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
        primary: "bg-gold text-black hover:bg-gold/90",
        outline: "border border-gold text-gold hover:bg-gold hover:text-black",
        ghost: "text-zinc-400 hover:text-white hover:bg-white/5",
    };

    const sizes = {
        sm: "px-4 py-1.5 text-xs tracking-widest uppercase",
        md: "px-8 py-3 text-sm tracking-widest uppercase",
        lg: "px-10 py-4 text-base tracking-widest uppercase",
    };

    const styles = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

    if (href) {
        return (
            <Link href={href} className={styles}>
                {children}
            </Link>
        );
    }

    return (
        <button
            className={styles}
            {...props}
        >
            {children}
        </button>
    );
};
