
use aes_gcm::{Aes256Gcm, Key, Nonce};
use aes_gcm::aead::{Aead, KeyInit};
use argon2::{Argon2, PasswordHasher, PasswordVerifier, password_hash::{SaltString, PasswordHash, rand_core::OsRng}};
use rand::RngCore;


pub fn hash_password(password: &str, salt: &[u8]) -> Result<String, String> {
    let salt = SaltString::encode_b64(salt).map_err(|e| e.to_string())?;
    let argon2 = Argon2::default();
    let hash = argon2.hash_password(password.as_bytes(), &salt)
        .map_err(|e| e.to_string())?
        .to_string();
    Ok(hash)
}

pub fn verify_password(hash: &str, password: &str) -> Result<bool, String> {
    let parsed_hash = PasswordHash::new(hash).map_err(|e| e.to_string())?;
    let argon2 = Argon2::default();
    Ok(argon2.verify_password(password.as_bytes(), &parsed_hash).is_ok())
}

pub fn derive_key(password: &str, salt: &[u8]) -> [u8; 32] {
    use argon2::password_hash::PasswordHasher;
    let salt = SaltString::encode_b64(salt).unwrap();
    let argon2 = Argon2::default();
    let hash = argon2.hash_password(password.as_bytes(), &salt).unwrap();
    let binding = hash.hash.unwrap();
    let hash_bytes = binding.as_bytes();
    let mut key = [0u8; 32];
    key.copy_from_slice(&hash_bytes[..32]);
    key
}


pub fn encrypt(data: &[u8], key: &[u8; 32]) -> (Vec<u8>, [u8; 12]) {
    let cipher = Aes256Gcm::new(Key::<Aes256Gcm>::from_slice(key));
    let mut nonce = [0u8; 12];
    rand::thread_rng().fill_bytes(&mut nonce);
    let nonce_ga = Nonce::from_slice(&nonce);
    let ciphertext = cipher.encrypt(nonce_ga, data).expect("encryption failure!");
    (ciphertext, nonce)
}

pub fn decrypt(ciphertext: &[u8], key: &[u8; 32], nonce: &[u8; 12]) -> Vec<u8> {
    let cipher = Aes256Gcm::new(Key::<Aes256Gcm>::from_slice(key));
    let nonce_ga = Nonce::from_slice(nonce);
    cipher.decrypt(nonce_ga, ciphertext).expect("decryption failure!")
}
