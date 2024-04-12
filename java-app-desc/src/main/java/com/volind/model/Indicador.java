package com.volind.model;

public class Indicador {
    private IndicatorType indicatorType;

    public Indicador() {
    }

    public Indicador(IndicatorType indicatorType) {
        this.indicatorType = indicatorType;
    }

    public IndicatorType getIndicatorType() {
        return indicatorType;
    }

    public void setIndicatorType(IndicatorType indicatorType) {
        this.indicatorType = indicatorType;
    }

    public String getDescricao() {
        return indicatorType.getDescricao();

    }

    public String getLogo() {
        return indicatorType.getLogo();
    }

    public String getRota() {
        return indicatorType.getRota();
    }
}
