import CTAButton from "./Button";
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";

const CodeBlock = ({position,heading ,subheading , ctabtn1, ctabtn2 , codeblock,backgroundGradient, codeColor

  })=>{
    return (
        <div className={`flex ${position}  my-20 justify-between gap-20 px-32 `} >
            {/*part 1*/}
            <div className="w-[50%] flex flex-col px-3 py-3  gap-8">
                <div>
                    {heading} 
                </div>
                <div className="text-[#838894] font-bold">
                    {subheading}
                </div>

                <div className="flex gap-7 mt-7">
                    <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                        <div className="flex flex-row gap-2 items-center">
                            {ctabtn1.btnText}
                            <FaArrowRight/>
                        </div>
                    </CTAButton>

                    <CTAButton className={ctabtn2.active} linkto={ctabtn2.linkto}>
                        <div>
                            {ctabtn2.btnText}
                        </div>
                    </CTAButton>


                    
                </div>

            </div>

            {/*part2 */}
            <div className="flex flex-row relative  px-3 py-3  w-[50%] 


                ">
                {/*gradient*/}
                <div className="absolute left-0 top-0.5 blur-[68px] opacity-20 
                        w-96  h-60 bg-[linear-gradient(123.77deg,#8A2BE2_-6.46%,#FFA500_59.04%,#F8F8FF_124.53%)] rounded-2xl ">

                </div>

                <div className="flex flex-col  ">
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                    <p>11</p>
                </div>

                <div className={`flex flex-col w-[90%] `}>
                    <TypeAnimation
                        sequence={[codeblock,1000]}
                        repeat={Infinity}
                        cursor={true}
                        omitDeletionAnimation={true}

                        style={
                            {
                                display:"block",
                                whiteSpace:"pre-line",

                            }
                        }


                    />
                </div>

            </div>

        </div>
    )
    
}

export default CodeBlock;