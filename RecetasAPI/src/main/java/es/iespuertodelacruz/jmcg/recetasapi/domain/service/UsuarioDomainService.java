package es.iespuertodelacruz.jmcg.recetasapi.domain.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import es.iespuertodelacruz.jmcg.recetasapi.domain.model.Usuario;
import es.iespuertodelacruz.jmcg.recetasapi.domain.port.primary.IUsuarioDomainService;
import es.iespuertodelacruz.jmcg.recetasapi.domain.port.secundary.IUsuarioDomainRepository;

@Service
public class UsuarioDomainService implements IUsuarioDomainService {
	
	@Autowired
	IUsuarioDomainRepository usuarioRepository;
	@Autowired
	private JavaMailSender sender;
	@Value("${mail.from}")
	private String mailfrom;

	@Override
	public Usuario findById(Integer id) {
		return usuarioRepository.findById(id);
	}

	@Override
	public Usuario save(Usuario element) {
		return usuarioRepository.save(element);
	}

	public boolean deleteById(Integer id) {
		boolean ok = false;
		
		if(id != null) {
			usuarioRepository.deleteById(id);
			ok = true;
		}
		
		return ok;
	}

	public Usuario findByName(String nombre) {
		return usuarioRepository.findByName(nombre);
	}
	
	public List<String> findAllEmails() {
		List<String> correos = new ArrayList<String>();
		List<Usuario> findAll = usuarioRepository.findAll();
		
		for (Usuario usuario : findAll) {
			correos.add(usuario.getEmail());
		}
		
		return correos;
	}
	
	public boolean update(Usuario u) {
		boolean ok = false;
		
		if (u != null) {
			Usuario usuario = usuarioRepository.findById(u.getId());
			usuario.setPassword(u.getPassword());
			usuario.setEmail(u.getEmail());
			usuarioRepository.save(usuario);
			ok = true;
		}
		
		return ok;
	}
	
	public boolean updateV3(Usuario u) {
		boolean ok = false;
		
		if (u != null) {
			Usuario usuario = usuarioRepository.findById(u.getId());
			usuario.setPassword(u.getPassword());
			usuario.setEmail(u.getEmail());
			usuario.setRol(u.getRol());
			usuario.setActive(u.getActive());
			usuarioRepository.save(usuario);
			ok = true;
		}
		
		return ok;
	}

	public void send(String destinatario, String asunto, String contenido) {
		SimpleMailMessage message = new SimpleMailMessage();
		message.setFrom(mailfrom);
		message.setTo(destinatario);
		message.setSubject(asunto);
		message.setText(contenido);
		sender.send(message);
	}
	
	public ResponseEntity<String> updateEstado(String userEmail, String hash) {
		Usuario findByEmail = usuarioRepository.findByEmail(userEmail);
		
		if (findByEmail != null) {
			if (hash.equals(findByEmail.getHash())) {
				findByEmail.setActive(1);
				usuarioRepository.save(findByEmail);
				return ResponseEntity.ok("Ok");
			} else {
				return ResponseEntity.ok("hash erroneo");
			}
		} else {
			return ResponseEntity.ok("No Email");
		}
	}

	@Override
	public List<Usuario> findAll() {
		return usuarioRepository.findAll();
	}


	public Usuario findByEmail(String email) {
		// TODO Auto-generated method stub
		return null;
	}
}
