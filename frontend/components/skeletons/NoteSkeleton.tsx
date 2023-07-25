import {Card, CardContent, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import {Skeleton} from "@/components/ui/skeleton"

const Note = () => {
    return (
        <>
            <Card className="border border-gray-300 shadow-none w-96 hover:border-gray-500 m-2">
                <CardHeader>
                    <CardTitle>
                        <Skeleton className="h-4 w-3/4">
                        </Skeleton>
                    </CardTitle>
                </CardHeader>
                <CardContent className="h-20 overflow-hidden gradient-mask-b-10">
                    <Skeleton className="h-3 w-5/6 my-2" />
                    <Skeleton className="h-3 w-5/6 my-2" />
                    <Skeleton className="h-3 w-5/6 my-2" />
                </CardContent>
                <CardFooter className="flex flex-row">
                    <Skeleton className="h-3 w-full whitespace-nowrap overflow-hidden gradient-mask-r-60">
                        {/*    */}
                    </Skeleton>
                </CardFooter>
            </Card>
        </>
    )
}

export default Note;
