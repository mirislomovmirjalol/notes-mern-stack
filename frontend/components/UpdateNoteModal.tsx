import {
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Textarea} from "@/components/ui/textarea"
import {Btn} from "@/components/ui/button"
import {Note} from "@/models/Note";
import {useForm} from "react-hook-form";
import * as NotesApi from "@/network/notes_api";
import {NoteInput} from "@/network/notes_api";

interface AddNoteFormType {
    onNoteSaved: (note: Note) => void;
}

export default function UpdateNoteModal(props: any) {

    const {
        register, handleSubmit, formState: {
            errors,
            isSubmitting
        }
    } = useForm<NoteInput>();

    async function onSubmit(input: NoteInput) {
        try {
            const noteResponse = await NotesApi.updateNote(props.note._id, input);
            props.onNoteSaved(noteResponse);
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{props.title}</DialogTitle>
                    {props.description &&
                        <DialogDescription>
                            {props.description}
                        </DialogDescription>
                    }
                    {props.actions &&
                        <>
                            <div className="grid gap-4 py-4">
                                <form id="addNoteForm" onSubmit={handleSubmit(onSubmit)}>
                                    <input type="text"
                                           className="hidden"
                                           value={props.note._id}
                                    />
                                    <div className="grid grid-cols-4 items-center gap-4 my-3">
                                        <Label htmlFor="title" className="text-right">
                                            Note title
                                        </Label>
                                        <Input id="title" placeholder={props.note.title}
                                               className="col-span-3" {...register("title", {required: "Required"})} />
                                        {errors.title &&
                                            <>
                                                <div/>
                                                <span className="text-red-500 text-xs">{errors.title.message}</span>
                                            </>
                                        }
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4 my-3">
                                        <Label htmlFor="text" className="text-right">
                                            Text
                                        </Label>
                                        <Textarea className="col-span-3"
                                                    placeholder={props.note.text}
                                                  id="text"
                                                  {...register("text")}
                                        />
                                        {errors.text &&
                                            <>
                                                <div/>
                                                <span className="text-red-500 text-xs">{errors.text.message}</span>
                                            </>
                                        }
                                    </div>
                                </form>
                            </div>
                            <DialogFooter>
                                <DialogTrigger>
                                    <Btn form="addNoteForm" type="submit" disabled={isSubmitting}>Update Note</Btn>
                                </DialogTrigger>
                            </DialogFooter>
                        </>
                    }
                </DialogHeader>
            </DialogContent>
        </>
    )
}
