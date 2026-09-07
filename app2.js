/**
 * APK SZ STORE — INDEXED-DB ENABLED ENGINE (NO URLS, DIRECT FILE UPLOADS ONLY)
 * Logo: https://i.ibb.co.com/svHF8kCY/file-000000001d64820880cdac1e1065928f.png
 */

const OFFICIAL_LOGO = 'https://i.ibb.co.com/svHF8kCY/file-000000001d64820880cdac1e1065928f.png';

// 1. Initial Default Seed Data (Matching User Screenshot)
const DEFAULT_STORE_SEED = [
  {
    id: 'app_inshot',
    name: 'Video Editor & Maker - InShot',
    developer: 'InShot Video Editor',
    category: 'Editor',
    type: 'app',
    section: 'recommended',
    rating: '4.6',
    size: '57MB',
    version: '1.980.1',
    description: 'InShot is an easy-to-use HD video editor and video maker with pro features including music, transition effects, text, and emoji.',
    whatsNew: 'Bug fixes and performance improvements.',
    logoBase64: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80'
    ],
    apkBlob: null,
    downloads: 14200
  },
  {
    id: 'app_tz_autoclicker',
    name: 'TZ Auto Clicker',
    developer: 'TZ Studios',
    category: 'Tools',
    type: 'app',
    section: 'recommended',
    rating: '5.0',
    size: '21.4 MB',
    version: '2.0.1',
    description: 'Fast automatic tapping and swipe tool with custom delay, repeat counter, and anti-detection scripts.',
    whatsNew: 'Added ultra-fast 1ms click interval.',
    logoBase64: OFFICIAL_LOGO,
    screenshots: [OFFICIAL_LOGO, OFFICIAL_LOGO, OFFICIAL_LOGO],
    apkBlob: null,
    downloads: 38200
  },
  {
    id: 'app_chatgpt',
    name: 'ChatGPT',
    developer: 'OpenAI',
    category: 'Tools',
    type: 'app',
    section: 'recommended',
    rating: '4.5',
    size: '15 MB',
    version: '1.2024.1',
    description: 'Official ChatGPT app by OpenAI. Get instant answers, tailored advice, creative inspiration, and learning support.',
    whatsNew: 'Voice mode optimizations.',
    logoBase64: 'https://images.unsplash.com/photo-1614680376593-902f749f7ffc?w=200&auto=format&fit=crop&q=80',
    screenshots: [OFFICIAL_LOGO, OFFICIAL_LOGO, OFFICIAL_LOGO],
    apkBlob: null,
    downloads: 89000
  },
  {
    id: 'app_tz_console',
    name: 'TZ Console',
    developer: 'TZ Dev Team',
    category: 'Tools',
    type: 'app',
    section: 'topcharts',
    rating: '4.5',
    size: '31 MB',
    version: '1.4.0',
    description: 'Developer terminal and Android package management console utility.',
    whatsNew: 'Added rootless shell executor.',
    logoBase64: OFFICIAL_LOGO,
    screenshots: [OFFICIAL_LOGO, OFFICIAL_LOGO, OFFICIAL_LOGO],
    apkBlob: null,
    downloads: 24500
  },
  {
    id: 'app_appcreator24',
    name: 'Appcreator24',
    developer: 'AppCreator Inc',
    category: 'Tools',
    type: 'app',
    section: 'topcharts',
    rating: '4.5',
    size: '18 MB',
    version: '3.0.0',
    description: 'Create native Android applications directly from your mobile device without coding.',
    whatsNew: 'New template modules.',
    logoBase64: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=200&auto=format&fit=crop&q=80',
    screenshots: [OFFICIAL_LOGO, OFFICIAL_LOGO, OFFICIAL_LOGO],
    apkBlob: null,
    downloads: 41000
  },
  {
    id: 'app_claude',
    name: 'Claude by Anthropic',
    developer: 'Anthropic',
    category: 'Tools',
    type: 'app',
    section: 'topcharts',
    rating: '4.5',
    size: '6.4 MB',
    version: '1.1.2',
    description: 'Next-generation AI assistant built for deep thinking, coding, writing, and creative workflow.',
    whatsNew: 'Enhanced Claude 3.5 Sonnet support.',
    logoBase64: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200&auto=format&fit=crop&q=80',
    screenshots: [OFFICIAL_LOGO, OFFICIAL_LOGO, OFFICIAL_LOGO],
    apkBlob: null,
    downloads: 67000
  }
];

