import { HttpException, HttpStatus } from "@nestjs/common";

export default function authJwt(jwtService, token, appService) {
    if (!token) {
        throw new HttpException('Token not found', HttpStatus.NOT_FOUND);
    }

    const user = jwtService.verify(token, (err, decoded) => {
      if (err) {
        throw new HttpException('Unauthorized!', HttpStatus.UNAUTHORIZED);
      }
      return appService.selectUser(decoded.email);
    });

    if(!user){
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return true;
}