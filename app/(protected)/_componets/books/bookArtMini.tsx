import { Book } from '../../../types/typesModels'
import React from 'react'
import Image from 'next/image'

interface BookArtMiniProps extends React.HTMLAttributes<HTMLDivElement> {
    book: Partial<Book>
}
export const BookArtMini: React.FC<BookArtMiniProps> = ({ book }) => {

    return (
        <div>
            {/* <Image className="w-[28px] h-[43px] rounded-none" width={30} height={200} src={book.coverImage || ""} alt={book.title} /> */}
            <span className="flex flex-col items-start">
                <span className="text-left text-[10px] pl-2">{book.title}</span>
                <span className="text-left text-[10px] pl-2">{book.author?.name}</span>
            </span>
        </div>
    )
}