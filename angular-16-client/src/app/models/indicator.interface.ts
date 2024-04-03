import { FeatureIndicator } from "./featureIndicator";

export interface Indicator {
  id: string;
  indicatorType: string;
  descricao: string;
  logo: string;
  rota: string;
  featureIndicator: FeatureIndicator[];
}
