package es.iespuertodelacruz.jmcg.recetasapi.infrastructure.adapter.secundary.entity.usuario;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.iespuertodelacruz.jmcg.recetasapi.domain.model.Usuario;
import es.iespuertodelacruz.jmcg.recetasapi.domain.port.secundary.IUsuarioDomainRepository;
import jakarta.transaction.Transactional;

@Service
public class UsuarioEntityService implements IUsuarioDomainRepository {
	
	@Autowired UsuarioEntityRepository peRepository;

	@Override
	public Usuario findById(Integer id) {
		Usuario usuario = null;
		if (id != null) {
			Optional<UsuarioEntity> opt = peRepository.findById(id);
			if (opt.isPresent()) {
				UsuarioEntity usuarioEntity = opt.get();
				UsuarioEntityMapper mapper = new UsuarioEntityMapper();
				usuario = mapper.toDomain(usuarioEntity);
			}
		}
		return usuario;
	}

	@Override
	@Transactional
	public Usuario save(Usuario element) {
		Usuario resultado = null;
		if (element != null) {
			UsuarioEntityMapper mapper = new UsuarioEntityMapper();
			UsuarioEntity save = peRepository.save(mapper.toPersistence(element));
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
	public List<Usuario> findAll() {
		List<UsuarioEntity> findAll = peRepository.findAll();
		UsuarioEntityMapper mapper = new UsuarioEntityMapper();
		return findAll.stream().map(pe -> mapper.toDomain(pe)).collect(Collectors.toList());
	}

	@Override
	public Usuario findByName(String name) {
		UsuarioEntityMapper mapper = new UsuarioEntityMapper();
		Usuario domain = mapper.toDomain(peRepository.findByName(name));
		return domain;
	}

	@Override
	public Usuario findByEmail(String email) {
		UsuarioEntityMapper mapper = new UsuarioEntityMapper();
		Usuario domain = mapper.toDomain(peRepository.findByEmail(email));
		return domain;
	}

	@Override
	public Usuario findByNick(String nick) {
		UsuarioEntityMapper mapper = new UsuarioEntityMapper();
		Usuario domain = mapper.toDomain(peRepository.findByNick(nick));
		return domain;
	}
}
