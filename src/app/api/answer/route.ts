import { answerCollection } from "@/models/name";
import { databases, users } from "@/models/server/config";
import { NextRequest, NextResponse } from "next/server";
import { ID } from "node-appwrite";
import { db } from "@/models/name";
import {UserPrefs} from "@/store/Auth";

export async function POST(request: NextRequest){
    try {
        const {questionId, content, authorId} = await request.json();

        const response = await databases.createDocument(db, answerCollection, ID.unique(),
        {
            content: content,
            authorId: authorId,
            questionId: questionId
        })
        //increase author rputation
        const prefs = await users.getPrefs<UserPrefs>(authorId)
        await users.updatePrefs(authorId, 
            {reputation: Number(prefs.reputation) + 1}
        )
        return NextResponse.json(response,{
            status: 201
        });

    } catch (error: any) {
        console.error(error);
        return  NextResponse.json(
            {
                error: error?.message || "error creating answer"
            },
            {
                status: error?.status || error?.code || 500
            }
        )  
    }
}

export async function DELETE(request: NextRequest){
    try {
        const {answerId} = await request.json();
        const answer = await databases.getDocument(db, answerCollection, answerId);
        if(!answer) throw {status: 404, message: "answer not found"}
        const response = await databases.deleteDocument(db, answerCollection, answerId);
        //decrease author reputation
        const prefs = await users.getPrefs<UserPrefs>(answer.authorId)
        await users.updatePrefs(answer.authorId, 
            {reputation: Number(prefs.reputation) - 1}
        )
        return NextResponse.json(response,{
            status: 201
        });
    } catch (error:any) {

        console.error(error);
        return  NextResponse.json(
            {
                error: error?.message || "error deleting answer"
            },
            {
                status: error?.status || error?.code || 500
            }
        )
    }
}