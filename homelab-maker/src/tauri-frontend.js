// Tauri frontend helpers for user registration, login, and data
import { invoke } from '@tauri-apps/api/core';

export async function registerUser(username, password) {
  return invoke('register_user', { username, password });
}

export async function loginUser(username, password) {
  return invoke('login_user', { username, password });
}

export async function saveUserData(username, password, data) {
  return invoke('save_user_data', { username, password, data });
}

export async function loadUserData(username, password) {
  return invoke('load_user_data', { username, password });
}
