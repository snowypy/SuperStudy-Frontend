import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast} from "@/hooks/use-toast";

interface CourseInvitationProps {
    id: number
    title: string
    author: string
    authorAvatar: string
    onAccept: (id: number) => void
}


export function CourseInvitation({ id, title, author, authorAvatar, onAccept }: CourseInvitationProps) {
    const [isAccepting, setIsAccepting] = useState(false)
    const { toast } = useToast()

    const handleAccept = async () => {
        setIsAccepting(true)
        await new Promise(resolve => setTimeout(resolve, 1000))
        onAccept(id)
        toast({
            title: "Invitation Accepted",
            description: `You have been added to this course (${title})`,
        })
        setIsAccepting(false)
    }

    return (
        <Card className="dark:bg-gray-800">
            <CardHeader>
                <CardTitle className="text-lg">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center mb-4">
                    <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={authorAvatar} alt={author} />
                        <AvatarFallback>{author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{author}</p>
                        <p className="text-gray-500 dark:text-gray-400">Course Owner</p>
                    </div>
                </div>
                <Button onClick={handleAccept} disabled={isAccepting} className="w-full bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200">
                    {isAccepting ? 'Accepting invite...' : 'Accept Invitation'}
                </Button>
            </CardContent>
        </Card>
    )
}