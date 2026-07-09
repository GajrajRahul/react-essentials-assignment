import { useMemo, useState } from "react";

import Avatar from "./components/Avatar";
import Bio from "./components/Bio";
import Footer from "./components/Footer";
import PersonalInfo from "./components/PersonalInfo";
import useTheme from "./hooks/useTheme";
import { users } from "./utils/data";

const Portfolio = () => {
    const { theme, toggleTheme } = useTheme();
    const [usersList, setUsersList] = useState(users);
    const [currentUserIndex, setCurrentUserIndex] = useState(0);
    const [currentUserData, setCurrentUserData] = useState(usersList[currentUserIndex])

    const usersLength = useMemo(() => {
        return users.length;
    }, []);

    const handleUserChange = (key) => {
        let nextUserIndex = currentUserIndex;
        switch (key) {
            case 'prev':
                nextUserIndex = currentUserIndex === 0 ? users.length - 1 : currentUserIndex - 1;
                setCurrentUserData(usersList[nextUserIndex]);
                setCurrentUserIndex(nextUserIndex);
                break;
            case 'next':
                nextUserIndex = currentUserIndex === users.length - 1 ? 0 : currentUserIndex + 1;
                setCurrentUserData(usersList[nextUserIndex]);
                setCurrentUserIndex(nextUserIndex);
                break;
            default:
                setCurrentUserData(usersList[nextUserIndex]);
                alert('Invalid key provided')
                break;
        }
    }

    const handleLikeChange = () => {
        setCurrentUserData(prev => {
            return { ...prev, likes: prev.likes + 1 };
        })
        setUsersList(
            usersList.map((user) => {
                if (user.id === currentUserData.id) {
                    return { ...user, likes: user.likes + 1 };
                }
                return user;
            }),
        );
    };

    return (
        <div
            className={`max-w-[400px] my-[50px] mx-auto ${theme === "light" ? "bg-white" : "bg-[#222222] text-white"} rounded-[15px] shadow-[0_10px_30px_rgba(0,0,0,0.1)] overflow-hidden hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] hover:transition-shadow hover:duration-300 hover:ease-in-out`}
        >
            <div className="p-[30px]">
                <div className="flex gap-5 items-center mb-3">
                    <Avatar {...currentUserData} />
                    <PersonalInfo theme={theme} {...currentUserData} />
                </div>
                <Bio theme={theme} {...currentUserData} />
                <Footer
                    theme={theme}
                    toggleTheme={toggleTheme}
                    usersLength={usersLength}
                    currentUserIndex={currentUserIndex}
                    handleUserChange={handleUserChange}
                    handleLikeChange={handleLikeChange}
                    likes={currentUserData.likes}
                />
            </div>
        </div>
    );
};

export default Portfolio;
