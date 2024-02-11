package es.iespuertodelacruz.jmcg.recetasapi.infrastructure.adapter.secundary.entity.usuario;

import java.io.Serializable;
import jakarta.persistence.*;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import es.iespuertodelacruz.jmcg.recetasapi.infrastructure.adapter.secundary.entity.receta.RecetaEntity;


/**
 * The persistent class for the usuarios database table.
 * 
 */
@Entity
@Table(name="usuarios")
@NamedQuery(name="Usuario.findAll", query="SELECT u FROM UsuarioEntity u")
public class UsuarioEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;

	private int active;

	private String apellidos;

	private String email;

	private String hash;

	private String imagen;

	private String nick;

	private String nombre;

	private String password;

	private String rol;

	//bi-directional many-to-one association to Receta
	@OneToMany(mappedBy="usuario")
	private List<RecetaEntity> recetas1;

	//bi-directional many-to-many association to Receta
	@ManyToMany(mappedBy="usuarios")
	@JsonIgnore
	private List<RecetaEntity> recetas2;

	public UsuarioEntity() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public int getActive() {
		return this.active;
	}

	public void setActive(int active) {
		this.active = active;
	}

	public String getApellidos() {
		return this.apellidos;
	}

	public void setApellidos(String apellidos) {
		this.apellidos = apellidos;
	}

	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getHash() {
		return this.hash;
	}

	public void setHash(String hash) {
		this.hash = hash;
	}

	public String getImagen() {
		return this.imagen;
	}

	public void setImagen(String imagen) {
		this.imagen = imagen;
	}

	public String getNick() {
		return this.nick;
	}

	public void setNick(String nick) {
		this.nick = nick;
	}

	public String getNombre() {
		return this.nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getRol() {
		return this.rol;
	}

	public void setRol(String rol) {
		this.rol = rol;
	}

	public List<RecetaEntity> getRecetas1() {
		return this.recetas1;
	}

	public void setRecetas1(List<RecetaEntity> recetas1) {
		this.recetas1 = recetas1;
	}

	public RecetaEntity addRecetas1(RecetaEntity recetas1) {
		getRecetas1().add(recetas1);
		recetas1.setUsuario(this);

		return recetas1;
	}

	public RecetaEntity removeRecetas1(RecetaEntity recetas1) {
		getRecetas1().remove(recetas1);
		recetas1.setUsuario(null);

		return recetas1;
	}

	public List<RecetaEntity> getRecetas2() {
		return this.recetas2;
	}

	public void setRecetas2(List<RecetaEntity> recetas2) {
		this.recetas2 = recetas2;
	}

}