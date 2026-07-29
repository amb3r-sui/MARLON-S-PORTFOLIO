"use client";
export default function ErrorPage({ reset }: { reset: () => void }) { return <section className="not-found"><div className="container"><span className="error-code">Error</span><h1>Something interrupted this workflow.</h1><p>Please retry. If the issue persists, return to the homepage.</p><button className="button button-primary" onClick={reset}>Try again</button></div></section>; }
