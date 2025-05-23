import { databases, users } from "@/models/server/config";
import { answerCollection, db, voteCollection, questionCollection } from "@/models/name";
import { Query } from "node-appwrite";
import React from "react";
import Link from "next/link";
import {ShimmerButton} from "@/components/magicui/shimmer-button";
import QuestionCard from "@/components/QuestionCard";
import { UserPrefs } from "@/store/Auth";
import Pagination from "@/components/Pagination";
import Search from "./Search";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { Particles } from "@/components/magicui/particles";

const Page = async ({
    searchParams,
}: {
    searchParams: Promise<{ page?: string; tag?: string; search?: string }>;
}) => {
    const searchForParams = await searchParams;
    const params = {
        page: searchForParams?.page || "1",
        tag: searchForParams?.tag || "",
        search: searchForParams?.search || ""
    }

    const queries = [
        Query.orderDesc("$createdAt"),
        Query.offset((+params?.page - 1) * 25),
        Query.limit(25),
    ];

    if (params.tag) queries.push(Query.equal("tags", params.tag));
    if (params.search)
        queries.push(
            Query.or([
                Query.search("title", params.search),
                Query.search("content", params.search),
            ])
        );

    const questions = await databases.listDocuments(db, questionCollection, queries);

    questions.documents = await Promise.all(
        questions.documents.map(async ques => {
            const [author, answers, votes] = await Promise.all([
                users.get<UserPrefs>(ques.authorId),
                databases.listDocuments(db, answerCollection, [
                    Query.equal("questionId", ques.$id),
                    Query.limit(1), // for optimization
                ]),
                databases.listDocuments(db, voteCollection, [
                    Query.equal("type", "question"),
                    Query.equal("typeId", ques.$id),
                    Query.limit(1), // for optimization
                ]),
            ]);

            return {
                ...ques,
                totalAnswers: answers.total,
                totalVotes: votes.total,
                author: {
                    $id: author.$id,
                    reputation: author.prefs.reputation,
                    name: author.name,
                },
            };
        })
    );

    return (
        <TracingBeam className="container pl-6">
                    <Particles
                        className="fixed inset-0 h-full w-full"
                        quantity={500}
                        ease={100}
                        color="#ffffff"
                        refresh
                    />
        <div className="container mx-auto px-4 pb-20 pt-36">
            <div className="mb-10 flex items-center justify-between">
                <h1 className="text-3xl font-bold">All Questions</h1>
                <Link href="/questions/ask">
                    <ShimmerButton className="shadow-2xl">
                        <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                            Ask a question
                        </span>
                    </ShimmerButton>
                </Link>
            </div>
            <div className="mb-4">
                <Search />
            </div>
            <div className="mb-4">
                <p>{questions.total} questions</p>
            </div>
            <div className="mb-4 w-full space-y-6">
                {questions.documents.map(ques => (
                    <QuestionCard key={ques.$id} ques={ques} />
                ))}
            </div>
            <Pagination total={questions.total} limit={25} />
        </div>
        </TracingBeam>
    );
};

export default Page;