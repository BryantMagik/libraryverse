import { Datagrid, ImageField, List, ReferenceField, SelectColumnsButton, TextField, TopToolbar } from "react-admin"



export const Chapterlist = () => {

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
                <ImageField source="content" />
                <TextField source="order" />
                <TextField source="bookId" />
                <TextField source="book" />
                <TextField source="createdAt" />
                <TextField source="updatedAt" />
            </Datagrid>
        </List>
    )
}
