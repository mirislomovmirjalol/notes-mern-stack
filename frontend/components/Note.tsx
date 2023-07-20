import {Note as NoteModel} from "@/models/Note";
import {Card, CardContent, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import {formatDate} from "@/utils/formatDate";

interface NoteProps {
    note: NoteModel,
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
            <CardFooter>
                <p>{formattedCreatedAt}</p>
            </CardFooter>
        </Card>

    )
}

export default Note;
