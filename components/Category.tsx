"use client";
import { SetStateAction, Dispatch, useState } from "react";

export default function Category({ category, selectedCategory, setSelectedCategory }: { category: { name: string; count: number | null }[]; selectedCategory: string; setSelectedCategory: Dispatch<SetStateAction<string>> }) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <>
            <div className={`hidden md:flex gap-2 flex-wrap overflow-scroll w-full content-start transition-all duration-500 ${isExpanded ? "max-h-[100vh]" : "max-h-[15vh]"} `}>
                {category.map((category, i) => (
                    <div className={`flex select-none w-fit h-[30px] leading-[30px] text-[20px] rounded-[7.5px] overflow-hidden font-extrabold opacity-90 hover:opacity-100 cursor-pointer whitespace-nowrap ${category.name === selectedCategory ? "text-white bg-[#0a8a5c]" : "bg-[#222427] text-[#9da5b6] "}`} key={i} onClick={() => setSelectedCategory(category.name)}>
                        <div className="w-full h-full px-[7.5px] "> {category.name}</div>
                        {category.count && <div className="w-full h-full px-[10px] md:px-[15px] text-white bg-[#0a8a5c]"> {category.count}</div>}
                    </div>
                ))}
            </div>

            <button className={`hidden md:block w-8 h-8 border-b-8 border-r-8 rotate-45 transition-all  duration-500 ${isExpanded ? "rotate-[225deg]" : "rotate-45"}`} onClick={() => setIsExpanded(!isExpanded)}></button>
        </>
    );
}
