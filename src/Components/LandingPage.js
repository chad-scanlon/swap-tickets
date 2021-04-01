import { Link } from "react-router-dom";
// import Register from "./Register";
// import AdminLogin from "./AdminLogin";
import raptor from "../assets/raptor.jpeg";

const LandingPage = () => {
    return (
        <>
            <div className="landing-page">
                {" "}
                <div className="hero-container">
                    <img alt="big red truck" id="hero" src={raptor} />

                    <div className="prompt-container">
                        <Link
                            to="/swap-form"
                            style={{ textDecoration: "none", color: "white" }}
                        >
                            <span>Click "Swap"</span>
                        </Link>
                        <div id="rectangle"></div>
                        <div id="triangle-right"></div>
                        <span>Fill out swap form</span>
                        <div id="rectangle"></div>
                        <div id="triangle-right"></div>
                        <span>Fill out driver form</span>
                    </div>
                </div>
            </div>

            {/* <Register /> */}
        </>
    );
};

export default LandingPage;
