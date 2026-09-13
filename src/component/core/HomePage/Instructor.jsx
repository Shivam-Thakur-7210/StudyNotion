import instructor from "../../../assets/Images/Instructor.png" ;
import CTAButton from "./Button";
import HighlightText from "./HighlightText";
import { FaArrowRight } from "react-icons/fa";


const InstructorSection=()=>{
    return (
        <div className="flex flex-row gap-8">
            <div className="m-14  shadow-[-16px_-16px_0_rgba(255,255,255,1)]">
                <img src={instructor} />
            </div>

            {/* right part */}
            <div className="flex flex-col w-[50%] justify-center gap-12">
                <div className="text-4xl font-semibold">
                     Become an <HighlightText text={"Instructor"}/>
                </div>

                <div className="text-[#728894] max-w-8/12">
                    Instructors from around the world teach millions of students on StudyNotion. 
                    We provide the tools and skills to teach what you love.

                </div>

                <div className="w-fit ml-[35%]">
                    <CTAButton active={true} linkto={" /signup"}  >
                        <div className="flex flex-row items-center justify-center gap-3 cover-fit">
                            Start Learning Today
                            <FaArrowRight/>
                        </div>
                       
                    </CTAButton>

                </div>

                
            </div>

           
            
        </div>
    )
   
}

export default InstructorSection;