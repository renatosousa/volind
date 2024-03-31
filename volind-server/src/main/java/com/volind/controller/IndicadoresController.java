package com.volind.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.volind.model.Indicador;
import com.volind.model.IndicatorType;

@RestController
@CrossOrigin("*")
public class IndicadoresController {

    @GetMapping("/indicadores")
    public List<Indicador> indicadores() {
        List<Indicador> indicadores = new ArrayList<>();
        Indicador longAndShort = new Indicador(IndicatorType.LongAndShort);
        Indicador petax = new Indicador(IndicatorType.Petax);
        Indicador volatividadeImplicita = new Indicador(IndicatorType.VolatividadeImplicita);
        Indicador options = new Indicador(IndicatorType.options);

        indicadores.add(longAndShort);
        indicadores.add(petax);
        indicadores.add(volatividadeImplicita);
        indicadores.add(options);

        return indicadores;
    }

}
