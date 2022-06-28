import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
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
	"auth/logged-in": "Inició sesion exitosamente",
	"auth/logged-out": "Cerró sesion exitosamente",
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
function Usuarios() {
	const [editorState, seteditorState] = useState(
		auth.currentUser ? "menu" : "login"
	);
	const [formData, setFormData] = useState({ user: "", passwd: "" });
	const [errorCode, setErrorCode] = useState("");
	// #region Function Handlers
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
			})
			.catch((e) => setErrorCode(e.code));
	}
	// #endregion Function Handlers
	// #region Menu Editor
	if (editorState === "menu" && auth.currentUser)
		return (
			<div className="usersMenu">
				<h1 className="usersGrid2">
					¡Hola{auth.currentUser ? " " + auth.currentUser.displayName : ""}!
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
