// Firebase Imports from CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-analytics.js";

import {
    getFirestore,
    collection,
    addDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyBR5-K_AXMv0XytXM4b_UII0hX2HLfaK0w",
    authDomain: "zyrova-portfolio.firebaseapp.com",
    projectId: "zyrova-portfolio",
    storageBucket: "zyrova-portfolio.firebasestorage.app",
    messagingSenderId: "84856751053",
    appId: "1:84856751053:web:1475f574e71aee612a3a84",
    measurementId: "G-M3BTXRRK0Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Analytics
const analytics = getAnalytics(app);

// Firestore
const db = getFirestore(app);

console.log("✅ Firebase Connected");

// DOM Elements
const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-btn');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const themeBtn = document.getElementById('theme-btn');
const stars = document.querySelectorAll('.star');
const submitBtn = document.getElementById('submit-review');
const commentInput = document.getElementById('comment');
const messageEl = document.getElementById('message');

let currentRating = 0;

// Sidebar Toggle
function openSidebar() {
    sidebar.classList.add('active');
    overlay.classList.add('active');
}
function closeSidebar() {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
}

menuBtn.addEventListener('click', openSidebar);
closeBtn.addEventListener('click', closeSidebar);
overlay.addEventListener('click', closeSidebar);

// Theme Toggle with LocalStorage
const savedTheme = localStorage.getItem('zynova-theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
themeBtn.textContent = savedTheme === 'dark' ? '🌙' : '☀️';

themeBtn.addEventListener('click', () => {    const current = document.documentElement.getAttribute('data-theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('zynova-theme', newTheme);
    themeBtn.textContent = newTheme === 'dark' ? '🌙' : '☀️';
});

// Star Rating Logic
stars.forEach(star => {
    star.addEventListener('click', () => {
        currentRating = parseInt(star.dataset.value);
        stars.forEach(s => {
            s.classList.toggle('active', parseInt(s.dataset.value) <= currentRating);
        });
    });
});

// Review Submission
submitBtn.addEventListener('click', async () => {
    if (currentRating === 0) {
        messageEl.textContent = '⚠️ Please select a star rating first.';
        messageEl.style.color = '#ff6b6b';
        return;
    }

    const comment = commentInput.value.trim();
    if (!comment) {
        messageEl.textContent = '⚠️ Please write a short comment.';
        messageEl.style.color = '#ff6b6b';
        return;
    }

    messageEl.textContent = 'Submitting...';
    messageEl.style.color = '#888';
    submitBtn.disabled = true;

    try {
        await addDoc(collection(db, 'reviews'), {
            rating: currentRating,
            comment: comment,
            createdAt: new Date()
        });
        messageEl.textContent = '✅ Review submitted successfully! Thank you.';
        messageEl.style.color = '#4ade80';
        commentInput.value = '';
        currentRating = 0;
        stars.forEach(s => s.classList.remove('active'));
    } catch (error) {
        console.error('Submission error:', error);
        messageEl.textContent = '❌ Failed to submit review. Please try again.';        messageEl.style.color = '#ff6b6b';
    } finally {
        submitBtn.disabled = false;
    }
});