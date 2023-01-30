import { Global, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

@Global() 
@Module({
    imports:[JwtModule.register({
        secret: 'e36c0b26-cd52-4550-8cf6-f23d01429a7a',
        signOptions: { expiresIn: 3000 },
      }),],
      exports:[JwtModule]


}) 
export class GlobalJwtModule{

}