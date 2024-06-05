"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { GBook } from '@/app/types/typesBooksAPi'
import GbookArtsDetails from "../../_componets/books/gbookdetails"

const GbookDestails = () => {
    
    const [gbook, setGbook] = useState<GBook>()
    const { id } = useParams()
    const normalizedBookId = Array.isArray(id) ? id[0] : id

    useEffect(() => {
        if (id) {
            const fetchGbook = async () => {
                const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${normalizedBookId}`)
                const data = await response.json()
                console.log(data)
                setGbook(data)
            }
            fetchGbook()
        }

    }, [id])

    return (
        <>
            <GbookArtsDetails gbook={gbook}/>
        </>
    )
}

export default GbookDestails