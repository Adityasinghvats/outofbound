import { Particles } from "@/components/magicui/particles";
import React from "react";


const Page = () => {
    return (
        <div>
            <Particles
                className="fixed inset-0 h-full w-full"
                quantity={500}
                ease={100}
                color="#ffffff"
                refresh
            />
            <div className="container mx-auto space-y-4 px-4 pb-20 pt-32">
            {/* <h1>Edit</h1>
            <h2>Homework</h2> */}
        </div>
        </div>
        
    );
};

export default Page;