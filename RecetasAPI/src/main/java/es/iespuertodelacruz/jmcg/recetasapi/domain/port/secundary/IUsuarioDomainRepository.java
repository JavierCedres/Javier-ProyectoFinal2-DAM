package es.iespuertodelacruz.jmcg.recetasapi.domain.port.secundary;

import java.util.List;
import java.util.Optional;

import es.iespuertodelacruz.jmcg.recetasapi.domain.model.Usuario;

public interface IUsuarioDomainRepository {
	Usuario findById(Integer id);
	Usuario save(Usuario element);
	boolean deleteById(Integer id);
	List<Usuario> findAll();
	Usuario findByName(String name);
	Usuario findByNick(String nick);
	Usuario findByEmail(String email);
}
