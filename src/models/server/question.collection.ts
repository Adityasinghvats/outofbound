import { IndexType } from "node-appwrite";

import {db, questionCollection} from "../name";
import { databases } from "./config";
import { Permission } from "appwrite";

export default async function createQuestionCollection() {
    //create collection
    await databases.createCollection(
        db, 
        questionCollection,
        questionCollection,
        [
            Permission.read("any"),
            Permission.read("users"),
            Permission.write("users"),
            Permission.create("users"),
            Permission.delete("users")
        ]
    )
    console.log("Question collection is created")

    //creating attributes and indesxes
    await Promise.all([
        databases.createStringAttribute(db, questionCollection, "title", 100, true),
        databases.createStringAttribute(db, questionCollection, "content", 10000, true),
        databases.createStringAttribute(db, questionCollection, "authorId", 100, true),
        databases.createStringAttribute(db, questionCollection, "tags", 100, true, undefined, true),
        databases.createStringAttribute(db, questionCollection, "attachmentId", 100, false),
    ])
    console.log("Question attributes are created")

    //create index
    //as we are creating a lot of indexes, we are using a batch operation
    await Promise.all([
        databases.createIndex(db, questionCollection, "title", IndexType.Fulltext, ["title"],['asc']),
        databases.createIndex(db, questionCollection, "content", IndexType.Fulltext, ["content"],['asc']),
    ])
}