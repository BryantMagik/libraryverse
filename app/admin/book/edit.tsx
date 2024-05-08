import { SimpleForm, TextInput, required, Edit } from "react-admin"

export const BookEdit = () => {

    return (
        <Edit>
            <SimpleForm>
                <TextInput source="id" validate={[required()]} label="id" />
                <TextInput source="title" validate={[required()]} label="Titulo" />
                <TextInput source="description" validate={[required()]} label="Descripción" />
                <TextInput source="coverImage" label="Imagen del libro" />
                <TextInput source="genre" validate={[required()]} label="Genero" />
                <TextInput source="tags" label="Tags" />
                <TextInput source="authorId" label="Nombre del autor" />
                <TextInput source="author" label="Nombre del autors" />
                <TextInput source="chapters" />
            </SimpleForm>
        </Edit>
    )
}
