import { CgUnavailable } from "react-icons/cg";

const NoData = ({ title, body }) => {
  return (
    <section className="bg-white dark:bg-gray-900 md:h-96">
      <div className="py-8 px-4 mx-auto max-w-screen-md text-center lg:py-16 lg:px-12 flex flex-col justify-center items-center">
        <CgUnavailable size={80} className="dark:text-white text-neutral-800" />

        <h1 className="mb-4 text-4xl font-bold tracking-tight leading-none text-gray-900 lg:mb-6 md:text-5xl xl:text-6xl dark:text-white">
          {title}
        </h1>
        <p className="font-light text-gray-500 md:text-lg xl:text-xl dark:text-gray-400">
          {body}
        </p>
      </div>
    </section>
  );
};

export default NoData;
