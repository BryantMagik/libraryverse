"use client"

import { bookDetails } from "@/actions/book-details"
import MyChaptersAll from "@/app/(protected)/_componets/historys/my-chapter-all"
import { NewChapterForm } from "@/app/(protected)/_componets/historys/new-chapter-form"
import { TitlePage } from "@/app/(protected)/_componets/title-page"
import { Book } from "@/app/types/typesModels"
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

const MyBookChaptersPage = () => {

    const [book, setBook] = useState<Book>()
    const { id } = useParams()
    const bookId = Array.isArray(id) ? id[0] : id

    useEffect(() => {
        bookDetails(bookId)
            .then((fetchBook) => {
                if (fetchBook !== null) {
                    setBook(fetchBook)
                } else {
                    console.error("El libro no fue encontrado")
                }
            })
    }, [bookId])

    return (
        <Tabs aria-label="Opciones">
            <Tab key="chapter" title="Todos los capítulos">
                <Card>
                    <CardBody>
                        <TitlePage title={`Capítulos de ${book?.title}`} subtitle={'Historias publicadas'} />
                        <MyChaptersAll />
                    </CardBody>
                </Card>
            </Tab>
            <Tab key="new" title="Nuevo capítulo">
                <Card>
                    <CardBody>
                        <TitlePage title={`Nuevo Capítulo para ${book?.title}`} subtitle={'Continúa creando capítulos'} />
                        {/* <NewChapterForm content={chapter.content ?? ""}/> */}
                    </CardBody>
                </Card>
            </Tab>
        </Tabs>
    )
}

export default MyBookChaptersPage