// 2. IndexedDB Persistent Layer (Enables real local APK & image uploads without 5MB quota errors)
class IndexedStoreDB {
  constructor() {
    this.dbName = 'APK_SZ_IndexedDB_v1';
    this.db = null;
  }

  async open() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);
      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains('items')) {
          db.createObjectStore('items', { keyPath: 'id' });
        }
      };
      request.onsuccess = async (e) => {
        this.db = e.target.result;
        const all = await this.getAll();
        if (all.length === 0) {
          for (const item of DEFAULT_STORE_SEED) {
            await this.save(item);
          }
        }
        resolve(this.db);
      };
      request.onerror = (e) => reject(e);
    });
  }

  async getAll() {
    return new Promise((resolve) => {
      const tx = this.db.transaction('items', 'readonly');
      const store = tx.objectStore('items');
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
    });
  }

  async getById(id) {
    return new Promise((resolve) => {
      const tx = this.db.transaction('items', 'readonly');
      const store = tx.objectStore('items');
      const req = store.get(id);
      req.onsuccess = () => resolve(req.result);
    });
  }

  async save(item) {
    return new Promise((resolve) => {
      const tx = this.db.transaction('items', 'readwrite');
      const store = tx.objectStore('items');
      store.put(item);
      tx.oncomplete = () => resolve(true);
    });
  }

  async delete(id) {
    return new Promise((resolve) => {
      const tx = this.db.transaction('items', 'readwrite');
      const store = tx.objectStore('items');
      store.delete(id);
      tx.oncomplete = () => resolve(true);
    });
  }
}

const idb = new IndexedStoreDB();

