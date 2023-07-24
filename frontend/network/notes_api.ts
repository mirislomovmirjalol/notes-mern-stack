import {Note} from "@/models/Note";

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

export async function fetchNotes(): Promise<Note[]> {
    const response = await fetchData("http://localhost:3001/api/notes/", {
        method: "GET",
    })
    return response
}

export interface NoteInput {
    title: string
    text?: string
}

export async function createNote(note: NoteInput): Promise<Note> {
    const response = await fetchData("http://localhost:3001/api/notes/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
    })
    return response.json()
}

export async function deleteNote(noteId: string): Promise<void> {
    await fetchData(`http://localhost:3001/api/notes/${noteId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
}

export async function updateNote(noteId: string, note: NoteInput): Promise<Note> {
    const response = await fetchData(`http://localhost:3001/api/notes/${noteId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
    })
    return response.json()
}
