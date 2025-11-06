import vine,{ SimpleMessagesProvider } from '@vinejs/vine'

vine.messagesProvider = new SimpleMessagesProvider({
  'required':"Por favor ingresa el {{field}}"
});

const createUserValidator = vine.object({
  id:vine.string().optional(),
  userName: vine.string().trim().minLength(3),
  password: vine.string().minLength(4),
  name: vine.string(),
  position: vine.string(),
  degree: vine.string(),
  email: vine.string().email(),
  phone: vine.string(),
  status: vine.enum(['active', 'inactive']).optional(), // ajusta según tus estados

  permissions: vine.object({
   // administrador: vine.boolean(),
    users: vine.object({
      read: vine.boolean(),
      create: vine.boolean(),
      edit: vine.boolean(),
      restore: vine.boolean(),
      delete: vine.boolean(),
    }).optional(),

    dependencies: vine.object({
      read: vine.boolean(),
      create: vine.boolean(),
      edit: vine.boolean(),
      restore: vine.boolean(),
      delete: vine.boolean(),
    }),

    administrativeUnits: vine.object({
      read: vine.boolean(),
      create: vine.boolean(),
      restore: vine.boolean(),
      delete: vine.boolean(),
    }),

    administrativeUnitsInformation: vine.object({
      read: vine.boolean(),
      edit: vine.boolean(),
      allowed: vine.array(vine.string().regex(/^[a-f\d]{24}$/)), // ObjectId como string
    }),
  }).optional(), // porque usas Partial<Permisos>
})
export default vine.compile(createUserValidator);