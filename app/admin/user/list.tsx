import { Datagrid, ImageField, List, TextField } from "react-admin"

export const Userlist = () => {

    return (
        <List>
            <Datagrid rowClick="edit">
                <TextField source="id" />
                <TextField source="name" />
                <TextField source="email" />
                <TextField source="password" />
                <TextField source="role" />
                <TextField source="createdAt" />
            </Datagrid>
        </List>
    )
}
