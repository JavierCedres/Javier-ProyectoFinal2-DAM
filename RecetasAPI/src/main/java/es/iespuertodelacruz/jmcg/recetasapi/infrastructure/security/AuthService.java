package es.iespuertodelacruz.jmcg.recetasapi.infrastructure.security;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import es.iespuertodelacruz.jmcg.recetasapi.domain.model.Usuario;
import es.iespuertodelacruz.jmcg.recetasapi.domain.service.UsuarioDomainService;
import es.iespuertodelacruz.jmcg.recetasapi.infrastructure.adapter.secundary.entity.usuario.UsuarioEntity;

@Service
public class AuthService {
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private JwtService jwtService;
	@Autowired
	private UsuarioDomainService usuarioService;

	public String register(UserDetailsLogin userdetails) {
		Usuario userentity = new Usuario();
		userentity.setNombre(userdetails.getUsername());
		userentity.setPassword(passwordEncoder.encode(userdetails.getPassword()));
		userentity.setRol("ROLE_USER");
		userentity.setEmail(userdetails.getEmail());
		userentity.setApellidos(userdetails.getApellidos());
		userentity.setNick(userdetails.getNick());
		userentity.setImagen(userdetails.getImagen());
		
		userdetails.setRole(userentity.getRol());
		String generateToken = jwtService.generateToken(userdetails.username, userdetails.password);
		
		int numRand = (int)Math.random() * 10000;
		String hash = passwordEncoder.encode(numRand + "");
		userentity.setHash(hash);
		Usuario save = usuarioService.save(userentity);
		
		usuarioService.send(save.getEmail(), "Verifícate", "http://localhost:8080/api/registerverify?usermail=" + save.getEmail() +"&hash=" + save.getHash());
		
		return generateToken;
	}

	public String authenticate(UserDetailsLogin request) {
		Usuario userentity = usuarioService.findByNick(request.getNick());
		UserDetailsLogin userlogin = null;
		System.out.println(userentity);
		if (userentity != null) {
			System.out.println(userentity);
			if (passwordEncoder.matches(request.getPassword(), userentity.getPassword())) {
				userlogin = new UserDetailsLogin();
				userlogin.setNick(userentity.getNick());
				userlogin.setPassword(userentity.getPassword());
				userlogin.setRole(userentity.getRol());
				System.out.println("aaaaaaaaaaaa" + userlogin);
			}
		}
		String generateToken = null;
		if (userlogin != null) {
			generateToken = jwtService.generateToken(userentity.getNombre(), userentity.getRol());
		}
		return generateToken;
	}
}