import { StreamChat } from "stream-chat";
import { ENV } from "./env";
import { log } from "node:console";

const apiKey = ENV.STREAM_API_KEY!;
const apiSecret = ENV.STREAM_API_SECRET!;

if (!apiKey || !apiSecret) {
    console.log("stream secrets are missing")
}

export const chatClient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertStreamUser = async (userData: any) => {
    try {
        await chatClient.upsertUser(userData)
        console.log("Stream user upserted successfully.");
    } catch (error) {
        const err = error as Error;
        console.error("Error upserting stream user: ", err.message)
    }
}

export const deleteStreamUser = async (userId: string) => {
    try {
        await chatClient.deleteUser(userId)
    } catch (error) {
        const err = error as Error;
        console.error("Error deleting stream user: ", err.message)
    }
}