import { Chapter, ChapterUserStatus } from "@prisma/client"

export type ChapterWithUserStatus = Chapter & {
    userStatus: ChapterUserStatus | null
}
