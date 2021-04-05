import React from "react";
import thumbsUp from "../assets/Office-Heyyy-Thumbs-Up.gif";
const Success = (props) => {
    console.log(props);
    return (
        <>
            <div className="success-page">
                <div className="success-box">
                    <span>Thanks for playing!</span>
                    <span>Back to work</span>
                    <img alt="tumbs up" id="hero" src={thumbsUp} />
                </div>
            </div>
        </>
    );
};

export default Success;
