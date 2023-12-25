import { SetStateAction, Dispatch } from "react";
export default function Category({ category, selectedCategory, setSelectedCategory }: { category: { name: string; count: number | null }[]; selectedCategory: string; setSelectedCategory: Dispatch<SetStateAction<string>> }) {
    return (
        <>
            {category.map((category, i) => (
                <div className={`hidden md:flex select-none h-[30px] leading-[30px] text-[20px] rounded-[7.5px] overflow-hidden font-extrabold opacity-90 hover:opacity-100 cursor-pointer whitespace-nowrap ${category.name === selectedCategory ? "text-white bg-[#0a8a5c]" : "bg-[#222427] text-[#9da5b6] "}`} key={i} onClick={() => setSelectedCategory(category.name)}>
                    <div className="w-full h-full px-[7.5px] "> {category.name}</div>
                    {category.count && <div className="w-full h-full px-[10px] md:px-[15px] text-white bg-[#0a8a5c]"> {category.count}</div>}
                </div>
            ))}
        </>
    );
}
