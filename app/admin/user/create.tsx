import { Create, SimpleForm, TextInput, required, SelectInput, BooleanInput } from "react-admin"

export const UserCreate = () => {

    return (
        <Create>
            <SimpleForm>
                <TextInput source="id" validate={[required()]} label="id" />
                <TextInput source="name" validate={[required()]} label="Nombre" />
                <TextInput source="email" validate={[required()]} label="Email" />
                <TextInput source="password" validate={[required()]} label="Contraseña" />
                <SelectInput source="role" label="Tipo de usuario" choices={[
                    { id: 'ADMIN', name: 'ADMIN' },
                    { id: 'USER', name: 'USER' }
                ]} />
                <BooleanInput source="isTwoFactorEnabled" label="Autenticación de dos factores" />
            </SimpleForm>
        </Create>
    )
}
