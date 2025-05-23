import { Particles } from "@/components/magicui/particles";
import Pagination from "@/components/Pagination";
import { MarkdownPreview } from "@/components/RTE";
import { answerCollection, db, questionCollection } from "@/models/name";
import { databases } from "@/models/server/config";
import slugify from "@/utils/slugify";
import Link from "next/link";
import { Query } from "node-appwrite";
import React from "react";


const Page = async (
    props: {
        params: Promise<{ userId: string; userSlug: string }>;
        searchParams: Promise<{ page?: string }>;
    }
) => {
    const searchParams = await props.searchParams;
    const params = await props.params;
    searchParams.page ||= "1";

    const queries = [
        Query.equal("authorId", params.userId),
        Query.orderDesc("$createdAt"),
        Query.offset((+searchParams.page - 1) * 25),
        Query.limit(25),
    ];

    const answers = await databases.listDocuments(db, answerCollection, queries);

    answers.documents = (await Promise.all(
        answers.documents.map(async ans => {
            try {
                const question = await databases.getDocument(
                    db, 
                    questionCollection, 
                    ans.questionId, 
                    [Query.select(["title"])]
                );
                return { ...ans, question };
            } catch (error) {
                // Handle deleted questions
                console.log(error)
                return {
                    ...ans,
                    question: {
                        $id: ans.questionId,
                        title: "[Deleted Question]"
                    }
                };
            }
        })
    )).filter(Boolean); // Remove any undefined entries

    return (
        <div className="px-4">
            <Particles
                className="fixed inset-0 h-full w-full"
                quantity={500}
                ease={100}
                color="#ffffff"
                refresh
            />
            <div className="mb-4">
                <p>{answers.total} answers</p>
            </div>
            <div className="mb-4 max-w-3xl space-y-6">
                {answers.documents.map(ans => (
                    <div 
                        key={ans.$id}
                        className="rounded-xl border border-white/40 p-4 duration-200 hover:bg-white/10"
                    >
                        <div className="max-h-40 overflow-auto">
                            <MarkdownPreview source={ans.content} className="rounded-lg p-4" />
                        </div>
                        {ans.question.title === "[Deleted Question]" ? (
                            <span className="mt-3 inline-block text-gray-500 italic">
                                {ans.question.title}
                            </span>
                        ) : (
                            <Link
                                href={`/questions/${ans.questionId}/${slugify(ans.question.title)}`}
                                className="mt-3 inline-block shrink-0 rounded bg-orange-500 px-4 py-2 font-bold text-white hover:bg-orange-600"
                            >
                                View Question
                            </Link>
                        )}
                    </div>
                ))}
            </div>
            <Pagination total={answers.total} limit={25} />
        </div>
    );
};

export default Page;