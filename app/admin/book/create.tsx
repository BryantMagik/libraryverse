import { Create, SimpleForm, TextInput, required, ReferenceInput, SelectInput } from "react-admin"

export const BookCreate = () => {

    return (
        <Create>
            <SimpleForm>
                <TextInput source="title" validate={[required()]} label="Titulo" />
                <TextInput source="description" validate={[required()]} label="Descripción" />
                <TextInput source="coverImage" label="Imagen del libro" />
                <TextInput source="genre" validate={[required()]} label="Genero" />
                <TextInput source="tags" label="Tags" />
                <ReferenceInput source="authorId" reference="users">
                    <SelectInput optionText="name" />
                </ReferenceInput>
                <TextInput source="chapters" />
            </SimpleForm>
        </Create>
    )
}
