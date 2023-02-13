import { ApiProperty } from '@nestjs/swagger';

class TechStack {
  @ApiProperty({
    description: 'Stack name',
    example: 'JS',
  })
  stackName: string;

  @ApiProperty({
    description: 'Stack lvl',
    example: 'Junior',
  })
  stackLvl: string;

  @ApiProperty({
    description: 'Stack lvl value',
    example: 2,
  })
  value: number;
}

class Geolocation {
  @ApiProperty({
    description: 'latitiude',
    example: 24.665467,
  })
  latitiude: number;

  @ApiProperty({
    description: 'longitiude',
    example: 51.665467,
  })
  longitiude: number;
}

export class CreateOfferDto {
  @ApiProperty({
    description: 'Date of adding the offer',
    example: '2022-09-01',
  })
  dateAdded: string;

  @ApiProperty({
    description: 'Is the job remote',
    example: true,
  })
  remote: boolean;

  @ApiProperty({
    description: 'Offer title',
    example: 'JS Developer',
  })
  title: string;

  @ApiProperty({
    description: 'Salary',
    example: '14000',
  })
  amount: string;

  @ApiProperty({
    description: 'City',
    example: 'Kielce',
  })
  city: string;

  @ApiProperty({
    description: 'Company name',
    example: 'IBM',
  })
  companyName: string;

  @ApiProperty({
    description: 'Company logo',
    example:
      'sdfghjkjhgfgtyuikjhgftyuikjnbvghjnbvfghbvfghbvfghbvcfghnbvfghnbvfg987654erfghu765rf',
  })
  logo: string;

  @ApiProperty({
    description: 'The main technology used in the company',
    example: 'JS',
  })
  mainStack: string;

  @ApiProperty({
    description: 'Company address',
    example: 'ul. Sadowa  Kielce',
  })
  adress: string;

  @ApiProperty({
    description: 'Company size',
    example: '44',
  })
  companySize: string;

  @ApiProperty({
    description: 'Experience',
    example: 'Junior',
  })
  exp: string;

  @ApiProperty({
    description: 'Offer description',
    example:
      'For our client from Austria in the field of industrial metal 3D printing were currently looking for an experienced Unity 3D Developer',
  })
  description: string;

  @ApiProperty({
    description: 'Geolocation of company',
    example: { longitiude: 12.4567898, latitiude: 36.56898 },
  })
  geolocation: Geolocation;

  @ApiProperty({
    isArray: true,
    description: 'The main technologies used in the company',
    example: [
      {
        stackName: 'JS',
        stackLvl: 'junior',
        value: 2,
      },
      {
        stackName: 'CSS',
        stackLvl: 'junior',
        value: 2,
      },
    ],
  })
  techStack: TechStack[];

  @ApiProperty({
    description: 'Admin email',
    example: 'admin@admin.com',
  })
  adminEmail: string;
}


