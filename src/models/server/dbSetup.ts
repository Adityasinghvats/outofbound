import { db } from "../name";
import createQuestionCollection from "./question.collection";
import createAnswerCollection from "./answer.collection";
import createCommentCollection from "./comment.collection";
import createVoteCollection from "./vote.collection";
import {databases} from "./config";
//for sedding the databse with some intial data
export default async function getOrCreateDB(){
    try {
        await databases.get(db);
        console.log("Database is already created")
    } catch (error) {
        try {
            await databases.create(db, db);
            console.log("Database is created");
            Promise.all([
                createQuestionCollection(),
                createAnswerCollection(),
                createVoteCollection(),
                createCommentCollection()
            ])
            console.log("Collections are created")
        } catch (error) {
            console.log("Error in creating collections", error)
        }
        console.log("Error in getting database", error)
    }
    return databases;
}