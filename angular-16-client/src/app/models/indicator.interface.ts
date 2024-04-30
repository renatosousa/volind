import { FeatureIndicator } from "./featureIndicator";

export interface  Indicator {
  id: string;
  indicatorType: string;
  descricao: string;
  tituloOpcoes:string;
  logo: string;
  rota: string;
  featureIndicator: FeatureIndicator[];
  tipoCompra: any;
  modo: any;
}
