import React, { useState } from "react";
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
import { useSpring, animated } from "@react-spring/web";

const centerToCenter = 100;

const App = () => {
  const [i, setI] = useState(0);
  const [j, setJ] = useState(0);
  const [nextI, setNextI] = useState(0);
  const [nextJ, setNextJ] = useState(0);
  const handlers = useSwipeable({
    onSwipedDown: () => setNextJ((j) => j + 1),
    onSwipedUp: () => setNextJ((j) => j - 1),
    onSwipedRight: () => setNextI((i) => i + 1),
    onSwipedLeft: () => setNextI((i) => i - 1),
  });
  const left = 50 + centerToCenter * (nextI - i);
  const top = 50 + centerToCenter * (nextJ - j);
  const mainStyles = useSpring({
    left: `${left}%`,
    top: `${top}%`,
    onRest: () => {
      setI(nextI);
      setJ(nextJ);
    },
  });
  const leftStyles = useSpring({
    left: `${left - centerToCenter}%`,
    top: "50%",
  });
  const rightStyles = useSpring({
    left: `${left + centerToCenter}%`,
    top: "50%",
  });
  const topStyles = useSpring({
    left: "50%",
    top: `${top - centerToCenter}%`,
  });
  const bottomStyles = useSpring({
    left: "50%",
    top: `${top + centerToCenter}%`,
  });
  const animating = i !== nextI || j !== nextJ;

  return (
    <div className="App">
      <IconContext.Provider value={{ className: "vertical-icon" }}>
        <AiOutlineUp
          color="red"
          title="上へ戻る"
          onClick={() => {
            setNextJ(j - 1);
          }}
        />
        <div style={styles.centerRow}>
          <IconContext.Provider value={{ className: "horizontal-icon" }}>
            <AiOutlineLeft
              color="red"
              title="左へ戻る"
              onClick={() => {
                setNextI(i - 1);
              }}
            />
            {animating ? (
              <div>
                <animated.div style={topStyles} className="body">
                  <Body />
                </animated.div>
                <animated.div style={leftStyles} className="body">
                  <Body />
                </animated.div>
                <animated.div style={mainStyles} className="body">
                  <Body />
                </animated.div>
                <animated.div style={rightStyles} className="body">
                  <Body />
                </animated.div>
                <animated.div style={bottomStyles} className="body">
                  <Body />
                </animated.div>
              </div>
            ) : (
              <div>
                <div className="body" {...handlers}>
                  <Body />
                </div>
              </div>
            )}
            <AiOutlineRight
              color="blue"
              title="右へ進む"
              onClick={() => {
                setNextI(i + 1);
              }}
            />
          </IconContext.Provider>
        </div>
        <AiOutlineDown
          color="blue"
          title="下へ進む"
          onClick={() => {
            setNextJ(j + 1);
          }}
        />
      </IconContext.Provider>
    </div>
  );
};

const styles = {
  centerRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
} as const;

export default App;
