package es.iespuertodelacruz.jmcg.recetasapi.infrastructure.adapter.primary;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import es.iespuertodelacruz.jmcg.recetasapi.domain.model.Usuario;
import es.iespuertodelacruz.jmcg.recetasapi.domain.port.primary.IUsuarioDomainService;
import es.iespuertodelacruz.jmcg.recetasapi.infrastructure.security.AuthService;
import es.iespuertodelacruz.jmcg.recetasapi.infrastructure.security.UserDetailsLogin;

class UserDTO{
	String nick;
	String password;
	public String getNick() {
		return nick;
	}
	public void setNick(String nick) {
		this.nick = nick;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public UserDTO() {}
}

@RestController
@CrossOrigin
@RequestMapping("/api/v1/usuarios")
public class UsuarioController {
	
	@Autowired IUsuarioDomainService usuarioService;
	
	@GetMapping("/{id}")
	public ResponseEntity<?> usuariosGetById(@PathVariable Integer id) {
		Usuario findById = usuarioService.findById(id);
		return ResponseEntity.ok(findById);
	}
	
	@GetMapping
	public ResponseEntity<?> usuariosGetAll() {
		List<Usuario> findAll = usuarioService.findAll();
		return ResponseEntity.ok(findAll);
	}
	
	@GetMapping("/nombre/{nick}")
	public ResponseEntity<?> usuariosGetByNick(@PathVariable String nick) {
		Usuario findByName = usuarioService.findByNick(nick);
		return ResponseEntity.ok(findByName);
	}
	
	@Autowired
	private AuthService service;

	@PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody RegisterDTO request) {
		UserDetailsLogin usuario = new UserDetailsLogin();
		usuario.setUsername(request.getUser());
		usuario.setPassword(request.getPassword());
		usuario.setEmail(request.getEmail());
		usuario.setApellidos(request.getApellidos());
		usuario.setImagen(request.getImagen());
		usuario.setNick(request.getNick());
		return ResponseEntity.ok(service.register(usuario));
	}

	@PostMapping("/login")
	public ResponseEntity<String> authenticate(@RequestBody UserDTO request) {
		UserDetailsLogin userDL = new UserDetailsLogin();
		userDL.setPassword(request.password);
		userDL.setNick(request.nick);
		String token = service.authenticate(userDL);
		if(token == null) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("User/pass erróneo");
		} else {
			return ResponseEntity.ok(token);
		}
	}
	
	@GetMapping("registerverify")
	public ResponseEntity<String> mailVerify(@RequestParam String usermail, @RequestParam String hash) {
		return usuarioService.updateEstado(usermail, hash);
	}
}
