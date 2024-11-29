

export default function SearchComponent({onChange, placeholder}: {onChange: any, placeholder: string}) {
    return (
        <form className="mt-1">
            <div className="relative">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
                <input
                    onChange={onChange}
                    type="text"
                    placeholder={placeholder}
                    className="w-full py-1 pl-12 text-gray-500 border rounded-md outline-none bg-white/[0.6] focus:bg-white/[0.7]"
                />
            </div>
        </form>
    );
}