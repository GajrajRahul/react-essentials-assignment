const Avatar = ({imgUrl}) => {
    return (
        <div className="">
            <img src={imgUrl} alt="Profile" className="avatar-image h-[80px] w-[80px] rounded-[50%] object-cover" />
        </div>
    )
}

export default Avatar;
