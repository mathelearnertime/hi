const form = document.getElementById("searchForm");
const address = document.getElementById("address");
const browser = document.getElementById("browser");
const viewer = document.getElementById("viewer");
const currentUrl = document.getElementById("currentUrl");
const blocked = document.getElementById("blocked");
let current = "";
let historyList = [];
let historyIndex = -1;

// Use CorsProxy as it handles YouTube/Video sites better
const PROXY_BASE = "https://corsproxy.io/?";

function normalizeInput(value) {
 const text = value.trim();
 if (!text) return "";
 if (/^(https?:\/\/)/i.test(text)) return text;
 if (/^[\w.-]+\.[a-z]{2,}([/:?#]|$)/i.test(text)) return "https://" + text;
 return "https://duckduckgo.com/?q=" + encodeURIComponent(text);
}

function navigate(value, addHistory = true) {
 const url = normalizeInput(value);
 if (!url) return;
 
 // Wrap URL in CorsProxy
 const proxyUrl = PROXY_BASE + encodeURIComponent(url);
 
 current = url; 
 browser.hidden = false;
 document.getElementById("home").style.display = "none";
 currentUrl.textContent = url;
 address.value = url;
 blocked.hidden = true
