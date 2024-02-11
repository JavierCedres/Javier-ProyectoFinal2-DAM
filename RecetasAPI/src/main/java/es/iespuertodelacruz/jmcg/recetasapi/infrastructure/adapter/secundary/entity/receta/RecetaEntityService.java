package es.iespuertodelacruz.jmcg.recetasapi.infrastructure.adapter.secundary.entity.receta;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.iespuertodelacruz.jmcg.recetasapi.domain.model.Receta;
import es.iespuertodelacruz.jmcg.recetasapi.domain.port.secundary.IRecetaDomainRepository;
import jakarta.transaction.Transactional;

@Service
public class RecetaEntityService implements IRecetaDomainRepository {
	
	@Autowired RecetaEntityRepository peRepository;

	@Override
	public Receta findById(Integer id) {
		Receta usuario = null;
		if (id != null) {
			Optional<RecetaEntity> opt = peRepository.findById(id);
			if (opt.isPresent()) {
				RecetaEntity usuarioEntity = opt.get();
				RecetaEntityMapper mapper = new RecetaEntityMapper();
				usuario = mapper.toDomain(usuarioEntity);
			}
		}
		return usuario;
	}

	@Override
	@Transactional
	public Receta save(Receta element) {
		Receta resultado = null;
		if (element != null) {
			RecetaEntityMapper mapper = new RecetaEntityMapper();
			RecetaEntity save = peRepository.save(mapper.toPersistence(element));
			resultado = mapper.toDomain(save);
		}
		return resultado;
	}

	@Override
	public boolean deleteById(Integer id) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public List<Receta> findAll() {
		List<RecetaEntity> findAll = peRepository.findAll();
		RecetaEntityMapper mapper = new RecetaEntityMapper();
		return findAll.stream().map(pe -> mapper.toDomain(pe)).collect(Collectors.toList());
	}
}
