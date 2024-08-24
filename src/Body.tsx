import React from "react";
import { Pages } from "./novels/novel2d";

type Props = {
  i: number;
  j: number;
  pages: Pages;
};

const Body = (props: Props) => {
  return (
    <div>
      {props.pages[props.i]?.[props.j]?.split("\n").map((line, index) => (
        <p key={`line-${index}`}>{line}</p>
      ))}
    </div>
  );
};

export default Body;
