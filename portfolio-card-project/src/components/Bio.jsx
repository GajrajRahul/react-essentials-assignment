const Bio = ({ theme, skills }) => {
    const bioText = "Passionate front-end developer with 3+ years of experience in building responsive web applications. Skilled in React, JavaScript, and CSS. Dedicated to creating user-friendly interfaces and improving user experience.";

    return (
        <div className="bio-section">
            <p className={`bio-text leading-[1.6] ${theme === 'light' ? 'text-[#555]' : 'text-[#ccc]'} mb-[20px]`}>{bioText}</p>
            <h3 className={`font-semibold ${theme === 'light' ? 'text-[#555]' : 'text-[#ccc]'} mx-[0px] text-[0.9rem] pb-1 mb-1`}>Skills</h3>
            <div className="skills-container flex flex-wrap gap-[8px]">
                {skills.map((skill, index) => (
                    <span key={index} className="skill-tag bg-[#E7EEFA] text-[#333] pb-[3px] px-[10px] rounded text-[0.8rem] font-semibold hover:bg-[#764ba2] hover:translate-y-[-2px] hover:transition hover:duration-300 hover:ease-in-out hover:text-white">{skill}</span>
                ))}
            </div>
        </div>
    )
}

export default Bio;
