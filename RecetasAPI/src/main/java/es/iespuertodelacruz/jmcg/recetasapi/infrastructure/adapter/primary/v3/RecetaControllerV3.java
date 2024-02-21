package es.iespuertodelacruz.jmcg.recetasapi.infrastructure.adapter.primary.v3;

import java.util.Base64;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import es.iespuertodelacruz.jmcg.recetasapi.domain.model.Receta;
import es.iespuertodelacruz.jmcg.recetasapi.domain.model.Usuario;
import es.iespuertodelacruz.jmcg.recetasapi.domain.port.primary.IRecetaDomainService;
import es.iespuertodelacruz.jmcg.recetasapi.domain.port.primary.IUsuarioDomainService;
import es.iespuertodelacruz.jmcg.recetasapi.infrastructure.adapter.primary.RecetaDTO;
import es.iespuertodelacruz.jmcg.recetasapi.infrastructure.adapter.primary.RecetaUpdateDTO;
import es.iespuertodelacruz.jmcg.recetasapi.infrastructure.adapter.secundary.file.FileStorageRecetaService;

@RestController
@CrossOrigin
@RequestMapping("/api/v3/recetas")
public class RecetaControllerV3 {
	
	@Autowired IRecetaDomainService recetaService;
	
	@Autowired IUsuarioDomainService usuarioService;
	
	@Autowired FileStorageRecetaService fileStorageRecetaService;
	
	@GetMapping
	public ResponseEntity<?> getRecetas() {
		List<Receta> findAll = recetaService.findAll();
		return ResponseEntity.ok(findAll);
	}
	
	@PostMapping
	public ResponseEntity<?> saveRecetas(@RequestBody RecetaDTO recetaDTO) {
		Receta receta = new Receta();
		receta.setDescripcion(recetaDTO.getDescripcion());
		long currentTimeMillis = System.currentTimeMillis();
		receta.setFechadecreacion(currentTimeMillis);
		receta.setLikes(0);
		receta.setNombre(recetaDTO.getNombre());
		receta.setReceta(recetaDTO.getReceta());
		Usuario findById = usuarioService.findById(recetaDTO.getIdUsuario());
		receta.setUsuario(findById);
		
		String codedfoto = recetaDTO.getImagen64();
		byte[] photoBytes = Base64.getDecoder().decode(codedfoto);
		String nombreNuevoFichero = fileStorageRecetaService.save(recetaDTO.getImagenNombre(), photoBytes);
		
		receta.setImagen(nombreNuevoFichero); 
		
		Receta save = recetaService.save(receta);
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
	public ResponseEntity<?> updateRecetas(@PathVariable Integer id, @RequestBody RecetaUpdateDTO dto) {
    	Receta receta = new Receta();
    	receta.setDescripcion(dto.getDescripcion());
    	receta.setImagen(dto.getImagen());
    	receta.setNombre(dto.getNombre());
    	receta.setReceta(dto.getReceta());
    	
    	boolean update = recetaService.update(id, receta);
		return ResponseEntity.ok(update);
	}
	
	@GetMapping("usuarios/{id}")
	public ResponseEntity<?> getRecetasByUsuario(@PathVariable Integer id){
		List<Receta> allByUsuario = recetaService.findAllByUsuario(id);
		return ResponseEntity.ok(allByUsuario);
	}
	
	@PostMapping("/{id}")
	public ResponseEntity<?> aniadirFavoritos(@PathVariable Integer id, @RequestParam Integer id_usuario){
		boolean aniadirFavoritos = recetaService.aniadirFavoritos(id, id_usuario);
		return ResponseEntity.ok(aniadirFavoritos);
	}
}
