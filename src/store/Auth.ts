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

            async verifySession() {
                try {
                    const session = await account.getSession("current");
                    set({session});
                } catch (error) {
                    console.log("Error verifying session", error);
                }
            },

            async login(email, password) {
                try {
                    const session = await account.createEmailPasswordSession(email, password);
                    const [user, {jwt}] = await Promise.all([
                        account.get<UserPrefs>(),
                        account.createJWT()
                    ])
                    if(!user.prefs?.reputation) await account.updatePrefs<UserPrefs>({reputation: 0});
                    set({session, user, jwt});
                    return {success: true, };
                } catch (error) {
                    console.log("Error logging in", error);
                    return {
                        success: false, 
                        error: error instanceof AppwriteException ? error : null
                    };  
                }
            },

            async createAccount(name:string, email:string, password:string) {
                try {
                    await account.create(ID.unique() ,name, email, password);
                    return {success: true};
                } catch (error) {
                    console.log("Error creating account", error);
                    return {
                        success: false, 
                        error: error instanceof AppwriteException ? error : null
                    };
                }
            },

            async logout() {
                try {
                    await account.deleteSessions();
                    set({session: null, jwt:null, user: null});
                } catch (error) {
                    console.log("Error logout", error);
                }
            },
        })),

        //for immer to work we need to use the immer middleware
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