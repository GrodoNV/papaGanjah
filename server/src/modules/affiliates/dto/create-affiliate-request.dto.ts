import { IsEmail, IsString, Length, Matches, MaxLength, MinLength } from 'class-validator'

export class CreateAffiliateRequestDto {
  @IsString()
  @MinLength(3)
  @MaxLength(150)
  fullName!: string

  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  @MaxLength(200)
  email!: string

  @Matches(/^[0-9+\-()\s]{7,30}$/, {
    message: 'El teléfono solo puede incluir números, espacios y los signos + - ( )',
  })
  phone!: string

  @IsString()
  @MinLength(2)
  @MaxLength(120)
  city!: string

  @IsString()
  @Length(20, 2000, { message: 'La motivación debe tener entre 20 y 2000 caracteres' })
  motivation!: string
}
