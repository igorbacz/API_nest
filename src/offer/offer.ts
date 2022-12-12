export class Offer {
  readonly _id: string;
  readonly dateAdded: string;
  readonly remote: boolean;
  readonly title: string;
  readonly amount: string;
  readonly city: string;
  readonly companyName: string;
  readonly logo: string;
  readonly mainStack: string;
  readonly adress: string;
  readonly companySize: string;
  readonly exp: string;
  readonly description: string;
  readonly geolocation: Geolocation;
  readonly techStack: TechStack;
  readonly adminEmail: string;
}

class TechStack {
  readonly stackName: string;
  readonly stackLvl: string;
  readonly value: number;
}

class Geolocation {
  readonly latitiude: string | number;
  readonly longitiude: string | number;
}
