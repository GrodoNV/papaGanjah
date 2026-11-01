import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator'

export class LoginDto {
  @IsEmail({}, { message: 'El correo no es válido' })
  @MaxLength(200)
  email!: string

  @IsString()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @MaxLength(100)
  password!: string
}
