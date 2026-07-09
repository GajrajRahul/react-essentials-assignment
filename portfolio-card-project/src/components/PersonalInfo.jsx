const PersonalInfo = ({ theme, name, role }) => {

    return (
        <div className="personal-info">
            <h2 className={`name mt-[0px] mx-[0px] text-[1.3rem] font-bold ${theme === 'light' ? 'text-[#333]' : 'text-[#ccc]'}`}>{name}</h2>
            <p className={`role mx-[0px] text-[0.9rem] ${theme === 'light' ? 'text-[#555]' : 'text-[#ccc]'}`}>{role}</p>
        </div>
    )
}

export default PersonalInfo;
