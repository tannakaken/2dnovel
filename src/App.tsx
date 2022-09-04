import React from "react";
import { useSwipeable } from "react-swipeable";
import "./App.css";
import {
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineUp,
  AiOutlineDown,
} from "react-icons/ai";
import { IconContext } from "react-icons";
import Body from "./Body";

function App() {
  const handlers = useSwipeable({
    onSwipedDown: (eventData) => console.log("User Swiped Down!", eventData),
    onSwipedUp: (eventData) => console.log("User Swiped Up!", eventData),
    onSwipedRight: (eventData) => console.log("User Swiped Right!", eventData),
    onSwipedLeft: (eventData) => console.log("User Swiped Left!", eventData),
  });
  return (
    <div className="App">
      <IconContext.Provider
        value={{ color: "blue", className: "vertical-icon" }}
      >
        <AiOutlineUp />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <IconContext.Provider
            value={{ color: "blue", className: "horizontal-icon" }}
          >
            <AiOutlineLeft />
            <div className="body" {...handlers}>
              <Body />
            </div>
            <AiOutlineRight />
          </IconContext.Provider>
        </div>
        <AiOutlineDown />
      </IconContext.Provider>
    </div>
  );
}

export default App;
