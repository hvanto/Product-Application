import React from "react";
import FarmCarousel from "../components/FarmCarousel";
import FarmTipsCarousel from "../components/FarmTipsCarousel";

// Backyardfarm component
function Backyardfarm() {
    return (
        <div>
        <FarmCarousel />
        <div> 
            <FarmTipsCarousel />
        </div>
        </div>
    );
    }


    export default Backyardfarm;