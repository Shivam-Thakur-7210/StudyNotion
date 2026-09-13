import HighlightText from "./HighlightText";
import KnowYourProgress from "../../../assets/Images/know_your_progress.png";
import compareWithOthers from "../../../assets/Images/compare_with_others.png";
import planYourLessons from "../../../assets/Images/plan_your_lessons.png";
import CTAButton from "./Button";

const LearningLanguageSection = ()=>{
    return (
        <div className="flex flex-col items-center mt-40">
            <div className="flex flex-row gap-2 text-4xl font-bold " >
                <p >
                    Your Swiss Knife for   
                </p>
                <HighlightText text={'learning any language '} />

            </div>

            <div className="mt-8">
                Using spin making learning multiple languages easy. with 20+ languages 
                realistic voice-over, progress tracking, custom schedule and more.
            </div>

            <div className="flex flex-row ">
                <img src={KnowYourProgress} 
                className="-m-32 object-contain"
                />
                <img src={compareWithOthers}
                className="object-contain"
                />
                <img src={planYourLessons} 
                className="-m-32 object-contain "
                />
            </div>

            <CTAButton active={true} >
                Lear More
            </CTAButton>



        </div>
    )
  
}

export default LearningLanguageSection;
