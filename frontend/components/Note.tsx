import {Note as NoteModel} from "@/models/Note";
import {Card, CardContent, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import {formatDate} from "@/utils/formatDate";
import {deleteNote} from "@/network/notes_api";

interface NoteProps {
    note: NoteModel,
}

const deletingNote = (noteId: string) => {
    deleteNote(noteId).then(() => {
        alert("Note deleted")
        window.location.reload();
    }).catch((e) => {
        console.error(e);
    })
}
const Note = ({note}: NoteProps) => {
    let formattedCreatedAt: string;
    if (note.updatedAt > note.createdAt) {
        formattedCreatedAt = `Updated ${formatDate(note.updatedAt)}`;
    } else {
        formattedCreatedAt = formatDate(note.createdAt);
    }
    return (
        <Card className="border border-gray-300 shadow-none w-96 hover:border-gray-500 m-2">
            <CardHeader>
                <CardTitle>{note.title}</CardTitle>
            </CardHeader>
            <CardContent className="h-20 overflow-hidden gradient-mask-b-10">
                <p>{note.text}</p>
            </CardContent>
            <CardFooter className="flex flex-row">
                <p>{formattedCreatedAt}</p>
                <div className="ml-auto">
                    <button className="mx-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                             stroke="currentColor" className="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"/>
                        </svg>
                    </button>
                    <button className="mx-2" onClick={() => {
                        deletingNote(note._id)
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                             stroke="currentColor" className="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                        </svg>
                    </button>
                </div>
            </CardFooter>
        </Card>
    )
}

export default Note;
