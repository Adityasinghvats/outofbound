import { databases, users } from "@/models/server/config";
import { UserPrefs } from "@/store/Auth";
import React from "react";
import { MagicCard } from "@/components/magicui/magic-card";
import {NumberTicker} from "@/components/magicui/number-ticker";
import { answerCollection, db, questionCollection } from "@/models/name";
import { Query } from "node-appwrite";

const Page = async ({ params }: { params: { userId: string; userSlug: string } }) => {
    const [user, questions, answers] = await Promise.all([
        users.get<UserPrefs>(params.userId),
        databases.listDocuments(db, questionCollection, [
            Query.equal("authorId", params.userId),
            Query.limit(1), // for optimization
        ]),
        databases.listDocuments(db, answerCollection, [
            Query.equal("authorId", params.userId),
            Query.limit(1), // for optimization
        ]),
    ]);

    return (
        <div>
            <MagicCard className="flex w-full cursor-pointer flex-col items-center justify-center overflow-hidden p-20 shadow-2xl">
                <div className="text-center">
                    <h2 className="text-xl font-medium z-10">User reputation</h2>
                </div>
                <p className="whitespace-nowrap text-4xl font-mediumm">
                    <NumberTicker value={user.prefs.reputation} />
                </p>
            </MagicCard>
            <MagicCard className="flex w-full cursor-pointer flex-col items-center justify-center overflow-hidden p-20 shadow-2xl">
                <div className="text-center">
                    <h2 className="text-xl font-medium">Questions asked</h2>
                </div>
                <p className="whitespace-nowrap text-4xl font-medium">
                    <NumberTicker value={questions.total} />
                </p>
                {/* <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" /> */}
            </MagicCard>
            <MagicCard className="flex w-full cursor-pointer flex-col items-center justify-center overflow-hidden p-20 shadow-2xl">
                <div className="text-center">
                    <h2 className="text-xl font-medium">Answers given</h2>
                </div>
                <p className="whitespace-nowrap text-4xl font-medium">
                    <NumberTicker value={answers.total} />
                </p>
                {/* /<div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" /> */}
            </MagicCard>
        
        </div>
        // <div>
        //     <MagicCard className="flex w-full cursor-pointer flex-col items-center justify-center overflow-hidden p-8 shadow-2xl">
        //         <div className="flex flex-col items-center justify-center">
        //             <h2 className="text-xl font-medium">Reputation</h2>
        //             <p className="whitespace-nowrap text-4xl font-medium">
        //                 <NumberTicker value={user.prefs.reputation} />
        //             </p>
        //         </div>
        //         <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
        //     </MagicCard>
        //     <MagicCard className="flex w-full cursor-pointer flex-col items-center justify-center overflow-hidden p-8 shadow-2xl">
        //         <div className="flex flex-col items-center justify-center">
        //             <h2 className="text-xl font-medium">Questions asked</h2>
        //             <p className="whitespace-nowrap text-4xl font-medium">
        //                 <NumberTicker value={questions.total} />
        //             </p>
        //         </div>
        //         <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
        //     </MagicCard>
        //     <MagicCard className="flex w-full cursor-pointer flex-col items-center justify-center overflow-hidden p-8 shadow-2xl">
        //         <div className="flex flex-col items-center justify-center">
        //             <h2 className="text-xl font-medium">Answers given</h2>
        //             <p className="whitespace-nowrap text-4xl font-medium">
        //                 <NumberTicker value={answers.total} />
        //             </p>
        //         </div>
        //         {/* <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" /> */}
        //     </MagicCard>
        // </div>
    );
};

export default Page;