/* eslint-disable @typescript-eslint/no-explicit-any */
import Pagination from "@/components/Pagination";
import { answerCollection, db, questionCollection, voteCollection } from "@/models/name";
import { databases } from "@/models/server/config";
import convertDateToRelativeTime from "@/utils/relativeTime";
import slugify from "@/utils/slugify";
import Link from "next/link";
import { Query } from "node-appwrite";
import React from "react";
import { Particles } from "@/components/magicui/particles";

const Page = async (
    props: {
        params: Promise<{ userId: string; userSlug: string }>;
        searchParams: Promise<{ page?: string; voteStatus?: "upvoted" | "downvoted" }>;
    }
) => {
    const searchParams = await props.searchParams;
    const params = await props.params;
    searchParams.page ||= "1";

    const query = [
        Query.equal("votedById", params.userId),
        Query.orderDesc("$createdAt"),
        Query.offset((+searchParams.page - 1) * 25),
        Query.limit(25),
    ];

    if (searchParams.voteStatus) query.push(Query.equal("voteStatus", searchParams.voteStatus));

    const votes = await databases.listDocuments(db, voteCollection, query);

    votes.documents = (await Promise.all(
        votes.documents.map(async vote => {
            try {
                // For votes on questions
                if (vote.type === "question") {
                    const questionOfTypeQuestion = await databases.getDocument(
                        db,
                        questionCollection,
                        vote.typeId,
                        [Query.select(["title"])]
                    );

                    return {
                        ...vote,
                        question: questionOfTypeQuestion,
                    };
                }

                // For votes on answers
                try {
                    const answer = await databases.getDocument(db, answerCollection, vote.typeId);
                    const questionOfTypeAnswer = await databases.getDocument(
                        db,
                        questionCollection,
                        answer.questionId,
                        [Query.select(["title"])]
                    );

                    return {
                        ...vote,
                        question: questionOfTypeAnswer,
                    };
                } catch (error:any) {
                    // If answer or its question is deleted, mark it
                    console.log(error)
                    return {
                        ...vote,
                        question: {
                            $id: vote.typeId,
                            title: "[Deleted Content]",
                        },
                    };
                }
            } catch (error:any) {
                console.log(error)
                // Return a placeholder for deleted content
                return {
                    ...vote,
                    question: {
                        $id: vote.typeId,
                        title: "[Deleted Content]",
                    },
                };
            }
        })
    )).filter(vote => vote !== null); // Remove any null entries

    return (
        <div className="px-4">
            <Particles
                className="fixed inset-0 h-full w-full"
                quantity={500}
                ease={100}
                color="#ffffff"
                refresh
            />
            <div className="mb-4 flex justify-between">
                <p>{votes.total} votes</p>
                <ul className="flex gap-1">
                    <li>
                        <Link
                            href={`/users/${params.userId}/${params.userSlug}/votes`}
                            className={`block w-full rounded-full px-3 py-0.5 duration-200 ${
                                !searchParams.voteStatus ? "bg-white/20" : "hover:bg-white/20"
                            }`}
                        >
                            All
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={`/users/${params.userId}/${params.userSlug}/votes?voteStatus=upvoted`}
                            className={`block w-full rounded-full px-3 py-0.5 duration-200 ${
                                searchParams?.voteStatus === "upvoted"
                                    ? "bg-white/20"
                                    : "hover:bg-white/20"
                            }`}
                        >
                            Upvotes
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={`/users/${params.userId}/${params.userSlug}/votes?voteStatus=downvoted`}
                            className={`block w-full rounded-full px-3 py-0.5 duration-200 ${
                                searchParams?.voteStatus === "downvoted"
                                    ? "bg-white/20"
                                    : "hover:bg-white/20"
                            }`}
                        >
                            Downvotes
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="mb-4 max-w-3xl space-y-6">
                {votes.documents.map(vote => (
                    <div
                        key={vote.$id}
                        className="rounded-xl border border-white/40 p-4 duration-200 hover:bg-white/10"
                    >
                        <div className="flex">
                            <p className="mr-4 shrink-0">{vote.voteStatus}</p>
                            <p>
                                {vote.question.title === "[Deleted Content]" ? (
                                    <span className="text-gray-500 italic">
                                        {vote.question.title}
                                    </span>
                                ) : (
                                    <Link
                                        href={`/questions/${vote.question.$id}/${slugify(vote.question.title)}`}
                                        className="text-orange-500 hover:text-orange-600"
                                    >
                                        {vote.question.title}
                                    </Link>
                                )}
                            </p>
                        </div>
                        <p className="text-right text-sm">
                            {convertDateToRelativeTime(new Date(vote.$createdAt))}
                        </p>
                    </div>
                ))}
            </div>
            <Pagination total={votes.total} limit={25} />
        </div>
    );
};

export default Page;