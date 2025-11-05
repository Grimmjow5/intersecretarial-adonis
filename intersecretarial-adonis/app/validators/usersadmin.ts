import vine, { SimpleMessagesProvider } from '@vinejs/vine'

vine.messagesProvider = new SimpleMessagesProvider({
    'required': "Ingresa {{field}}"
});

const createAdmin = vine.object({
    userName: vine.string().trim().minLength(3),
    password: vine.string().minLength(4),
    name: vine.string(),
    position: vine.string(),
    degree: vine.string(),
    email: vine.string().email(),
    phone: vine.string(),
    //status: vine.enum(['active', 'inactive']) // ajusta según tus estados
});
export default vine.compile(createAdmin);