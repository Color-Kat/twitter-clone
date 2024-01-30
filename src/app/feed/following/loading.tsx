import {NextPage} from 'next';
import { VscLoading } from "react-icons/vsc";

const LoadingPage: NextPage = ({}) => {

    return (
        <div className="w-full h-64 flex items-center justify-center flex-col gap-2">
            <VscLoading className="w-8 h-8 animate-spin"/>

            <div className="text base text-gray-500">
                Loading...
            </div>
        </div>
    );
};

export default LoadingPage