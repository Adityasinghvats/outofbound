import {db, voteCollection} from "../name";
import { databases } from "./config";
import { Permission } from "appwrite";

export default async function createAnswerCollection(){
    await databases.createCollection(
        db,
        voteCollection,
        voteCollection,
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
        databases.createEnumAttribute(db, voteCollection, "type", ["question", "answer"], true),
        databases.createEnumAttribute(db, voteCollection, "voteStatus", ["upvoted", "downvoted"], true),
        databases.createStringAttribute(db, voteCollection, "typeId", 100, true),
        databases.createStringAttribute(db, voteCollection, "votedById", 100, true),
    ])
    console.log("Answer attributes are created")
}