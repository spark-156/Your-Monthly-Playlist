import { Colors } from "../lib/constants";

export function Home() {
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
    </div>
    
  </div>
}