import { Datagrid, ImageField, List, ReferenceField, SelectColumnsButton, TextField, TopToolbar } from "react-admin"

export const Booklist = () => {

    return (
        <List
            actions={
                <TopToolbar>
                    <SelectColumnsButton />
                </TopToolbar>
            }
        >
            <Datagrid rowClick="edit" sx={{ "& .column-reference": { width: 150 } }}>
                <TextField source="id" />
                <TextField source="title" />
                <ImageField source="coverImage" />
                <TextField source="genre" />
                <TextField source="tags" />
                <TextField source="status" />
                <TextField source="createdAt" />
                <TextField source="updatedAt" />
                <ReferenceField source="authorId" reference="users" label="Author">
                    <TextField source="name" />
                </ReferenceField>
                <TextField source="chapters" />
            </Datagrid>
        </List>
    )
}
