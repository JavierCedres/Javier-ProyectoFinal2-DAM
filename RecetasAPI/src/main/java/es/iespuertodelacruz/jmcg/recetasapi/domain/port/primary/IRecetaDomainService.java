package es.iespuertodelacruz.jmcg.recetasapi.domain.port.primary;

import java.util.List;

import es.iespuertodelacruz.jmcg.recetasapi.domain.model.Receta;
import es.iespuertodelacruz.jmcg.recetasapi.infrastructure.adapter.primary.RecetaUpdateDTO;

public interface IRecetaDomainService {
	Receta findById(Integer id);
	Receta save(Receta element);
	boolean deleteById(Integer id);
	List<Receta> findAll();
	boolean update(Integer id, RecetaUpdateDTO receta);
	List<Receta> findAllByUsuario(Integer id);
	boolean aniadirFavoritos(Integer id_receta, Integer id_usuario);
}
