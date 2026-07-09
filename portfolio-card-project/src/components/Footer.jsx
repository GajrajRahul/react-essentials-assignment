import { getIcon } from "../utils/function";

const Footer = ({
    theme,
    toggleTheme,
    usersLength,
    currentUserIndex,
    handleUserChange,
    handleLikeChange,
    likes,
}) => {
    const { left, right, heart } = getIcon(theme);

    return (
        <div
            className={`portfolio-footer flex justify-between text-[0.8rem] ${theme === "light" ? "text-[#555]" : "text-[#ccc]"} mt-5`}
        >
            <div
                className="flex items-center gap-1 cursor-pointer"
                onClick={toggleTheme}
            >
                <img
                    src={
                        theme === "light"
                            ? "/custom-icons/dark.svg"
                            : "/custom-icons/light.svg"
                    }
                    alt={theme === "light" ? "Dark" : "Light"}
                />
                <span className="pb-[1px]">{theme === "light" ? "Dark" : "Light"}</span>
            </div>
            <div className="flex items-center gap-1">
                <span className="cursor-pointer" onClick={() => handleUserChange('prev')}>{left}</span>
                <span className="cursor-pointer" onClick={() => handleUserChange('next')}>{right}</span>
                <span>
                    {currentUserIndex + 1}/{usersLength}
                </span>
            </div>
            <div className="flex items-center gap-1 cursor-pointer" onClick={handleLikeChange}>
                <span>{heart}</span>
                <span className="pb-[1px]">{likes}</span>
            </div>
            <button className="flex items-center gap-1 cursor-pointer bg-[#667eea] text-white py-1 px-[12px] rounded text-[0.8rem] font-bold">
                <img
                    src="/custom-icons/email.svg"
                    alt="Email"
                    className="cursor-pointer"
                />
                <span className="pb-[2px]">Contact</span>
            </button>
        </div>
    );
};

export default Footer;
