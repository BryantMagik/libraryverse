
export const ChapterContent = ({ content }: { content: any }) => {

    return (
        <div className="prose px-6"
            dangerouslySetInnerHTML={{ __html: content }}
        >
        </div>
    )
}