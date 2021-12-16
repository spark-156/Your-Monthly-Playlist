import React from "react";
import { Colors } from "../lib/constants";

export function Container({ children, ...props }: React.HTMLProps<HTMLDivElement>) {
  return <div style={{
    backgroundColor: Colors.Black,
    color: Colors.White,
    padding: "15px",
    width: "100%",
    height: "100%",
  }} {...props}>
    {children}
  </div>
}