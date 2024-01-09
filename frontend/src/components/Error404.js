export default function Error404(){
    return(
        <div style={{
            display: "flex",
            flexDirection:"column",
            justifyContent:"center",
            alignItems:"center",
            width: "100vw",
            height:"100vh"
        }}>
            <h1 style={{maxWidth:"60vw", textAlign:"center"}}>Sorry!...But the page you are looking for is not found, or you are unauthorized to access.</h1>
            <h2>Please try again!!!</h2>
        </div>
    )
}