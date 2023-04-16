import { JwtModuleAsyncOptions } from "@nestjs/jwt";

export const jwtConfig : JwtModuleAsyncOptions= {
    useFactory:()=>{
        return {
            secret: process.env.MY_SECRET_TOKEN,
            signOptions: { expiresIn: '10h' },
        }
    }
        
    
}