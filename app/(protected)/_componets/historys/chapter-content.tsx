
export const ChapterContent = ({ content }: { content: any }) => {

    return (
        <div className="prose px-6 dark: dark:text-white dark:prose-dark max-w-none w-full"
            dangerouslySetInnerHTML={{ __html: content }}
        >
        </div>
    )
}