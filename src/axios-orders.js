import axios from "axios";

const instance = axios.create({
	baseURL: "https://conny-burgerbuilder.firebaseio.com/"
});

export default instance;
