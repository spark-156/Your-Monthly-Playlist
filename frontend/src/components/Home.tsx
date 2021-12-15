import { useEffect } from "react";
import { axiosSpotifyInstance } from "../lib/axiosSpotifyInstance";
import { Colors } from "../lib/constants";
import { Button } from "./Button";

export function Home() {
  console.log(document.cookie)
  useEffect(() => {
    async function getUser() {
      const response = await axiosSpotifyInstance.get("/me");
      console.log(response.data)
    };
    getUser();
  }, [])

  return <div style={{
    display: "grid",
    height: "100vh",
    width: "100vw",
    backgroundColor: Colors.Black,
    color: Colors.White
    // backgroundImage: 'url("/zheani.jpg")',
    // backgroundRepeat: "no-repeat",
    // backgroundPosition: "center",
    // backgroundSize: "contain",
}}>
    <div style={{
      alignSelf: "center",
      justifySelf: "center",
      textAlign: "center"
    }}>
      <div style={{textAlign: "inherit"}}>auto monthly playlists</div>
      <div style={{textAlign: "inherit"}}>by luca bergman</div>
      <Button onClick={() => window.location.href = "/api/v1/login"}>Login</Button>
    </div>
    
  </div>
}