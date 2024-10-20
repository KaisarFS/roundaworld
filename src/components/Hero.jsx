export default function Hero() {
  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute -top-96 start-1/2 flex -translate-x-1/2"
      >
        <div className="h-[44rem] w-[25rem] -translate-x-40 rotate-[-60deg] bg-gradient-to-r from-violet-300/50 to-purple-100 blur-3xl" />
        <div className="rounded-fulls h-[50rem] w-[90rem] origin-top-left -translate-x-60 -rotate-12 bg-gradient-to-tl from-blue-50 via-blue-100 to-blue-50 blur-3xl" />
      </div>

      <div className="relative z-10">
        <div className="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:pb-28 lg:pt-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="inline-block bg-gradient-to-l from-blue-600 to-violet-500 bg-clip-text text-sm font-medium text-transparent">
              List countries with rescountries API 2024
            </p>

            <div className="mt-5 max-w-2xl">
              <h1 className="text-black-800 block text-4xl font-semibold md:text-5xl lg:text-6xl">
                Get to know the world around you better
              </h1>
            </div>

            <div className="mt-5 max-w-3xl">
              <p className="text-lg text-gray-600">
                Lorem ipsum aja ya mas dolor sit amet consectetur adipisicing
                elit. cumque eum accusamus possimus hic iste dolor tenetur
                animi.
              </p>
            </div>

            <div className="mt-8 flex justify-center gap-3">
              <a
                className="inline-flex items-center gap-x-2 rounded-lg border border-transparent bg-blue-600 px-4 py-3 text-sm font-medium text-white hover:bg-blue-700 focus:bg-blue-700 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                href="#countries"
              >
                Explore
                <svg
                  className="size-4 shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </a>
              <a
                className="inline-flex items-center gap-x-2 rounded-lg border border-transparent px-4 py-3 text-sm font-medium text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                href="https://github.com/KaisarFS/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  className="size-4 shrink-0"
                  src="/logos/logo-github.svg"
                  alt="GitHub logo"
                  width="19"
                  height="18"
                />
                My Github
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
