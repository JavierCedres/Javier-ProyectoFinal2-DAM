package es.iespuertodelacruz.jmcg.recetasapi.domain.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.iespuertodelacruz.jmcg.recetasapi.domain.model.Receta;
import es.iespuertodelacruz.jmcg.recetasapi.domain.model.Usuario;
import es.iespuertodelacruz.jmcg.recetasapi.domain.port.primary.IRecetaDomainService;
import es.iespuertodelacruz.jmcg.recetasapi.domain.port.secundary.IRecetaDomainRepository;
import es.iespuertodelacruz.jmcg.recetasapi.infrastructure.adapter.primary.RecetaUpdateDTO;

@Service
public class RecetaDomainService implements IRecetaDomainService {
	
	@Autowired IRecetaDomainRepository recetaRepository;

	@Override
	public Receta findById(Integer id) {
		return recetaRepository.findById(id);
	}

	@Override
	public Receta save(Receta element) {
		return recetaRepository.save(element);
	}

	@Override
	public boolean deleteById(Integer id) {
		return recetaRepository.deleteById(id);
	}

	@Override
	public List<Receta> findAll() {
		return recetaRepository.findAll();
	}

	@Override
	public boolean update(Integer id, RecetaUpdateDTO receta) {
		return recetaRepository.update(id, receta);
	}

	@Override
	public List<Receta> findAllByUsuario(Integer id) {
		return recetaRepository.findAllByUsuario(id);
	}

	@Override
	public boolean aniadirFavoritos(Integer id) {
		return recetaRepository.aniadirFavoritos(id);
	}
}
