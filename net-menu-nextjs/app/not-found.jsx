import Link from "next/link";

export default function NotFound() {
  return <main style={{minHeight:"100vh",display:"grid",placeContent:"center",textAlign:"center",padding:"2rem"}}>
    <h1>Page not found</h1>
    <p><Link href="/">Back to NET Menu</Link></p>
  </main>;
}
