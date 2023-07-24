"use client";
import React, {useEffect, useState} from 'react';
import {Note as NoteModel} from "@/models/Note";
import Note from "@/components/Note";
import {Dialog, DialogTrigger,} from "@/components/ui/dialog"
import AddNoteModal from "@/components/AddNoteModal";
import * as NotesApi from "@/network/notes_api"


export default function Home() {
    const [notes, setNotes] = useState<NoteModel[]>([]);
    useEffect(() => {
        async function getNotes() {
            try {
                const notes = await NotesApi.fetchNotes();
                setNotes(notes);
            } catch (e) {
                console.error(e);
            }
        }

        getNotes();
    }, []);

    return (
        <>
            <Dialog>
                <AddNoteModal title="New Note" actions={true} onNoteSaved={(newNote: NoteModel) => {
                    setNotes([newNote, ...notes]);
                }}/>
                <div className="py-4 px-10 w-screen flex justify-end">
                    <DialogTrigger
                        className="bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 h-10 px-4 py-2 rounded-md">
                        Create note
                    </DialogTrigger>
                </div>
            </Dialog>
            <div className="flex flex-wrap justify-center items-center">
                {notes.map((note) => {
                    return <Note key={note._id} note={note}/>
                })}
            </div>
        </>
    )
}
