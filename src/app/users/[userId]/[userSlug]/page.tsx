
import { databases, users } from "@/models/server/config";
import { UserPrefs } from "@/store/Auth";
import React from "react";
import { MagicCard } from "@/components/magicui/magic-card";
import {NumberTicker} from "@/components/magicui/number-ticker";
import { answerCollection, db, questionCollection } from "@/models/name";
import { Query } from "node-appwrite";
import { Particles } from "@/components/magicui/particles";

const Page = async (props: { params: Promise<{ userId: string; userSlug: string }> }) => {
    const params = await props.params;
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
            <Particles
                className="fixed inset-0 h-full w-full"
                quantity={500}
                ease={100}
                color="#ffffff"
                refresh
            />
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
    );
};

export default Page;