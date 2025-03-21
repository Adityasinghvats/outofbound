import { questionAttachmentbucket} from "../name";
import { storage } from "./config";
import { Permission } from "appwrite";

export default async function getOrCreateStorage(){
    try {
        await storage.getBucket(questionAttachmentbucket);
        console.log("Bucket already exists")
    } catch (error) {
        try {
            await storage.createBucket(
                questionAttachmentbucket,
                questionAttachmentbucket,
                [
                    Permission.read("any"),
                    Permission.read("users"),
                    Permission.write("users"),
                    Permission.create("users"),
                    Permission.delete("users")
                ],
                false,
                undefined,
                undefined,
                ["jpeg", "png", "gif", "jpeg", "webp", "heic"]
            )
            console.log("Bucket is created")
            console.log("Storage connected")
        } catch (error) {
            console.error("error creating storage: ", error)
        }
        console.error("error creating storage: ", error)
    }
}