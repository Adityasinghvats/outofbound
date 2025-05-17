
import React from "react";
import AddQues from "./AddQues";
import { Particles } from "@/components/magicui/particles";

const Page = async () => {
    return (
        <div>
            <Particles
                className="fixed inset-0 h-full w-full"
                quantity={500}
                ease={100}
                color="#ffffff"
                refresh
            />
            <div className="flex justify-center items-center">
                <AddQues/>
            </div>
        </div>
    );
};

export default Page;