// 3. Navigation & Router
async function navigateTo(view, param = null) {
  document.querySelectorAll('.view-panel').forEach(p => p.style.display = 'none');
  document.getElementById('topDropdownMenu').classList.remove('active');

  if (view === 'home') {
    document.getElementById('homeView').style.display = 'block';
    await renderHomeShelves();
  } else if (view === 'apps') {
    document.getElementById('appsView').style.display = 'block';
    await renderAllApps();
  } else if (view === 'games') {
    document.getElementById('gamesView').style.display = 'block';
    await renderAllGames();
  } else if (view === 'details' && param) {
    document.getElementById('detailsView').style.display = 'block';
    await renderDetails(param);
  } else if (view === 'admin') {
    document.getElementById('adminView').style.display = 'block';
    await renderAdminList();
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 4. Render Home Shelves (Matching exact screenshot layout)
async function renderHomeShelves() {
  const all = await idb.getAll();

  const rec = all.filter(x => x.section === 'recommended' || !x.section);
  const top = all.filter(x => x.section === 'topcharts');
  const edit = all.filter(x => x.section === 'editors');

  document.getElementById('recommendedShelf').innerHTML = rec.map(createStoreCardHTML).join('');
  document.getElementById('topChartsShelf').innerHTML = top.map(createStoreCardHTML).join('');
  document.getElementById('editorsChoiceShelf').innerHTML = (edit.length ? edit : rec).map(createStoreCardHTML).join('');
}

function createStoreCardHTML(item) {
  return `
    <div class="store-card" onclick="navigateTo('details', '${item.id}')">
      <img src="${item.logoBase64 || OFFICIAL_LOGO}" alt="${item.name}" class="store-card-icon" onerror="this.src='${OFFICIAL_LOGO}'" />
      <div class="store-card-name">${item.name}</div>
      <div class="store-card-cat">${item.category || 'Tools'}</div>
      <div class="store-card-meta">
        <span class="star">★ ${item.rating || '4.5'}</span> • ${item.size || '25MB'}
      </div>
    </div>
  `;
}

async function renderAllApps() {
  const all = await idb.getAll();
  const apps = all.filter(x => x.type === 'app');
  document.getElementById('allAppsGrid').innerHTML = apps.map(createStoreCardHTML).join('');
}

async function renderAllGames() {
  const all = await idb.getAll();
  const games = all.filter(x => x.type === 'game');
  document.getElementById('allGamesGrid').innerHTML = games.map(createStoreCardHTML).join('');
}

// 5. App Details Rendering
async function renderDetails(id) {
  const item = await idb.getById(id);
  if (!item) return navigateTo('home');

  document.getElementById('dIcon').src = item.logoBase64 || OFFICIAL_LOGO;
  document.getElementById('dName').textContent = item.name;
  document.getElementById('dDev').textContent = item.developer;
  document.getElementById('dCategory').textContent = item.category;
  document.getElementById('dRating').textContent = `${item.rating || '4.8'} ★`;
  document.getElementById('dReviews').textContent = `${((item.downloads || 1000) / 4).toFixed(0)} রিভিউ`;
  document.getElementById('dDownloads').textContent = `${(item.downloads || 1000).toLocaleString()}+`;
  document.getElementById('dSize').textContent = item.size;
  document.getElementById('dVersion').textContent = `v${item.version || '1.0'}`;
  document.getElementById('dDescription').textContent = item.description;
  document.getElementById('dWhatsNew').textContent = item.whatsNew || 'বাগ ফিক্স ও কর্মক্ষমতা উন্নয়ন করা হয়েছে।';

  // Screenshots View (3 to 10 images)
  const scWrap = document.getElementById('dScreenshots');
  const shots = item.screenshots && item.screenshots.length > 0 ? item.screenshots : [OFFICIAL_LOGO, OFFICIAL_LOGO, OFFICIAL_LOGO];
  scWrap.innerHTML = shots.map(src => `<img src="${src}" alt="Screenshot" />`).join('');

  // Download Trigger (Increments count & triggers actual file download)
  document.getElementById('dDownloadBtn').onclick = async () => {
    item.downloads = (item.downloads || 0) + 1;
    await idb.save(item);
    document.getElementById('dDownloads').textContent = `${item.downloads.toLocaleString()}+`;
    showToast(`🚀 '${item.name}' ডাউনলোড শুরু হচ্ছে...`);

    setTimeout(() => {
      let downloadUrl;
      if (item.apkBlob) {
        downloadUrl = URL.createObjectURL(item.apkBlob);
      } else {
        // Fallback demo APK generator
        const dummyBlob = new Blob([`APK SZ Verified Package: ${item.name}`], { type: 'application/vnd.android.package-archive' });
        downloadUrl = URL.createObjectURL(dummyBlob);
      }
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `${item.name.replace(/\s+/g, '_')}_v${item.version || '1.0'}.apk`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }, 400);
  };

  // Share
  document.getElementById('dShareBtn').onclick = () => {
    if (navigator.share) {
      navigator.share({ title: item.name, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('অ্যাপ লিংক কপি করা হয়েছে!');
    }
  };
}

// 6. Expandable Search Interaction
const sBox = document.getElementById('searchBoxContainer');
const sIn = document.getElementById('storeSearchInput');
const closeSBtn = document.getElementById('closeSearchBtn');

sIn.addEventListener('focus', () => {
  sBox.classList.add('expanded');
  closeSBtn.style.display = 'block';
});

sIn.addEventListener('input', async (e) => {
  const q = e.target.value.trim().toLowerCase();
  if (!q) {
    document.getElementById('searchView').style.display = 'none';
    return;
  }
  const all = await idb.getAll();
  const matches = all.filter(x => x.name.toLowerCase().includes(q) || x.category.toLowerCase().includes(q) || x.developer.toLowerCase().includes(q));

  document.querySelectorAll('.view-panel').forEach(p => p.style.display = 'none');
  const sView = document.getElementById('searchView');
  sView.style.display = 'block';
  document.getElementById('searchWord').textContent = q;

  const resList = document.getElementById('searchResultList');
  const empty = document.getElementById('searchEmpty');

  if (matches.length > 0) {
    empty.style.display = 'none';
    resList.innerHTML = matches.map(createStoreCardHTML).join('');
  } else {
    resList.innerHTML = '';
    empty.style.display = 'block';
  }
});

closeSBtn.addEventListener('click', () => {
  sIn.value = '';
  sBox.classList.remove('expanded');
  closeSBtn.style.display = 'none';
  navigateTo('home');
});

// 7. Top-Right 3-Dot / Code Menu
document.getElementById('topMenuToggle').addEventListener('click', () => {
  document.getElementById('topDropdownMenu').classList.toggle('active');
});

// 8. Admin Direct File Upload System
let uploadedLogoBase64 = '';
let uploadedApkBlob = null;
let uploadedScreenshotsBase64 = [];
let uploadedApkSize = '25 MB';

function openAdminAccess() {
  if (sessionStorage.getItem('APK_SZ_ADMIN') === 'true') {
    navigateTo('admin');
  } else {
    document.getElementById('adminLoginModal').style.display = 'flex';
  }
}

function closeAdminModal() {
  document.getElementById('adminLoginModal').style.display = 'none';
}

function handleAdminAuth(e) {
  e.preventDefault();
  const pass = document.getElementById('adminPassInput').value;
  if (pass === 'admin12345' || pass === 'admin') {
    sessionStorage.setItem('APK_SZ_ADMIN', 'true');
    closeAdminModal();
    showToast('এডমিন লগইন সফল হয়েছে!');
    navigateTo('admin');
  } else {
    document.getElementById('authError').style.display = 'block';
  }
}

function adminLogout() {
  sessionStorage.removeItem('APK_SZ_ADMIN');
  showToast('লগআউট সম্পন্ন হয়েছে।');
  navigateTo('home');
}

async function renderAdminList() {
  const all = await idb.getAll();
  const wrap = document.getElementById('adminItemsList');
  wrap.innerHTML = all.map(item => `
    <div class="admin-item-card">
      <div class="admin-item-info">
        <img src="${item.logoBase64 || OFFICIAL_LOGO}" class="admin-item-thumb" />
        <div>
          <strong>${item.name}</strong><br>
          <small>${item.category} • v${item.version} • ${item.size}</small>
        </div>
      </div>
      <div>
        <button class="btn-secondary" onclick="deleteStoreApp('${item.id}')"><i class="fa-solid fa-trash text-red"></i></button>
      </div>
    </div>
  `).join('');
}

// Direct File Listeners (NO URLS)
document.getElementById('fileLogo').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (ev) => {
      uploadedLogoBase64 = ev.target.result;
      showToast('✅ লোগো ফাইল লোড হয়েছে!');
    };
    reader.readAsDataURL(file);
  }
});

document.getElementById('fileApk').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    uploadedApkBlob = file;
    uploadedApkSize = `${(file.size / (1024 * 1024)).toFixed(1)} MB`;
    showToast(`✅ APK ফাইল লোড হয়েছে (${uploadedApkSize})`);
  }
});

