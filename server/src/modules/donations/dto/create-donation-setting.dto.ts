import { IsBoolean, IsOptional, IsString, MaxLength, MinLength } from 'class-validator'

export class CreateDonationSettingDto {
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  bankName!: string

  @IsString()
  @MinLength(2)
  @MaxLength(180)
  accountHolder!: string

  @IsString()
  @MinLength(4)
  @MaxLength(50)
  accountNumberOrClabe!: string

  @IsString()
  @MinLength(1)
  @MaxLength(500)
  qrImageUrl!: string

  @IsOptional()
  @IsBoolean()
  isActive?: boolean
}
