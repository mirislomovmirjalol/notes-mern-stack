"use client";
import React, {useEffect, useState} from 'react';
import {Note as NoteModel} from "@/models/Note";
import Note from "@/components/Note";


export default function Home() {
    const [notes, setNotes] = useState<NoteModel[]>([]);
    useEffect(() => {
        async function getNotes() {
            try {
                const data = await fetch("http://localhost:3001/api/notes/", {method: "GET"});
                const notes = await data.json();
                setNotes(notes);
            } catch (e) {
                console.error(e);
            }
        }

        getNotes();
    }, []);

    return (
        <>
            <div className="flex flex-wrap justify-center items-center py-10">
                {notes.map((note) => {
                    return <Note key={note._id} note={note}/>
                })}
            </div>
        </>
    )
}
