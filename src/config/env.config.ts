
export const EnvConfiguration = () => ({
    environment :  process.env.NODE_ENV || 'dev',
    mongodb     :  process.env.MONGODB,
    port        :  process.env.PORT || 3000,
    //dado que las variables de entorno se manejan todas como string
    //hay que forzar la conversion a numero
    defaultLimit:  +process.env.DEFAULTLIMIT || 7,
})
