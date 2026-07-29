import Link from "next/link";
import { ArrowLeft } from "lucide-react";
export default function NotFound() { return <section className="not-found"><div className="container"><span className="error-code">404</span><h1>This workflow reached an unknown route.</h1><p>The page may have moved, or the link may be incomplete.</p><Link href="/" className="button button-primary"><ArrowLeft size={17} /> Return home</Link></div></section>; }
