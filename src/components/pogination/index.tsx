"use client"
import { useRouter } from "next/navigation";

export const PaginationButton = ({ pathName, currentPage, disabled }: any) => {
    const router = useRouter();
    const handleNextPage = async () => {
        router.push(`${pathName}?page=${currentPage + 1}`);
    };

    const handlePrevPage = async () => {
        router.push(`${pathName}?page=${Math.max(currentPage - 1, 1)}`);
    };


    return (<>
        <div className="px-5 py-5  border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
            {/* <span className="text-xs xs:text-sm text-gray-900">
                Showing 1 to 4 of 50 Entries
            </span> */}
            <div className="inline-flex mt-2 xs:mt-0">
                <button onClick={handlePrevPage} type="button" className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l">
                    Prev
                </button>
                <button disabled={disabled} onClick={handleNextPage} type="button" className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r">
                    Next
                </button>
            </div>
        </div>
    </>)

}