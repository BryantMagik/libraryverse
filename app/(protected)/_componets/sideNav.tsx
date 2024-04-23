import Navbar from './links/links'


export default function sideNav() {
    return (
        <div className='flex h-full flex-col px-3  py-0 md:px-2 bg-emerald-500'>
            <div
                className="flex h-20 justify-center items-center rounded-md md:h-40"
            >
                <div className='flex flex-col w-32 items-center space-y-16 dark:bg-black nav text-white md:w-40  '>
                    <Navbar />
                </div>
            </div>
            <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
            </div>
        </div>
    )
}