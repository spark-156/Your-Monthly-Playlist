import React from "react";
import { Colors } from "../lib/constants";



export function Button({ onClick, children }: React.HTMLProps<HTMLButtonElement>) {
  return <button onClick={onClick} style={{
    width: "100px",
    height: "30px",
    backgroundColor: Colors.Blue,
    color: Colors.White
  }}>
    {children}
  </button>
}