import { Create, SimpleForm, TextInput, required } from "react-admin"

export const BookCreate = () => {

    return (
        <Create>
            <SimpleForm>
                <TextInput source="title" validate={[required()]} label="Titulo" />
                <TextInput source="description" />
                <TextInput source="coverImage" />
                <TextInput source="genre" />
                <TextInput source="tags" />
                <TextInput source="status" />
                <TextInput source="createdAt" />
                <TextInput source="updatedAt" />
                <TextInput source="authorId" />
                <TextInput source="author" />
                <TextInput source="chapters" />
                <TextInput source="author" />
            </SimpleForm>
        </Create>
    )
}
