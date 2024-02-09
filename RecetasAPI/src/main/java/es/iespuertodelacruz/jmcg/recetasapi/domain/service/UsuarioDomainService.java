package es.iespuertodelacruz.jmcg.recetasapi.domain.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import es.iespuertodelacruz.jmcg.recetasapi.infrastructure.adapter.secundary.UsuarioEntityRepository;
import es.iespuertodelacruz.jmcg.recetasapi.service.IGenericService;
import es.iespuertodelacruz.jmcg.recetasapi.infrastructure.adapter.secundary.UsuarioEntity;

@Service
public class UsuarioDomainService implements IGenericService<UsuarioEntity, Integer> {
	
	@Autowired
	UsuarioEntityRepository usuarioRepository;
	@Autowired
	private JavaMailSender sender;
	@Value("${mail.from}")
	private String mailfrom;

	@Override
	public Iterable<UsuarioEntity> findAll() {
		return usuarioRepository.findAll();
	}

	@Override
	public Optional<UsuarioEntity> findById(Integer id) {
		return usuarioRepository.findById(id);
	}

	@Override
	public UsuarioEntity save(UsuarioEntity element) {
		return usuarioRepository.save(element);
	}

	@Override
	public boolean deleteById(Integer id) {
		boolean ok = false;
		
		if(id != null) {
			usuarioRepository.deleteById(id);
			ok = true;
		}
		
		return ok;
	}

	public UsuarioEntity findByName(String nombre) {
		return usuarioRepository.findByName(nombre);
	}
	
	public List<String> findAllEmails() {
		List<String> correos = new ArrayList<String>();
		List<UsuarioEntity> findAll = usuarioRepository.findAll();
		
		for (UsuarioEntity usuario : findAll) {
			correos.add(usuario.getEmail());
		}
		
		return correos;
	}
	
	public boolean update(UsuarioEntity u) {
		boolean ok = false;
		
		if (u != null) {
			UsuarioEntity usuario = usuarioRepository.findById(u.getId()).get();
			usuario.setPassword(u.getPassword());
			usuario.setEmail(u.getEmail());
			usuarioRepository.save(usuario);
			ok = true;
		}
		
		return ok;
	}
	
	public boolean updateV3(UsuarioEntity u) {
		boolean ok = false;
		
		if (u != null) {
			UsuarioEntity usuario = usuarioRepository.findById(u.getId()).get();
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
		UsuarioEntity findByEmail = usuarioRepository.findByEmail(userEmail);
		
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
}
