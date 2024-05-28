"use client"

import { Tabs, Tab, Card, CardBody } from "@nextui-org/react"
import MyBooksPublic from "../_componets/books/my-book-public"
import MyBooksAll from "../_componets/books/my-book-all"

const MyHistorys = () => {

    return (
        <div>
            <Tabs aria-label="Options">
                <Tab key="public" title="Publicado">
                    <Card>
                        <CardBody>
                            <MyBooksPublic />
                        </CardBody>
                    </Card>
                </Tab>
                <Tab key="all" title="Todas las historias">
                    <Card>
                        <CardBody>
                            <MyBooksAll />
                        </CardBody>
                    </Card>
                </Tab>

            </Tabs>
        </div>
    )
}

export default MyHistorys
