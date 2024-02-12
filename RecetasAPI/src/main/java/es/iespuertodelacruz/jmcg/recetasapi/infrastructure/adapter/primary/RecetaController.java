package es.iespuertodelacruz.jmcg.recetasapi.infrastructure.adapter.primary;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import es.iespuertodelacruz.jmcg.recetasapi.domain.model.Receta;
import es.iespuertodelacruz.jmcg.recetasapi.domain.port.primary.IRecetaDomainService;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/recetas")
public class RecetaController {
	
	@Autowired IRecetaDomainService recetaService;
	
	@GetMapping
	public ResponseEntity<?> getRecetas() {
		List<Receta> findAll = recetaService.findAll();
		return ResponseEntity.ok(findAll);
	}
	
	@PostMapping
	public ResponseEntity<?> saveRecetas(@RequestBody Receta receta) {
		Receta save = recetaService.save(receta);
		System.out.println("Asdasd");
		return ResponseEntity.ok(save);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteRecetas(@PathVariable Integer id) {
		boolean deleteById = recetaService.deleteById(id);
		return ResponseEntity.ok(deleteById);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> getByIdRecetas(@PathVariable Integer id) {
		Receta findById = recetaService.findById(id);
		return ResponseEntity.ok(findById);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<?> updateRecetas(@PathVariable Integer id, @RequestBody Receta receta) {
		return ResponseEntity.ok(null);
	}
}
