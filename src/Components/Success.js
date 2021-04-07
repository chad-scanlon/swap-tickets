import React from "react";
import thumbsUp from "../assets/Office-Heyyy-Thumbs-Up.gif";
const Success = (props) => {
    return (
        <>
            <div className="success-page">
                <div className="success-box">
                    <img alt="tumbs up" id="hero" src={thumbsUp} />
                </div>
            </div>
        </>
    );
};

export default Success;
