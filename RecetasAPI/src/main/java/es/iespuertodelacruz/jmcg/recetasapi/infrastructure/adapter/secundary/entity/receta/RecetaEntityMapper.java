package es.iespuertodelacruz.jmcg.recetasapi.infrastructure.adapter.secundary.entity.receta;

import org.springframework.beans.factory.annotation.Autowired;

import es.iespuertodelacruz.jmcg.recetasapi.domain.model.Receta;
import es.iespuertodelacruz.jmcg.recetasapi.domain.model.Usuario;
import es.iespuertodelacruz.jmcg.recetasapi.infrastructure.adapter.secundary.entity.usuario.UsuarioEntity;
import es.iespuertodelacruz.jmcg.recetasapi.infrastructure.adapter.secundary.entity.usuario.UsuarioEntityMapper;

public class RecetaEntityMapper {
	@Autowired UsuarioEntityMapper usuarioEntityMapper;
	
	public Receta toDomain(RecetaEntity recetaEntity) {
		Receta receta = null;
		
		if (recetaEntity != null) {
			receta = new Receta();
			receta.setId(recetaEntity.getId());
			receta.setNombre(recetaEntity.getNombre());
			receta.setDescripcion(recetaEntity.getDescripcion());
			receta.setFechadecreacion(recetaEntity.getFechadecreacion());
			receta.setImagen(recetaEntity.getImagen());
			receta.setLikes(recetaEntity.getLikes());
			receta.setReceta(recetaEntity.getReceta());
			if (recetaEntity.getUsuario() != null) {
				UsuarioEntity autorEntity = new UsuarioEntity();
				autorEntity = recetaEntity.getUsuario();
				
				Usuario autor = new Usuario();
				autor.setId(autorEntity.getId());
				autor.setNombre(autorEntity.getNombre());
				autor.setApellidos(autorEntity.getApellidos());
				autor.setPassword(autorEntity.getPassword());
				autor.setEmail(autorEntity.getEmail());
				autor.setActive(autorEntity.getActive());
				autor.setHash(autorEntity.getHash());
				autor.setRol(autorEntity.getRol());
				autor.setImagen(autorEntity.getImagen());
				autor.setNick(autorEntity.getNick());
				
				receta.setUsuario(autor);
			}
		}
		
		return receta;
	}
	
	public RecetaEntity toPersistence(Receta receta) {
		RecetaEntity recetaEntity = null;
		
		if (receta != null) {
			recetaEntity = new RecetaEntity();
			recetaEntity.setId(receta.getId());
			recetaEntity.setNombre(receta.getNombre());
			recetaEntity.setDescripcion(receta.getDescripcion());
			recetaEntity.setFechadecreacion(receta.getFechadecreacion());
			recetaEntity.setImagen(receta.getImagen());
			recetaEntity.setLikes(receta.getLikes());
			recetaEntity.setReceta(receta.getReceta());
			if (receta.getUsuario() != null) {
				Usuario autor = new Usuario();
				autor = receta.getUsuario();
				
				UsuarioEntity usuarioEntity = new UsuarioEntity();;
				usuarioEntity.setId(autor.getId());
				usuarioEntity.setNombre(autor.getNombre());
				usuarioEntity.setApellidos(autor.getApellidos());
				usuarioEntity.setPassword(autor.getPassword());
				usuarioEntity.setEmail(autor.getEmail());
				usuarioEntity.setActive(autor.getActive());
				usuarioEntity.setHash(autor.getHash());
				usuarioEntity.setRol(autor.getRol());
				usuarioEntity.setImagen(autor.getImagen());
				usuarioEntity.setNick(autor.getNick());
				
				recetaEntity.setUsuario(usuarioEntity);
			}
		}
		
		return recetaEntity;
	}
}
