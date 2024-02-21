package es.iespuertodelacruz.jmcg.recetasapi.infrastructure.adapter.primary.v2;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import es.iespuertodelacruz.jmcg.recetasapi.domain.model.Usuario;
import es.iespuertodelacruz.jmcg.recetasapi.domain.port.primary.IUsuarioDomainService;
import es.iespuertodelacruz.jmcg.recetasapi.infrastructure.adapter.primary.RegisterDTO;
import es.iespuertodelacruz.jmcg.recetasapi.infrastructure.adapter.primary.UsuarioDTO;
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
@RequestMapping("/api/v2/usuarios")
public class UsuarioControllerV2 {
	
	@Autowired IUsuarioDomainService usuarioService;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
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
	
	@PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Integer id, @RequestBody UsuarioDTO usuario) {
        Object principal =
                SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        String nombreAutenticado = ((UserDetails)principal).getUsername();
        Usuario findById = usuarioService.findById(id);

        if(findById.getNombre().equals(nombreAutenticado)) {
            Usuario u = new Usuario();

            u.setId(id);
            u.setNombre(usuario.getNombre());
            u.setApellidos(usuario.getApellidos());
            u.setPassword(passwordEncoder.encode(usuario.getPassword()));

            boolean update = usuarioService.update(id, u);

            return ResponseEntity.ok(update);
        }else {

            return ResponseEntity
                .status(HttpStatus.FORBIDDEN)
                .body("usuario solicitado diferente del autenticado");
        }
    }
}
