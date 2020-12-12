
const validate = (email)=>{
    if (
		(email.includes("mec.ac.in"))
	) {
		return true;
	} else {
		//console.log("asdasdpp");
		// history.push("/error");
		// delete();
		// firebase.auth().sha;

		// firebase.auth().signOut();
		return false;
    }
}
export default validate;