package es.iespuertodelacruz.jmcg.recetasapi.infrastructure.security;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import es.iespuertodelacruz.jmcg.recetasapi.domain.service.UsuarioDomainService;
import es.iespuertodelacruz.jmcg.recetasapi.infrastructure.adapter.secundary.UsuarioEntity;

@Service
public class AuthService {
	@Autowired
	private UsuarioDomainService usuarioService;
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private JwtService jwtService;

	public String register(UserDetailsLogin userdetails) {
		UsuarioEntity userentity = new UsuarioEntity();
		userentity.setNombre(userdetails.getUsername());
		userentity.setPassword(passwordEncoder.encode(userdetails.getPassword()));
		userentity.setRol("ROLE_USER");
		userentity.setEmail(userdetails.getEmail());
		
		userdetails.setRole(userentity.getRol());
		String generateToken = jwtService.generateToken(userdetails.username, userdetails.password);
		
		int numRand = (int)Math.random() * 10000;
		String hash = passwordEncoder.encode(numRand + "");
		userentity.setHash(hash);
		UsuarioEntity save = usuarioService.save(userentity);
		
		usuarioService.send(save.getEmail(), "Verifícate", "http://localhost:8080/api/v1/registerverify?usermail=" + save.getEmail() +"&hash=" + save.getHash());
		
		return generateToken;
	}

	public String authenticate(UserDetailsLogin request) {
		UsuarioEntity userentity = usuarioService.findByName(request.getUsername());
		UserDetailsLogin userlogin = null;
		if (userentity != null) {
			if (passwordEncoder.matches(request.getPassword(), userentity.getPassword())) {
				userlogin = new UserDetailsLogin();
				userlogin.setUsername(userentity.getNombre());
				userlogin.setPassword(userentity.getPassword());
				userlogin.setRole(userentity.getRol());
			}
		}
		String generateToken = null;
		if (userlogin != null) {
			generateToken = jwtService.generateToken(userentity.getNombre(), userentity.getRol());
		}
		return generateToken;
	}
}