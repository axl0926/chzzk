export default function VideoCardContainer({ data }: { [key: string]: any }) {
    return (
        <div className="flex flex-col gap-3 m-[15px_7px] w-[300px]">
            <a href={`https://chzzk.naver.com/live/${data.channel.channelId}`} className=" relative">
                <img src={data.liveImageUrl.replace("{type}", "480")} className="  rounded-xl " />
                <div className="flex items-center absolute left-[6px] top-[6px] h-6  gap-2">
                    <span className=" bg-red-600 rounded-sm pl-[5px] pr-[5px] text-white font-semibold  p-[2px] h-[18px] text-[12px] leading-[13px]">LIVE</span>
                    <span className=" bg-[rgba(0,0,0,.8)] rounded-sm pl-[5px] pr-[5px] text-white font-semibold p-[2px] h-[18px] text-[12px] leading-[13px]">{data.concurrentUserCount}명 시청</span>
                </div>
            </a>
            <div className="flex flex-row gap-3 ">
                <div>
                    <a href={`https://chzzk.naver.com/${data.channel.channelId}`}>
                        <div className="  rounded-full w-10 h-10 overflow-hidden">
                            <img src={data.channel.channelImageUrl || "https://ssl.pstatic.net/cmstatic/nng/img/img_anonymous_square_gray_opacity2x.png?type=f120_120_na"} className="min-w-full min-h-full object-cover object-center" />
                        </div>
                    </a>
                </div>

                <div className=" font-bold">
                    <a href={`https://chzzk.naver.com/live/${data.channel.channelId}`}>
                        <div className="text-[#dfe2ea] text-[15px] px-1">{data.liveTitle}</div>
                    </a>
                    <a href={`https://chzzk.naver.com/${data.channel.channelId}`} className=" ">
                        <div className="hover:bg-[hsla(0,0%,100%,.1)] hover:rounded-[5px] w-fit">
                            <span className="text-[13px] leading-[24px] px-1">{data.channel.channelName}</span>
                        </div>
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
