import { ConfigurationUser } from "./configurationUser.interface";

export interface User {
  id: number;
  name: string;
  email: string;
  pasword: string;
  configurationsUser: ConfigurationUser;
}