document.getElementById('fileScreenshots').addEventListener('change', (e) => {
  const files = Array.from(e.target.files).slice(0, 10);
  uploadedScreenshotsBase64 = [];
  let count = 0;
  files.forEach(f => {
    const reader = new FileReader();
    reader.onload = (ev) => {
      uploadedScreenshotsBase64.push(ev.target.result);
      count++;
      if (count === files.length) {
        showToast(`✅ ${count}টি স্ক্রিনশট সিলেক্ট হয়েছে!`);
      }
    };
    reader.readAsDataURL(f);
  });
});

function openAppUploadModal() {
  document.getElementById('appUploadForm').reset();
  uploadedLogoBase64 = '';
  uploadedApkBlob = null;
  uploadedScreenshotsBase64 = [];
  document.getElementById('appUploadModal').style.display = 'flex';
}

function closeUploadModal() {
  document.getElementById('appUploadModal').style.display = 'none';
}

async function handleSaveApp(e) {
  e.preventDefault();
  const id = `app_${Date.now()}`;
  const name = document.getElementById('inAppName').value.trim();

  const appData = {
    id,
    name,
    category: document.getElementById('inCategory').value,
    type: document.getElementById('inType').value,
    section: document.getElementById('inSection').value,
    developer: document.getElementById('inDev').value.trim(),
    version: document.getElementById('inVersion').value.trim(),
    size: uploadedApkSize || '25 MB',
    rating: '5.0',
    description: document.getElementById('inDesc').value.trim(),
    whatsNew: document.getElementById('inWhatsNew').value.trim(),
    logoBase64: uploadedLogoBase64 || OFFICIAL_LOGO,
    screenshots: uploadedScreenshotsBase64.length > 0 ? uploadedScreenshotsBase64 : [OFFICIAL_LOGO, OFFICIAL_LOGO, OFFICIAL_LOGO],
    apkBlob: uploadedApkBlob,
    downloads: 100
  };

  await idb.save(appData);
  closeUploadModal();
  showToast('✅ অ্যাপ সরাসরি আপলোড সম্পন্ন হয়েছে!');
  await renderAdminList();
}

async function deleteStoreApp(id) {
  if (!confirm('আপনি কি নিশ্চিত যে এটি ডিলিট করতে চান?')) return;
  await idb.delete(id);
  showToast('ডিলিট করা হয়েছে!');
  await renderAdminList();
}

// 9. Toast Notification Helper
function showToast(msg) {
  const box = document.getElementById('toastBox');
  const t = document.createElement('div');
  t.className = 'toast-msg';
  t.textContent = msg;
  box.appendChild(t);
  setTimeout(() => t.remove(), 3200);
}

// Init App
window.addEventListener('DOMContentLoaded', async () => {
  await idb.open();
  await navigateTo('home');
});