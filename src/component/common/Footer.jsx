
import { FooterLink2 } from "../../data/footer-links";
import { Link } from "react-router-dom";
import React from "react";
import Logo from "../../assets/Logo/Logo-Full-Light.png";

// Icons
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";






const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];


const Footer=()=>{
    return (
        <div className="  bg-[#2C333F] text-white flex flex-row justify-center mx-auto ">
            <div className="flex flex-row  w-11/12  pt-16  justify-between">

                {/* left part  */}
                <div className="flex flex-row w-[50%] border-r-0 ml-16 gap-16">
                    <div className="flex flex-col gap-3 ">
                        <div>
                            <img src={Logo}/>
                            
                        </div>

                        <h2>Company</h2>

                        <p>About</p>
                        <p>Carrier</p>
                        <p>Affiliates</p>

                        <div className="flex gap-3 text-lg">
                            <FaFacebook />
                            <FaGoogle />
                            <FaTwitter />
                            <FaYoutube />

                        </div>

                    </div>

                    <div className="flex flex-col gap-6" >
                        <div className="flex flex-col gap-3">
                            <h2>Resources</h2>
                            {Resources.map((ele, i)=>{
                                return(
                                    
                                    
                                        <div key={i}>
                                            {ele}
                                        </div>
                                        
                                
                                )
                            })}
                        </div>

                        <div>                     
                            <h2>
                                Support
                            </h2>
                            <p>Help Center</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-3">
                            <h2>Plans</h2>
                            {Plans.map((ele,i)=>{
                                return(
                                    <div key={i}>
                                        {ele}
                                    </div>
                                )
                            })}

                        </div>
                    
                        <div className="flex flex-col gap-3">
                            <h2>Community</h2>
                            {Community.map((ele,i)=>{
                                return (
                                    <div key={i}>
                                        {ele}
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                </div>
            

                {/* right part */}
                <div className="flex flex-row  w-[50%] pl-5 mr-16 border-l  gap-16">
                    {FooterLink2.map((ele, i )=>{
                        return (
                            <div key={i} >
                                <h1>
                                    {ele.title}

                                </h1>

                                <div className="gap-3 mt-4 flex flex-col ">
                                    {ele.links.map((link, ind)=>{
                                        return (
                                            <div key={ind}  >
                                                {link.title}
                                            </div>
                                        )
                                    })}

                                </div>
                                
                            </div>
                        )
                    })}     
                    
                </div>


            </div>
        </div>
    )
}

export default Footer;