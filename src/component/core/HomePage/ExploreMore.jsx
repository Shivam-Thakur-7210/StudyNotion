import { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import React from "react";
import HighlightText from "./HighlightText";
import CardBox from "./CardBox";

const tabsName=["Free" , "New to coding" , "Most popular" , "Skills paths" , "Career paths"]

const ExploreMore = ()=>{

    const [currentTab,setCurrentTab] = useState(tabsName[0]);
    const [courses, setCourses] =useState(HomePageExplore[0].courses);
    const [currentCard , setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setMyCard= (value)=>{
        setCurrentTab(value);
        const result = HomePageExplore.filter((course)=>course.tag==value);   
        
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);                  
        
    }



    return (
        <div className="flex flex-col w-full items-center gap-5 text-[#7A98A6] mb-44 relative">
            <div className="flex flex-row text-4xl gap-4 font-semibold items-center ">
                <h1 >Unlock the</h1>
                <HighlightText text={"Power of Code"} />
            </div>

            <div>
                <p>
                    Learn to build anything you can imagine
                </p>

               
            </div>

            <div className="flex flex-row  rounded-full bg-gray-900 text-[#7A98A6] p-1 mb-8 " >
                {tabsName.map((ele,i)=>{
                    return(
                        <div key={i} className={`text-[16px]  
                            ${currentTab===ele ? "bg-[#000814] font-medium text-[#dbe6eb] " 
                            : "text-[#94afbb] "
                            }  rounded-full transition-all duration-200 cursor-pointer 
                            hover:bg-[#000814] hover:text-white  px-7 py-2

                            `} onClick={()=>setMyCard(ele)}>

                            {ele}
                        </div>
                    )
                })}
            </div>

            <div className="w-2/3
            l  flex flex-row gap-10  absolute -bottom-80 ">
                {courses.map((ele,ind)=>{
                    return(
                        <div key={ind} >
                            <CardBox  
                            cardData={ele} 
                            currentCard={currentCard}
                            setCurrentCard={setCurrentCard} />  
                        </div>                                   
                    )
                })}
            </div>
        </div>                 
    ) 
}               

export default ExploreMore;