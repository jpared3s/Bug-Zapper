
import * as jose from 'jose'

// TODO: Move this to env variable
const SECRET = Buffer.from("62197fc8886bd3b739dd2cc8aa109d0be93acdea64c07b8908168b80daf1dc47", "hex");

export const generateEncryptedJwt = (subject, payload) => {
	return new jose.EncryptJWT(payload)
		.setProtectedHeader({ alg: "dir", enc: "A256GCM" })
		.setIssuedAt()
		.setSubject(subject)
		.setIssuer("http://localhost:3000/")
		.setAudience("http://localhost:3000/")
		.setExpirationTime("1d")
		.encrypt(SECRET);
};

export const decryptJwt = async (jwt) => {
	const options = {
		issuer: "http://localhost:3000/",
		audience: "http://localhost:3000/",
		contentEncryptionAlgorithms: ["A256GCM"],
		keyManagementAlgorithms: ["dir"],
	};
	return jose.jwtDecrypt(jwt, SECRET, options);
};
