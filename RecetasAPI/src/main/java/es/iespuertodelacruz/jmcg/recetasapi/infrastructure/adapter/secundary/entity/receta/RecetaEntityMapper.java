package es.iespuertodelacruz.jmcg.recetasapi.infrastructure.adapter.secundary.entity.receta;

import es.iespuertodelacruz.jmcg.recetasapi.domain.model.Receta;

public class RecetaEntityMapper {
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
		}
		
		return recetaEntity;
	}
}
