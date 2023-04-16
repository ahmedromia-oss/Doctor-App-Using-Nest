import { ForbiddenError } from '@nestjs/apollo';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { IncomingMessage } from 'http';
import { Role, ROLES_KEY } from 'src/common/Decorators/Role-Decorator';

@Injectable()
export class RoleAuthGaurd implements CanActivate {
constructor(private readonly jwtService:JwtService , private reflector: Reflector){}
async canActivate(context: ExecutionContext): Promise<boolean> {
  const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
    context.getHandler(),
    context.getClass(),
  ]);
    
    const ctx = GqlExecutionContext.create(context)
    const request:IncomingMessage & { user?: Record<string, unknown> } = ctx.getContext().req
   
    
    try {
    const authorization = request.headers["authorization"]
    const token = authorization
    const user = this.jwtService.verify(token);
        request.user = user;
      if(requiredRoles.includes(user.Role)){
        return true
      }
      
        
    
    throw new ForbiddenError("Forbidden")
        
      } catch (e) {
      
        throw new ForbiddenError("Forbidden")
        
      }
  }
}