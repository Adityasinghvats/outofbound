/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useState, useEffect} from "react";
import { HeroParallax } from "@/components/ui/hero-parallax";
import { databases } from "@/models/client/config";
import { db, questionAttachmentbucket, questionCollection } from "@/models/name";
import { Query } from "node-appwrite";
import slugify from "@/utils/slugify";
import { storage } from "@/models/client/config";
import HeroSectionHeader from "./HeroSectionHeader";

export default function HeroSection() {
    const [questions, setQuestions] = useState<any[]>([]);
   
    useEffect(() => {
        const fetchQuestions = async () => {
            const result = await databases.listDocuments(db, questionCollection, [
                Query.orderDesc("$createdAt"),
                Query.limit(15),
            ]);
            setQuestions(result.documents);
           
        };
        fetchQuestions();
    }, []);
  

    return (
        <HeroParallax
            header={<HeroSectionHeader />}
            products={questions.map(q => ({
                title: q.title,
                link: `/questions/${q.$id}/${slugify(q.title)}`,
                thumbnail: storage.getFileView(questionAttachmentbucket, q.attachmentId),
            }))}
        />
    );
}