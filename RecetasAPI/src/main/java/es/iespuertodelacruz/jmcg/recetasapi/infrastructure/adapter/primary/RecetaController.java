package es.iespuertodelacruz.jmcg.recetasapi.infrastructure.adapter.primary;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import es.iespuertodelacruz.jmcg.recetasapi.domain.port.primary.IRecetaDomainService;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/recetas")
public class RecetaController {
	
	@Autowired IRecetaDomainService recetaService;
}
