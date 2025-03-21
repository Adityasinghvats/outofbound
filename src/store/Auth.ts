import {create} from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";

import {AppwriteException, ID, Models} from "appwrite";
import { account } from "@/models/client/config";

//create a reputation for user based on thier votes
export interface UserPrefs {
    reputation: number,
}
interface AuthStore{
    session : Models.Session | null,
    jwt: string| null,
    user: Models.User<UserPrefs> | null,
    hydrated: boolean

    setHydrated(): void;
    verifySession(): Promise<void>;
    login(
        email:string,
        password: string
    ): Promise<{success: boolean, error ?: AppwriteException| null}>;
    createAccount(
        name: string,
        email:string,
        password: string
    ): Promise<{success: boolean, error ?: AppwriteException| null}>;
    logout(): Promise<void>;
}

//zustand store
export const useAuthStore = create<AuthStore>()(
    persist(
        immer((set) => ({
            session: null,
            jwt: null,
            user: null,
            hydrated: false,

            setHydrated() {
                set({hydrated: true})
            },

            
        })),
        {
            name: "auth",
            onRehydrateStorage(){
                return (state, error)=>{
                    if(!error) state?.setHydrated();
                }
            }
        }
    )
)