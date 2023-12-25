import { SetStateAction, Dispatch } from "react";
export default function CategoryMobile({ category, selectedCategory, setSelectedCategory }: { category: { name: string; count: number | null }[]; selectedCategory: string; setSelectedCategory: Dispatch<SetStateAction<string>> }) {
    return (
        <select className="md:hidden bg-[#222427] text-[#9da5b6] px-[0.5vw]  w-full h-[10vw]  leading-[10vw] text-[5vw] outline-none font-extrabold cursor-pointer " onChange={(e) => setSelectedCategory(e.target.value)}>
            {category.map((category, i) => (
                <option key={i} value={category.name} className={`${category.name === selectedCategory ? " text-white bg-[#0a8a5c]" : ""}`}>
                    {category.name} {category.count && `(${category.count})`}
                </option>
            ))}
        </select>
    );
}
