import {db, answerCollection} from "../name";
import { databases } from "./config";
import { Permission } from "appwrite";

export default async function createAnswerCollection(){
    await databases.createCollection(
        db,
        answerCollection,
        answerCollection,
        [
            Permission.read("any"),
            Permission.read("users"),
            Permission.write("users"),
            Permission.create("users"),
            Permission.delete("users")
        ]
    )
    console.log("Answer collection is created")

    await Promise.all([
        databases.createStringAttribute(db, answerCollection, "content", 10000, true),
        databases.createStringAttribute(db, answerCollection, "authorId", 100, true),
        databases.createStringAttribute(db, answerCollection, "questionId", 100, true),
    ])
    console.log("Answer attributes are created")
}