package com.volind.model;

public enum IndicatorType {
    VolatividadeImplicita("Volatividade Implícita", "trending_up", "volatividade"),
    Petax("Ptax", "trending", "ptax"),
    LongAndShort("Long And Short", "chart", "longandshort"),
    options("Opcoes de volatividade", "option", "options");

    private String descricao;
    private String logo;
    private String rota;

    private IndicatorType(String descricao, String logo, String rota) {
        this.descricao = descricao;
        this.logo = logo;
        this.rota = rota;
    }

    public String getDescricao() {
        return descricao;
    }

    public String getLogo() {
        return logo;
    }

    public String getRota() {
        return rota;
    }
}
