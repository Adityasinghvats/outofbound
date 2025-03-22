"use client";
import { useAuthStore } from '@/store/Auth'
import React from 'react'

export default function Registerpage() {
    const {createAccount, login} = useAuthStore();
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        //collect data
        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        //validate
        if (!name || !email || !password) {
            setError('Please fill in all fields');
            setIsLoading(false);
            return;
        }
        try {
            setIsLoading(true);
            setError("")
            const res = await createAccount(name, email, password);
            if(res.error){
                setError(res.error!.message);
            }else{
                const loginRes = await login(email, password);
                if(loginRes.error){
                    setError(loginRes.error!.message)
                }
            }
        } catch (error: Error | unknown) {
            setError(error instanceof Error ? error.message : 'An error occurred');
        }
        setIsLoading(false);
    }
  return (
    <div>
        {error && (
            <p>{error}</p>
        )}
        <form onSubmit={handleSubmit}>
            <button>
                {isLoading ? 'Loading' : 'Submit'}
            </button>
        </form>
    </div>
  )
}