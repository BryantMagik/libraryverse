"use client"

import { Admin, Resource } from "react-admin"
import simpleRestProvider from "ra-data-simple-rest"
import { Booklist } from "./book/list"
import { BookCreate } from "./book/create"
import { BookEdit } from "./book/edit"
import { Userlist } from "./user/list"
import { UserEdit } from "./user/edit"
import { Chapterlist } from "./chapter/list"
import dashboard from "./dashboard/dashboard"
//TODOO import { darkTheme, lightTheme } from './themes'


const dataProvider = simpleRestProvider("/api")

const App = () => {
    return (
        <Admin dashboard={dashboard} dataProvider={dataProvider}
        >
            <Resource
                name="books"
                list={Booklist}
                create={BookCreate}
                edit={BookEdit}
                recordRepresentation="title"
            />
            <Resource
                name="users"
                list={Userlist}
                edit={UserEdit}
                recordRepresentation="title"
            />
            {/* <Resource
                name="chapter"
                list={Chapterlist}
                recordRepresentation="title"
            /> */}
        </Admin>
    )
}

export default App