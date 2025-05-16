"use client";

import QuestionForm from "@/components/QuestionForm";
import React from "react";

const AddQues = () => {
    return (
        <div className="pb-20 pt-32">
            <div className="container mx-auto px-4">
                <h1 className="mb-10 mt-4 text-2xl">Add your public question</h1>

                <div className="flex flex-wrap md:flex-row-reverse">
                    <div className="w-full"></div>
                    <div className="w-full">
                        <QuestionForm />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddQues;