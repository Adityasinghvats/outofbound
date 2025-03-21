import {db, commentCollection} from "../name";
import { databases } from "./config";
import { Permission } from "appwrite";

export default async function createCommentCollection(){
    await databases.createCollection(
        db,
        commentCollection,
        commentCollection,
        [
            Permission.read("any"),
            Permission.read("users"),
            Permission.write("users"),
            Permission.create("users"),
            Permission.delete("users")
        ]
    )
    console.log("comment collection is created")

    await Promise.all([
        databases.createStringAttribute(db, commentCollection, "content", 10000, true),
        databases.createStringAttribute(db, commentCollection, "authorId", 100, true),
        databases.createStringAttribute(db, commentCollection, "typeId", 100, true),
        databases.createEnumAttribute(db, commentCollection, "type", ["answer", "question"], true)
    ])
    console.log("comment attributes are created")
}