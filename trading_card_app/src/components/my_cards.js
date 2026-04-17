import React, {useState} from "react";


import CreateCard from "./create_card";


const MyCards = (e) =>{
    const [seen, setSeen] = useState(false)
    function togglePop () {
        setSeen(!seen);
    };
    return(
    <div>
    <button onClick={togglePop} alt = "Player Image">Post a Card For Sale</button>
    {seen ? <CreateCard toggle={togglePop} /> : null}
    
    </div>


    );
}

export default MyCards;