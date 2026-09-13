
const CardBox=({setCurrentCard , currentCard , cardData})=>{

    const setMyCurrentCard=(heading)=>{
        setCurrentCard(heading);
    }


    
    return(
        <div onClick={()=>setMyCurrentCard(cardData.heading)} className={`
                        ${currentCard===cardData.heading? "bg-white text-black active shadow-[16px_16px_0_#eee023] " :
                         "bg-[#2C333F]  "}
                        flex flex-col  p-7 gap-5 hover:cursor-pointer 
                        `
                        }
           >
            <h1  className={` ${currentCard!==cardData.heading? "  text-white  " : ""}  text-xl font-bold ` }
             >{cardData.heading}</h1>
            <p>{cardData.description}</p>
            <div className="w-full border-b-2  border-dashed"> 

            </div>
            <div className="flex flex-row justify-between gap-5 w-full ">
                <p>{cardData.level}</p>
                <p>{cardData.lessionNumber} Lessons</p>   
            </div>
            
        </div>    
    )
}

export default CardBox;