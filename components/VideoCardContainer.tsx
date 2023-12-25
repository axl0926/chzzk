"use client"
import{ useState } from 'react';

export default function VideoCardContainer({ data }: { [key: string]: any }) {
    const [isLoading, setIsLoading] = useState(true);
    return (
        <div className="flex flex-col gap-3 m-2 w-64">
            <a href={`https://chzzk.naver.com/live/${data.channel.channelId}`} className=" relative">
                <img src={ isLoading? '/bg-video.png':data.liveImageUrl.replace("{type}", "480")} onLoad={()=>setIsLoading(false)} className="rounded-xl" />
                <div className="flex items-center absolute left-1.5 top-1.5 h-6 gap-2">
                    <span className="bg-red-600 rounded-sm pl-1 pr-1 text-white font-semibold py-0.5 h-4 text-sm leading-4">LIVE</span>
                    <span className="bg-black bg-opacity-80 rounded-sm pl-1 pr-1 text-white font-semibold py-0.5 h-4 text-sm leading-4">{data.concurrentUserCount}명 시청</span>
                </div>
            </a>
            <div className="flex flex-row ">
                <div className='w-1/6'>
                    <a href={`https://chzzk.naver.com/${data.channel.channelId}`}>
                        <div className="rounded-full w-10 h-10 overflow-hidden">
                            <img src={data.channel.channelImageUrl || "https://ssl.pstatic.net/cmstatic/nng/img/img_anonymous_square_gray_opacity2x.png?type=f120_120_na"} className="min-w-full min-h-full object-cover object-center" />
                        </div>
                    </a>
                </div>

                <div className="font-bold w-5/6">
                    <a href={`https://chzzk.naver.com/live/${data.channel.channelId}`}>
                        <div className="text-[#dfe2ea] text-sm px-1 w-4/5 line-clamp-2">{data.liveTitle}</div>
                    </a>
                    {data.liveCategoryValue !== "" && (
                        <div>
                            <span className=" bg-[rgba(46,48,51,.6)] rounded-[5px] p-[4px_6px] text-[#9da5b6] font-extrabold text-[11px] leading-[12px]">{data.liveCategoryValue === "" ? null : data.liveCategoryValue}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
