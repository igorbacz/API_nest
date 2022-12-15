export class CreateOfferDto {
  dateAdded: string;

  remote: boolean;

  title: string;

  amount: string;

  city: string;

  companyName: string;

  logo: string;

  mainStack: string;

  adress: string;

  companySize: string;

  exp: string;

  description: string;

  geolocation: Geolocation;

  techStack: TechStack;

  adminEmail: string;
}

class Geolocation {
  latitiude: number;

  longitiude: number;
}

class TechStack {
  stackName: string;

  stackLvl: string;

  value: number;
}
