import { Datagrid, ImageField, List, TextField } from "react-admin"

export const Booklist = () => {

    return (
        <List>
            <Datagrid rowClick="edit">
                <TextField source="id" />
                <TextField source="title" />
                <TextField source="description" />
                <ImageField source="coverImage"/>
                <TextField source="genre" />
                <TextField source="tags" />
                <TextField source="status" />
                <TextField source="createdAt" />
                <TextField source="updatedAt" />
                <TextField source="authorId" />
                <TextField source="author" />
                <TextField source="chapters" />
            </Datagrid>
        </List>
    )
}
