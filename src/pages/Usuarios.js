import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { EDITOR_ESTADISTICA, EDITOR_INFORMACION, EDITOR_INICIO, EDITOR_PEDIDOS, EDITOR_USUARIOS, EDITOR_WIP } from "../modules/constants.mjs";
import { auth } from "../modules/firebase/fbinstance.mjs";
const errorCodesStr = {
	"auth/missing-email": "El campo de e-mail está vacío.",
	"auth/user-not-found": "Usuario no encontrado.",
	"auth/invalid-email": "El e-mail introducido no es válido.",
	"auth/wrong-password": "La contraseña ingresada no es correcta.",
	"auth/network-request-failed":
		"No se ha podido conectar con la base de datos.",
	"auth/too-many-requests":
		"Demasiadas peticiones de logueo, por favor espere unos minutos e intentelo nuevamente.",
	"auth/logged-in": "Inició sesión exitosamente",
	"auth/logged-out": "Cerró sesión exitosamente",
};
// #region Idle control
try {
	const controller = new AbortController();
	const signal = controller.signal;
	const idleDetector = new window.IdleDetector();
	idleDetector.addEventListener("change", () => {
		const userState = idleDetector.userState;
		// const screenState = idleDetector.screenState;
		if (userState === "idle") auth.signOut();
		// console.log(`Idle change: ${userState}, ${screenState}.`);
	});
	idleDetector.start({
		threshold: 1000 * 60 * 5,
		signal,
	});
} catch (error) {
	console.log("Idle detector error:", error);
}

// #endregion Idle control
function Usuarios({setAvailableEditors}) {
	const [editorState, seteditorState] = useState(
		auth.currentUser ? "menu" : "login"
	);
	const [formData, setFormData] = useState({ user: "", passwd: "" });
	const [errorCode, setErrorCode] = useState("");
	// #region Event Handlers
	function handleInput(e) {
		setFormData((fd) => {
			return { ...fd, [e.target.name]: e.target.value };
		});
	}
	function handleLoginSubmit(e) {
		e.preventDefault();
		window.IdleDetector.requestPermission();

		signInWithEmailAndPassword(auth, formData.user, formData.passwd)
			.then((e) => {
				console.log(e);
				setErrorCode("auth/logged-in");
				seteditorState("menu");
				setAvailableEditors([
					EDITOR_ESTADISTICA,
					EDITOR_INFORMACION,
					EDITOR_INICIO,
					EDITOR_PEDIDOS,
					EDITOR_USUARIOS,
					EDITOR_WIP
				]);
			})
			.catch((e) => setErrorCode(e.code));
	}
	// #endregion Event Handlers
	// #region Menu Editor
	if (editorState === "menu" && auth.currentUser)
		return (
			<div className="usersMenu">

				<h1 className="usersGrid2">
					¡Hola{auth.currentUser.displayName ? " " + auth.currentUser.displayName : ""}!
				</h1>
				{auth.currentUser.photoURL ? (
					<img src={auth.currentUser.photoURL} alt="Foto del usuario" />
				) : (
					""
				)}
				<p>E-mail: {auth.currentUser.email}</p>
				<button className="usersMenuButtons">Cambiar e-mail</button>
				<button className="usersMenuButtons usersGrid2">
					Cambiar contraseña
				</button>
				<button
					className="formBtn"
					onClick={(e) => {
						auth.signOut();
						seteditorState("login");
						setErrorCode("auth/logged-out");
						setAvailableEditors([EDITOR_USUARIOS, EDITOR_WIP, EDITOR_INFORMACION])
					}}
				>
					Cerrar Sesión
				</button>
			</div>
		);
	// #endregion Menu Editor
	// #region Login Editor
	if (editorState === "login")
		return (
			<div>
				<h1>Iniciar Sesión</h1>
				{errorCode ? <p>{errorCodesStr[errorCode] || errorCode}</p> : ""}
				<form
					className="loginForm"
					onSubmit={handleLoginSubmit}
					onInput={handleInput}
				>
					<label htmlFor="Usuario">E-Mail: </label>
					<input
						id="Usuario"
						type="email"
						name="user"
						value={formData.user}
						autoFocus
						required
					/>
					<label htmlFor="Contrasenia">Contraseña: </label>
					<input
						id="Contrasenia"
						type="password"
						name="passwd"
						value={formData.passwd}
						required
					/>
					{/* <label className="formcb">
						Mantener Sesión Iniciada
						<input type="checkbox" />
					</label> */}
					<input type="submit" className="formBtn" value="Iniciar Sesión" />
				</form>
			</div>
		);
	// #endregion Login Editor
}

export default Usuarios;
