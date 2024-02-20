package es.iespuertodelacruz.jmcg.recetasapi.infrastructure.adapter.secundary.entity.receta;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.iespuertodelacruz.jmcg.recetasapi.domain.model.Receta;
import es.iespuertodelacruz.jmcg.recetasapi.domain.port.secundary.IRecetaDomainRepository;
import es.iespuertodelacruz.jmcg.recetasapi.infrastructure.adapter.primary.RecetaUpdateDTO;
import es.iespuertodelacruz.jmcg.recetasapi.infrastructure.adapter.secundary.entity.usuario.UsuarioEntity;
import es.iespuertodelacruz.jmcg.recetasapi.infrastructure.adapter.secundary.entity.usuario.UsuarioEntityRepository;
import jakarta.transaction.Transactional;

@Service
public class RecetaEntityService implements IRecetaDomainRepository {
	
	@Autowired RecetaEntityRepository peRepository;
	
	@Autowired UsuarioEntityRepository UsuarioRepository;

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
		boolean ok = false;
		
		if (id != null) {
			peRepository.deleteById(id);
			ok = true;
		}
		
		return ok;
	}

	@Override
	public List<Receta> findAll() {
		List<RecetaEntity> findAll = peRepository.findAll();
		RecetaEntityMapper mapper = new RecetaEntityMapper();
		return findAll.stream().map(pe -> mapper.toDomain(pe)).collect(Collectors.toList());
	}

	@Transactional
	@Override
	public boolean update(Integer id, RecetaUpdateDTO receta) {
		boolean ok = false;
		
		if (id != null && receta != null) {
			peRepository.updateNativo(id, receta.getDescripcion(), receta.getNombre(), receta.getImagen(), receta.getReceta());
			ok = true;
		}
		
		return ok;
	}

	@Override
	public List<Receta> findAllByUsuario(Integer id) {
		List<RecetaEntity> findAll = peRepository.findAllByAutor(id);
		RecetaEntityMapper mapper = new RecetaEntityMapper();
		return findAll.stream().map(pe -> mapper.toDomain(pe)).collect(Collectors.toList());
	}

	@Transactional
	@Override
	public boolean aniadirFavoritos(Integer id_receta, Integer id_usuario) {
		boolean ok = false;
		
		if (id_receta != null && id_usuario != null) {
			Optional<RecetaEntity> byId = peRepository.findById(id_receta);
			Optional<UsuarioEntity> byId2 = UsuarioRepository.findById(id_usuario);
			
			if (byId.isPresent() && byId2.isPresent()) {
				peRepository.aniadirFavoritosIntermedia(id_usuario, id_receta);
				
				int likes = byId.get().getLikes();
				likes = likes + 1;
				
				peRepository.aniadirFavoritos(id_receta, likes);
				
				ok = true;
			}
		}
		
		return ok;
	}
}
