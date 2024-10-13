import Link from "next/link";

export default function Footer(){
    return(
        <>
            <div className="fooet">
                <div className="container flex flex-sb flex-wrap flex-left">
                    <div className="footer_logo">
                       <h2>Abaine.</h2> 
                       <h4>&copy; 
                            {/* {document.getElementById("year").toLocaleDateString('en-US', { year: 'numeric'}) = new Date().getFullYear()} */}
                            All Rights Reserved.
                        </h4>
                       <h3>Coded By <span>@abaine-dev</span></h3>
                    </div>
                    <div className="q_links">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><Link href="/">Adertise with us</Link></li>
                            <li><Link href="http://vianny-abaine.vercel.app">Projects</Link></li>
                            <li><Link href="/">About us</Link></li>
                            <li><Link href="/">Contact us</Link></li>
                        </ul>
                    </div>
                    <div className="q_links">
                        <h3>Legal Stuff Links</h3>
                        <ul>
                            <li><Link href="/">Privacy & Notice</Link></li>
                            <li><Link href="www.desishub.com">Affiliation</Link></li>
                            <li><Link href="/">Cookie Policy</Link></li>
                            <li><Link href="/">Terms</Link></li>
                        </ul>
                    </div>
                    <div className="q_links">
                        <h3>Social Links</h3>
                        <ul>
                            <li><Link href="/">LinkedIn</Link></li>
                            <li><Link href="/">Instagram</Link></li>
                            <li><Link href="/">Tiktok</Link></li>
                            <li><Link href="/">Threads</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}