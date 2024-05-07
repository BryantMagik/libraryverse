"use client"

import { Admin, Resource } from "react-admin"
import simpleRestProvider from "ra-data-simple-rest"
import { Booklist } from "./book/list"
import { BookCreate } from "./book/create"
import { BookEdit } from "./book/edit"

const dataProvider = simpleRestProvider("/api")

const App = () => {
    return (
        <Admin dataProvider={dataProvider}>
            <Resource
                name="books"
                list={Booklist}
                create={BookCreate}
                edit={BookEdit}
                recordRepresentation="title"
            />
        </Admin>
    )
}

export default App