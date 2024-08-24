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
import { Pages } from "./novels/novel2d";

const centerToCenter = 100;

type Props = {
  pages: Pages;
};

/**
 * 二次元小説を表示するためのビューワー
 */
export const Novel2DViewer = (props: Props) => {
  const [i, setI] = useState(0);
  const [j, setJ] = useState(0);
  const [nextI, setNextI] = useState(0);
  const [nextJ, setNextJ] = useState(0);
  /**
   * 左側にページがあるか？
   */
  const canGoLeft = props.pages[i - 1]?.[j] !== undefined;
  /**
   * 上側にページがあるか？
   */
  const canGoUp = props.pages[i]?.[j - 1] !== undefined;
  /**
   * 右側にページがあるか？
   */
  const canGoRight = props.pages[i + 1]?.[j] !== undefined;
  /**
   * 下側にページがあるか？
   */
  const canGoDown = props.pages[i]?.[j + 1] !== undefined;
  const handlers = useSwipeable({
    /**
     * 下スワイプで上移動
     */
    onSwipedDown: () => {
      if (canGoUp) {
        setNextJ((j) => j - 1);
      }
    },
    /**
     * 上スワイプで下移動
     */
    onSwipedUp: () => {
      if (canGoDown) {
        setNextJ((j) => j + 1);
      }
    },
    /**
     * 右スワイプで左移動
     */
    onSwipedRight: () => {
      if (canGoLeft) {
        setNextI((i) => i - 1);
      }
    },
    /**
     * 左スワイプで右移動
     */
    onSwipedLeft: () => {
      if (canGoRight) {
        setNextI((i) => i + 1);
      }
    },
  });
  const left = 50 + centerToCenter * (i - nextI);
  const top = 50 + centerToCenter * (j - nextJ);
  /**
   * 真ん中の文章のスタイル
   */
  const mainStyles = useSpring({
    left: `${left}%`,
    top: `${top}%`,
    /**
     * アニメーション起動後に、インデックスが再設定され、それによりアニメーションが終了する。
     */
    onRest: () => {
      setI(nextI);
      setJ(nextJ);
    },
  });
  /**
   * 左側の文章のスタイル
   */
  const leftStyles = useSpring({
    left: `${left - centerToCenter}%`,
    top: "50%",
  });
  /**
   * 右側の文章のスタイル
   */
  const rightStyles = useSpring({
    left: `${left + centerToCenter}%`,
    top: "50%",
  });
  /**
   * 上側の文章のスタイル
   */
  const topStyles = useSpring({
    left: "50%",
    top: `${top - centerToCenter}%`,
  });
  /**
   * 下側の文章のスタイル
   */
  const bottomStyles = useSpring({
    left: "50%",
    top: `${top + centerToCenter}%`,
  });
  /**
   * いつアニメーションが起動するか。
   * 次に動くインデックスが設定されるとアニメーションが起動する。
   */
  const animating = i !== nextI || j !== nextJ;
  return (
    <>
      <IconContext.Provider
        value={{ className: canGoUp ? "vertical-icon" : "" }}
      >
        <AiOutlineUp
          color={canGoUp ? "red" : "white"}
          title={canGoUp ? "上へ戻る" : undefined}
          onClick={() => {
            if (canGoUp) {
              setNextJ(j - 1);
            }
          }}
        />
      </IconContext.Provider>
      <div style={styles.centerRow}>
        <IconContext.Provider
          value={{ className: canGoLeft ? "horizontal-icon" : "" }}
        >
          <AiOutlineLeft
            color={canGoLeft ? "red" : "white"}
            title={canGoLeft ? "左へ戻る" : undefined}
            onClick={() => {
              if (canGoLeft) {
                setNextI(i - 1);
              }
            }}
          />
        </IconContext.Provider>
        {animating ? (
          <div>
            <animated.div style={topStyles} className="body">
              <Body i={i} j={j - 1} pages={props.pages} />
            </animated.div>
            <animated.div style={leftStyles} className="body">
              <Body i={i - 1} j={j} pages={props.pages} />
            </animated.div>
            <animated.div style={mainStyles} className="body">
              <Body i={i} j={j} pages={props.pages} />
            </animated.div>
            <animated.div style={rightStyles} className="body">
              <Body i={i + 1} j={j} pages={props.pages} />
            </animated.div>
            <animated.div style={bottomStyles} className="body">
              <Body i={i} j={j + 1} pages={props.pages} />
            </animated.div>
          </div>
        ) : (
          <div>
            <div className="body" {...handlers}>
              <Body i={i} j={j} pages={props.pages} />
            </div>
          </div>
        )}
        <IconContext.Provider
          value={{ className: canGoRight ? "horizontal-icon" : "" }}
        >
          <AiOutlineRight
            color={canGoRight ? "blue" : "white"}
            title={canGoRight ? "右へ進む" : undefined}
            onClick={() => {
              if (canGoRight) {
                setNextI(i + 1);
              }
            }}
          />
        </IconContext.Provider>
      </div>
      <IconContext.Provider
        value={{ className: canGoDown ? "vertical-icon" : "" }}
      >
        <AiOutlineDown
          color={canGoDown ? "blue" : "white"}
          title={canGoDown ? "下へ進む" : undefined}
          onClick={() => {
            if (canGoDown) {
              setNextJ(j + 1);
            }
          }}
        />
      </IconContext.Provider>
    </>
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
