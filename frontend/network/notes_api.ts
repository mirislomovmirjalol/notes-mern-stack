import {Note} from "@/models/Note";
import {User} from "@/models/User";

async function fetchData(input: RequestInfo, init?: RequestInit) {
    const response = await fetch(input, init)
    if (!response.ok) {
        const errorBody = await response.json()
        const errorMessage = errorBody.message
        throw new Error(errorMessage)
    }
    const data = await response.json()
    return data
}

export async function getAuthUser(): Promise<User> {
    const response = await fetchData(process.env.BACKEND_URL + "/api/users/", {
        method: "GET",
    })
    return response
}

export interface SignupInput {
    username: string
    email: string
    password: string
}

export async function signup(signupInput: SignupInput): Promise<User> {
    const response = await fetchData(process.env.BACKEND_URL + "/api/users/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInput),
    })
    return response
}

export interface LoginInput {
    username: string
    password: string
}

export async function login(loginInput: LoginInput): Promise<User> {
    const response = await fetchData(process.env.BACKEND_URL + "/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInput),
    })
    return response
}

export async function logout(): Promise<void> {
    await fetchData(process.env.BACKEND_URL + "/api/users/logout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    })
}

export async function fetchNotes(): Promise<Note[]> {
    const response = await fetchData(process.env.BACKEND_URL + "/api/notes/", {
        method: "GET",
    })
    return response
}

export interface NoteInput {
    title: string
    text?: string
}

export async function createNote(note: NoteInput): Promise<Note> {
    const response = await fetchData(process.env.BACKEND_URL + "/api/notes/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
    })
    return response.json()
}

export async function deleteNote(noteId: string): Promise<void> {
    await fetchData(process.env.BACKEND_URL + `/api/notes/${noteId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
}

export async function updateNote(noteId: string, note: NoteInput): Promise<Note> {
    const response = await fetchData(process.env.BACKEND_URL + `/api/notes/${noteId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
    })
    return response.json()
}
