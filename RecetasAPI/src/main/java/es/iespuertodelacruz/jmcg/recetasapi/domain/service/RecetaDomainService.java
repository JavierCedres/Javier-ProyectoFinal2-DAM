package es.iespuertodelacruz.jmcg.recetasapi.domain.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.iespuertodelacruz.jmcg.recetasapi.domain.model.Receta;
import es.iespuertodelacruz.jmcg.recetasapi.domain.port.primary.IRecetaDomainService;
import es.iespuertodelacruz.jmcg.recetasapi.domain.port.secundary.IRecetaDomainRepository;

@Service
public class RecetaDomainService implements IRecetaDomainService {
	
	@Autowired IRecetaDomainRepository recetaRepository;

	@Override
	public Receta findById(Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Receta save(Receta element) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean deleteById(Integer id) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public List<Receta> findAll() {
		// TODO Auto-generated method stub
		return null;
	}
	
	
}
