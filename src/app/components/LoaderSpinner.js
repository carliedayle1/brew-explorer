import { InfinitySpin } from "react-loader-spinner";

const LoaderSpinner = () => {
  return (
    <div className="flex justify-center items-center">
      <InfinitySpin width="200" color="#fbbf24" />
    </div>
  );
};

export default LoaderSpinner;
