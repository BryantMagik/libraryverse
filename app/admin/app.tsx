"use client"

import { Admin, ListGuesser, Resource } from "react-admin"
import simpleRestProvider from "ra-data-simple-rest"
import { title } from "process"

const dataProvider = simpleRestProvider("/api")

const App = () => {
    return (
        <Admin dataProvider={dataProvider}>
            <Resource
                name="books"
                list={ListGuesser}
                recordRepresentation={title}
            />
        </Admin>
    )
}

export default App