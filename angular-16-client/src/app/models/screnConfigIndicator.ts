import { Indicator } from "./indicator.interface";
import { IndicatorAplicado } from "./indicatorAplicado";

export interface ScrenConfigIndicator {
  id: string;
  indicator: IndicatorAplicado;
  x: number;
  y: number;
 }
