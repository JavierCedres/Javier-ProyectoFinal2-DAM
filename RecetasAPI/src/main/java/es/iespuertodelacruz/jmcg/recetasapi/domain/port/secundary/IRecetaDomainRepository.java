package es.iespuertodelacruz.jmcg.recetasapi.domain.port.secundary;

import java.util.List;

import es.iespuertodelacruz.jmcg.recetasapi.domain.model.Receta;

public interface IRecetaDomainRepository {
	Receta findById(Integer id);
	Receta save(Receta element);
	boolean deleteById(Integer id);
	List<Receta> findAll();
}
