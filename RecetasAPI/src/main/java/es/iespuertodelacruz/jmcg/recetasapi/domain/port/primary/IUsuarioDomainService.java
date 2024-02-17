package es.iespuertodelacruz.jmcg.recetasapi.domain.port.primary;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;

import es.iespuertodelacruz.jmcg.recetasapi.domain.model.Usuario;

public interface IUsuarioDomainService {
	Usuario findById(Integer id);
	Usuario save(Usuario element);
	boolean deleteById(Integer id);
	List<Usuario> findAll();
	Usuario findByName(String name);
	Usuario findByNick(String nick);
	Usuario findByEmail(String email);
	ResponseEntity<String> updateEstado(String usermail, String hash);
}
