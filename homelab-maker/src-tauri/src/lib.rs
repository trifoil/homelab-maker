
mod crypto;
use serde::{Serialize, Deserialize};
use std::fs;
use std::path::PathBuf;
use rand::RngCore;

#[derive(Serialize, Deserialize)]
struct User {
    username: String,
    password_hash: String,
    salt: Vec<u8>,
}

fn get_user_file(username: &str) -> PathBuf {
    // Tauri v2: Use a local data directory for demo; in production, use a platform-appropriate data dir
    let mut dir = std::env::current_dir().expect("No current dir");
    dir.push(format!("user_{}.json", username));
    dir
}

#[tauri::command]
fn register_user(username: String, password: String) -> Result<(), String> {
    let user_file = get_user_file(&username);
    if user_file.exists() {
        return Err("User already exists".to_string());
    }
    let mut salt = [0u8; 16];
    rand::thread_rng().fill_bytes(&mut salt);
    let password_hash = crypto::hash_password(&password, &salt)?;
    let user = User {
        username: username.clone(),
        password_hash,
        salt: salt.to_vec(),
    };
    fs::write(user_file, serde_json::to_vec(&user).unwrap()).map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
fn login_user(username: String, password: String) -> Result<bool, String> {
    let user_file = get_user_file(&username);
    let user: User = serde_json::from_slice(&fs::read(user_file).map_err(|e| e.to_string())?).map_err(|e| e.to_string())?;
    let valid = crypto::verify_password(&user.password_hash, &password)?;
    Ok(valid)
}

#[tauri::command]
fn save_user_data(username: String, password: String, data: Vec<u8>) -> Result<(), String> {
    let user_file = get_user_file(&username);
    let user: User = serde_json::from_slice(&fs::read(&user_file).map_err(|e| e.to_string())?).map_err(|e| e.to_string())?;
    let key = crypto::derive_key(&password, &user.salt);
    let (encrypted, nonce) = crypto::encrypt(&data, &key);
    let mut data_file = user_file;
    data_file.set_file_name(format!("data_{}.bin", username));
    let mut out = nonce.to_vec();
    out.extend(encrypted);
    fs::write(data_file, out).map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
fn load_user_data(username: String, password: String) -> Result<Vec<u8>, String> {
    let user_file = get_user_file(&username);
    let user: User = serde_json::from_slice(&fs::read(&user_file).map_err(|e| e.to_string())?).map_err(|e| e.to_string())?;
    let key = crypto::derive_key(&password, &user.salt);
    let mut data_file = user_file;
    data_file.set_file_name(format!("data_{}.bin", username));
    let raw = fs::read(data_file).map_err(|e| e.to_string())?;
    let (nonce, ciphertext) = raw.split_at(12);
    let mut nonce_arr = [0u8; 12];
    nonce_arr.copy_from_slice(nonce);
    let decrypted = crypto::decrypt(ciphertext, &key, &nonce_arr);
    Ok(decrypted)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            register_user,
            login_user,
            save_user_data,
            load_user_data
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
