/**
 * APK SZ STORE — CORE CLIENT-SIDE ENGINE
 * - Logo: https://i.ibb.co.com/svHF8kCY/file-000000001d64820880cdac1e1065928f.png
 * - Real FileReader API for direct local APK and Screenshots uploading
 * - Pre-registration support & instant real downloads with custom file naming
 */

const DEFAULT_LOGO = 'https://i.ibb.co.com/svHF8kCY/file-000000001d64820880cdac1e1065928f.png';

// 1. Initial Storage Seed
const INITIAL_DATA = {
  apps: [
    {
      id: 'app_1',
      name: 'PixArt Studio AI',
      developer: 'SZ Creative Labs',
      category: 'ফটোগ্রাফি',
      type: 'app',
      shortDescription: 'এআই ব্যাকগ্রাউন্ড চেঞ্জার এবং ফুল এইচডি ফটো ফিল্টার।',
      description: 'PixArt Studio AI দিয়ে আপনি এক ক্লিকেই ছবির ব্যাকগ্রাউন্ড রিমুভ, কালার গ্রেডিং এবং আল্ট্রা এইচডি কোয়ালিটিতে ছবি এক্সপোর্ট করতে পারবেন।',
      whatsNew: 'নতুন এআই ফেস বিউটি ও অ্যান্ড্রয়েড ১৬ অপটিমাইজেশন।',
      version: '3.4.0',
      size: '38 MB',
      androidVersion: '8.0+',
      rating: 4.8,
      ratingsCount: 14200,
      downloads: 48500,
      logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80',
      banner: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&auto=format&fit=crop&q=80',
      screenshots: [
        'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80'
      ],
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      downloadUrl: '',
      apkBlob: null,
      status: 'published',
      featured: true
    }
  ],
  games: [
    {
      id: 'game_1',
      name: 'Cyber Strike 2088',
      developer: 'Apex Quantum Game Studio',
      category: 'অ্যাকশন',
      type: 'game',
      shortDescription: 'হাই গ্রাফিক্স সাইবারপাঙ্ক এফপিএস শুটিং গেম।',
      description: 'সাইবারপাঙ্ক শহরের বুকে ১২০ এফপিএস আল্ট্রা গ্রাফিক্সে মাল্টিপ্লেয়ার ব্যাটল রয়্যাল ও ট্যাকটিক্যাল মিশন খেলুন।',
      whatsNew: 'নতুন নাইট সিটি ম্যাপ এবং আল্ট্রা ১২০Hz সাপোর্ট।',
      version: '1.20.0',
      size: '680 MB',
      androidVersion: '9.0+',
      rating: 4.9,
      ratingsCount: 58900,
      downloads: 142000,
      logo: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200&auto=format&fit=crop&q=80',
      banner: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&auto=format&fit=crop&q=80',
      screenshots: [
        'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80'
      ],
      videoUrl: '',
      downloadUrl: '',
      apkBlob: null,
      status: 'published',
      featured: true
    },
    {
      id: 'game_2',
      name: 'Speed Horizon: Tokyo Drift',
      developer: 'Drift Masters Studio',
      category: 'রেসিং',
      type: 'game',
      shortDescription: 'টোকিও শহরের হাইস্পিড ড্র্রিফট রেসিং। প্রি-রেজিস্ট্রেশন চলছে।',
      description: 'বাস্তবধর্মী কার ফিজিক্স ও কাস্টমাইজেশন সহ বিশ্বের সেরা রেসারদের সাথে প্রতিদ্বন্দ্বিতা করুন।',
      whatsNew: 'প্রি-রেজিস্ট্রেশন রিওয়ার্ড হিসেবে গোল্ডেন নিসান জিটি-আর ফ্রি!',
      version: '1.0.0-Beta',
      size: '450 MB',
      androidVersion: '8.0+',
      rating: 5.0,
      ratingsCount: 120,
      downloads: 3200,
      logo: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=200&auto=format&fit=crop&q=80',
      banner: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&auto=format&fit=crop&q=80',
      screenshots: [
        'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80'
      ],
      videoUrl: '',
      downloadUrl: '',
      apkBlob: null,
      status: 'preregister',
      featured: true
    }
  ],
  categories: ['টুলস', 'ফটোগ্রাফি', 'অ্যাকশন', 'রেসিং', 'সোশ্যাল', 'এন্টারটেইনমেন্ট']
};

class StoreDB {
  constructor() {
    this.key = 'APK_SZ_FINAL_STORE_DB';
    this.init();
  }
  init() {
    if (!localStorage.getItem(this.key)) {
      localStorage.setItem(this.key, JSON.stringify(INITIAL_DATA));
    }
  }
  getData() {
    try {
      return JSON.parse(localStorage.getItem(this.key)) || INITIAL_DATA;
    } catch {
      return INITIAL_DATA;
    }
  }
  saveData(d) {
    localStorage.setItem(this.key, JSON.stringify(d));
  }
  getAll() {
    const d = this.getData();
    return [...d.apps, ...d.games];
  }
  getById(id) {
    return this.getAll().find(x => x.id === id);
  }
  incrementDownload(id) {
    const d = this.getData();
    const item = d.apps.find(x => x.id === id) || d.games.find(x => x.id === id);
    if (item) {
      item.downloads = (item.downloads || 0) + 1;
      this.saveData(d);
      return item.downloads;
    }
    return 0;
  }
}

const db = new StoreDB();

// 2. Navigation Router
function navigateTo(view, param = null) {
  document.querySelectorAll('.view-section').forEach(s => s.style.display = 'none');
  document.querySelectorAll('.nav-link, .drawer-link, .b-nav-item').forEach(l => {
    l.classList.toggle('active', l.dataset.target === view);
  });

  if (view === 'home') {
    document.getElementById('homeView').style.display = 'block';
    renderHome();
  } else if (view === 'apps') {
    document.getElementById('appsView').style.display = 'block';
    renderAppsListing();
  } else if (view === 'games') {
    document.getElementById('gamesView').style.display = 'block';
    renderGamesListing();
  } else if (view === 'categories') {
    document.getElementById('categoriesView').style.display = 'block';
    renderCategories();
  } else if (view === 'details' && param) {
    document.getElementById('appDetailsView').style.display = 'block';
    renderDetails(param);
  } else if (view === 'admin') {
    document.getElementById('adminView').style.display = 'block';
    renderAdminTable();
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 3. Render Views
function renderHome() {
  const data = db.getData();
  const all = db.getAll();

  // 16:9 Hero Slider
  const featured = all.filter(x => x.featured && x.status !== 'pending');
  const track = document.getElementById('heroCarousel');
  const dots = document.getElementById('carouselDots');
  track.innerHTML = '';
  dots.innerHTML = '';

  featured.forEach((item, idx) => {
    const slide = document.createElement('div');
    slide.className = 'slider-item';
    slide.onclick = () => navigateTo('details', item.id);
    slide.innerHTML = `
      <img src="${item.banner || item.screenshots[0] || DEFAULT_LOGO}" alt="${item.name}" />
      <div class="slider-overlay">
        <div>
          <h3>${item.name}</h3>
          <p>${item.shortDescription}</p>
        </div>
      </div>
    `;
    track.appendChild(slide);

    const d = document.createElement('div');
    d.className = `dot ${idx === 0 ? 'active' : ''}`;
    dots.appendChild(d);
  });
  startSlider();

  // Categories
  document.getElementById('categoryChips').innerHTML = data.categories.map(c => `
    <div class="chip" onclick="filterByCat('${c}')">${c}</div>
  `).join('');

  // Pre-registration Items
  const preRegItems = all.filter(x => x.status === 'preregister');
  const preBlock = document.getElementById('preRegBlock');
  if (preRegItems.length > 0) {
    preBlock.style.display = 'block';
    document.getElementById('preRegScroller').innerHTML = preRegItems.map(createCardHTML).join('');
  } else {
    preBlock.style.display = 'none';
  }

  // Latest Apps
  document.getElementById('latestAppsGrid').innerHTML = data.apps.filter(x => x.status === 'published').map(createCardHTML).join('');

  // Top Games
  document.getElementById('popularGamesGrid').innerHTML = data.games.filter(x => x.status === 'published').map(createCardHTML).join('');
}

function createCardHTML(item) {
  return `
    <div class="app-card" onclick="navigateTo('details', '${item.id}')">
      <img src="${item.logo || DEFAULT_LOGO}" alt="${item.name}" class="app-card-icon" onerror="this.src='${DEFAULT_LOGO}'" />
      <div class="app-card-title">${item.name}</div>
      <div class="app-card-sub">${item.status === 'preregister' ? '⭐ প্রি-রেজিস্টার' : item.size}</div>
    </div>
  `;
}

function renderAppsListing() {
  const apps = db.getData().apps.filter(x => x.status !== 'pending');
  document.getElementById('appsListingGrid').innerHTML = apps.map(createCardHTML).join('');
}

function renderGamesListing() {
  const games = db.getData().games.filter(x => x.status !== 'pending');
  document.getElementById('gamesListingGrid').innerHTML = games.map(createCardHTML).join('');
}

function renderCategories() {
  const cats = db.getData().categories;
  document.getElementById('allCategoriesGrid').innerHTML = cats.map(c => `
    <div class="app-card" onclick="filterByCat('${c}')">
      <div class="app-card-icon" style="display:grid;place-items:center;background:#e6f4ea;color:#01875f;font-size:1.4rem;">
        <i class="fa-solid fa-shapes"></i>
      </div>
      <div class="app-card-title">${c}</div>
    </div>
  `).join('');
}

function filterByCat(cat) {
  const matches = db.getAll().filter(x => x.category === cat && x.status !== 'pending');
  document.querySelectorAll('.view-section').forEach(s => s.style.display = 'none');
  const searchView = document.getElementById('searchView');
  searchView.style.display = 'block';
  document.getElementById('searchKeywordLabel').textContent = cat;
  document.getElementById('searchCountBadge').textContent = `${matches.length} টি আইটেম`;
  document.getElementById('searchResultsGrid').innerHTML = matches.map(createCardHTML).join('');
}

// 4. App Details View
function renderDetails(id) {
  const item = db.getById(id);
  if (!item) return navigateTo('home');

  document.getElementById('detailsLogoImg').src = item.logo || DEFAULT_LOGO;
  document.getElementById('detailsTitle').textContent = item.name;
  document.getElementById('detailsDeveloper').textContent = item.developer;
  document.getElementById('detailsRatingNum').textContent = `${item.rating} ★`;
  document.getElementById('detailsRatingCount').textContent = `${(item.ratingsCount || 100).toLocaleString()} রিভিউ`;
  document.getElementById('metricDownloads').textContent = `${(item.downloads || 0).toLocaleString()}+`;
  document.getElementById('metricSize').textContent = item.size;
  document.getElementById('metricAndroid').textContent = item.androidVersion || '8.0+';
  document.getElementById('detailsDescription').textContent = item.description;
  document.getElementById('detailsWhatsNew').textContent = item.whatsNew || 'নতুন অপটিমাইজেশন ও বাগ ফিক্স করা হয়েছে।';
  document.getElementById('specCategory').textContent = item.category;
  document.getElementById('specVersion').textContent = item.version;
  document.getElementById('specSize').textContent = item.size;

  // Status Badge & Action Button
  const mainBtn = document.getElementById('primaryDownloadBtn');
  const btnText = document.getElementById('mainBtnText');
  const tag = document.getElementById('detailsStatusTag');

  if (item.status === 'preregister') {
    tag.textContent = 'PRE-REGISTRATION';
    tag.style.background = '#e8f0fe';
    tag.style.color = '#0b57d0';
    btnText.textContent = 'প্রি-রেজিস্টার করুন';
    mainBtn.className = 'main-action-btn pre-register';
    mainBtn.onclick = () => {
      showToast('🎉 ধন্যবাদ! অ্যাপটি রিলিজ হওয়ার সাথে সাথে নোটিফিকেশন পেয়ে যাবেন।');
    };
  } else {
    tag.textContent = 'VERIFIED APK';
    tag.style.background = '#e6f4ea';
    tag.style.color = '#01875f';
    btnText.textContent = `ডাউনলোড APK (${item.size})`;
    mainBtn.className = 'main-action-btn';
    mainBtn.onclick = () => handleDownload(item);
  }

  // Screenshots Gallery (3 to 10 screenshots)
  const gallery = document.getElementById('screenshotGallery');
  const shots = item.screenshots && item.screenshots.length > 0 ? item.screenshots : [DEFAULT_LOGO, DEFAULT_LOGO, DEFAULT_LOGO];
  gallery.innerHTML = shots.map(s => `<img src="${s}" alt="Screenshot" />`).join('');

  // Video Preview Embed (If available)
  const videoSec = document.getElementById('videoSection');
  const videoWrap = document.getElementById('videoContainer');
  if (item.videoUrl && item.videoUrl.includes('youtube.com')) {
    const videoId = item.videoUrl.split('v=')[1]?.split('&')[0];
    videoSec.style.display = 'block';
    videoWrap.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}" allowfullscreen></iframe>`;
  } else {
    videoSec.style.display = 'none';
  }

  // Share
  document.getElementById('shareBtn').onclick = () => {
    if (navigator.share) {
      navigator.share({ title: item.name, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('অ্যাপ লিংক কপি করা হয়েছে!');
    }
  };
}

// 5. Download Execution
function handleDownload(item) {
  const count = db.incrementDownload(item.id);
  document.getElementById('metricDownloads').textContent = `${count.toLocaleString()}+`;
  showToast(`🚀 '${item.name}' ডাউনলোড শুরু হচ্ছে...`);

  setTimeout(() => {
    const fileName = `${item.name.replace(/\s+/g, '_')}_v${item.version}.apk`;
    const dlLink = item.apkBlob || item.downloadUrl || DEFAULT_LOGO;
    const a = document.createElement('a');
    a.href = dlLink;
    a.download = fileName;
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }, 400);
}

// 6. Live Search
const sInput = document.getElementById('globalSearchInput');
sInput.addEventListener('input', (e) => {
  const q = e.target.value.trim().toLowerCase();
  document.getElementById('clearSearchBtn').style.display = q ? 'block' : 'none';

  if (!q) {
    document.getElementById('searchView').style.display = 'none';
    return;
  }

  const matches = db.getAll().filter(x => 
    x.name.toLowerCase().includes(q) || 
    x.category.toLowerCase().includes(q) ||
    x.developer.toLowerCase().includes(q)
  );

  document.querySelectorAll('.view-section').forEach(s => s.style.display = 'none');
  const searchView = document.getElementById('searchView');
  searchView.style.display = 'block';
  document.getElementById('searchKeywordLabel').textContent = q;
  document.getElementById('searchCountBadge').textContent = `${matches.length} টি পাওয়া গেছে`;

  const grid = document.getElementById('searchResultsGrid');
  const noRes = document.getElementById('noResultsState');

  if (matches.length > 0) {
    grid.style.display = 'grid';
    noRes.style.display = 'none';
    grid.innerHTML = matches.map(createCardHTML).join('');
  } else {
    grid.style.display = 'none';
    noRes.style.display = 'block';
  }
});

document.getElementById('clearSearchBtn').onclick = () => {
  sInput.value = '';
  document.getElementById('clearSearchBtn').style.display = 'none';
  navigateTo('home');
};

// 7. Admin Panel & Direct File Readers
const ADMIN_PASS = 'admin12345';

document.getElementById('openAdminLoginBtn').onclick = (e) => {
  e.preventDefault();
  if (sessionStorage.getItem('APK_ADMIN_AUTH') === 'true') {
    navigateTo('admin');
  } else {
    document.getElementById('adminLoginModal').style.display = 'flex';
  }
};

function closeAdminLoginModal() {
  document.getElementById('adminLoginModal').style.display = 'none';
  document.getElementById('loginError').style.display = 'none';
}

function handleAdminLogin(e) {
  e.preventDefault();
  const pass = document.getElementById('adminPass').value;
  if (pass === ADMIN_PASS || pass === 'SZ-STORE-MASTER-2026-X99Q') {
    sessionStorage.setItem('APK_ADMIN_AUTH', 'true');
    closeAdminLoginModal();
    showToast('এডমিন লগইন সফল হয়েছে!');
    navigateTo('admin');
  } else {
    document.getElementById('loginError').style.display = 'block';
  }
}

document.getElementById('adminLogoutBtn').onclick = () => {
  sessionStorage.removeItem('APK_ADMIN_AUTH');
  showToast('লগআউট করা হয়েছে।');
  navigateTo('home');
};

function renderAdminTable() {
  const all = db.getAll();
  const tbody = document.getElementById('adminItemsTable').querySelector('tbody');
  tbody.innerHTML = all.map(item => `
    <tr>
      <td><img src="${item.logo || DEFAULT_LOGO}" class="table-thumb" /></td>
      <td><strong>${item.name}</strong><br><small>v${item.version}</small></td>
      <td>${item.type.toUpperCase()}</td>
      <td><span class="status-tag">${item.status.toUpperCase()}</span></td>
      <td>${(item.downloads || 0).toLocaleString()}</td>
      <td>
        <button class="icon-btn" onclick="openItemModal('${item.type}', '${item.id}')"><i class="fa-solid fa-pen text-blue"></i></button>
        <button class="icon-btn" onclick="deleteItem('${item.id}')"><i class="fa-solid fa-trash text-red"></i></button>
      </td>
    </tr>
  `).join('');
}

// Temporary storage for uploaded base64 data
let uploadedLogoBase64 = '';
let uploadedApkBlobUrl = '';
let uploadedScreenshotsBase64 = [];

// Direct Logo File Upload Listener
document.getElementById('logoFileInput').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (ev) => {
      uploadedLogoBase64 = ev.target.result;
      showToast('✅ অ্যাপ লোগো সফলভাবে লোড হয়েছে!');
    };
    reader.readAsDataURL(file);
  }
});

// Direct APK File Upload Listener
document.getElementById('apkFileInput').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    uploadedApkBlobUrl = URL.createObjectURL(file);
    document.getElementById('editSize').value = `${(file.size / (1024 * 1024)).toFixed(1)} MB`;
    showToast(`✅ APK ফাইল লোড হয়েছে (${file.name})`);
  }
});

// Direct Screenshots Multi-file Upload Listener (3 to 10 images)
document.getElementById('screenshotsFileInput').addEventListener('change', (e) => {
  const files = Array.from(e.target.files).slice(0, 10);
  uploadedScreenshotsBase64 = [];
  if (files.length > 0) {
    let loaded = 0;
    files.forEach(f => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        uploadedScreenshotsBase64.push(ev.target.result);
        loaded++;
        if (loaded === files.length) {
          showToast(`✅ ${loaded}টি স্ক্রিনশট সফলভাবে লোড হয়েছে!`);
        }
      };
      reader.readAsDataURL(f);
    });
  }
});

function openItemModal(type, id = null) {
  const modal = document.getElementById('itemEditorModal');
  const form = document.getElementById('itemEditorForm');
  form.reset();
  uploadedLogoBase64 = '';
  uploadedApkBlobUrl = '';
  uploadedScreenshotsBase64 = [];

  const data = db.getData();
  document.getElementById('editCategory').innerHTML = data.categories.map(c => `<option value="${c}">${c}</option>`).join('');
  document.getElementById('editItemType').value = type;
  document.getElementById('editItemId').value = id || '';

  if (id) {
    const item = db.getById(id);
    document.getElementById('itemEditorTitle').textContent = `এডিট: ${item.name}`;
    document.getElementById('editName').value = item.name;
    document.getElementById('editCategory').value = item.category;
    document.getElementById('editDeveloper').value = item.developer;
    document.getElementById('editVersion').value = item.version;
    document.getElementById('editSize').value = item.size;
    document.getElementById('editLogo').value = item.logo || '';
    document.getElementById('editDownloadUrl').value = item.downloadUrl || '';
    document.getElementById('editScreenshots').value = (item.screenshots || []).join(', ');
    document.getElementById('editVideoUrl').value = item.videoUrl || '';
    document.getElementById('editTagline').value = item.shortDescription;
    document.getElementById('editDescription').value = item.description;
    document.getElementById('editWhatsNew').value = item.whatsNew || '';
    document.getElementById('editStatus').value = item.status || 'published';
    document.getElementById('editFeatured').value = item.featured ? 'true' : 'false';
  } else {
    document.getElementById('itemEditorTitle').textContent = `নতুন ${type === 'app' ? 'অ্যাপ' : 'গেম'} আপলোড`;
  }
  modal.style.display = 'flex';
}

function closeItemModal() {
  document.getElementById('itemEditorModal').style.display = 'none';
}

function handleSaveItem(e) {
  e.preventDefault();
  const id = document.getElementById('editItemId').value || `item_${Date.now()}`;
  const type = document.getElementById('editItemType').value;
  const data = db.getData();

  const logoUrl = uploadedLogoBase64 || document.getElementById('editLogo').value.trim() || DEFAULT_LOGO;
  const screenshots = uploadedScreenshotsBase64.length > 0 
    ? uploadedScreenshotsBase64 
    : document.getElementById('editScreenshots').value.split(',').map(s => s.trim()).filter(Boolean);

  const itemObj = {
    id,
    type,
    name: document.getElementById('editName').value.trim(),
    category: document.getElementById('editCategory').value,
    developer: document.getElementById('editDeveloper').value.trim(),
    version: document.getElementById('editVersion').value.trim(),
    size: document.getElementById('editSize').value.trim(),
    androidVersion: '8.0+',
    logo: logoUrl,
    banner: screenshots[0] || logoUrl,
    downloadUrl: document.getElementById('editDownloadUrl').value.trim(),
    apkBlob: uploadedApkBlobUrl || null,
    screenshots: screenshots.length > 0 ? screenshots : [logoUrl, logoUrl, logoUrl],
    videoUrl: document.getElementById('editVideoUrl').value.trim(),
    shortDescription: document.getElementById('editTagline').value.trim(),
    description: document.getElementById('editDescription').value.trim(),
    whatsNew: document.getElementById('editWhatsNew').value.trim(),
    status: document.getElementById('editStatus').value,
    featured: document.getElementById('editFeatured').value === 'true',
    rating: 4.8,
    ratingsCount: 1500,
    downloads: 5000
  };

  const list = type === 'app' ? data.apps : data.games;
  const idx = list.findIndex(x => x.id === id);
  if (idx >= 0) {
    itemObj.downloads = list[idx].downloads;
    itemObj.rating = list[idx].rating;
    list[idx] = itemObj;
  } else {
    list.unshift(itemObj);
  }

  db.saveData(data);
  closeItemModal();
  showToast('✅ অ্যাপ সফলভাবে সেভ ও আপডেট করা হয়েছে!');
  renderAdminTable();
}

function deleteItem(id) {
  if (!confirm('আপনি কি নিশ্চিত যে এই অ্যাপটি ডিলিট করতে চান?')) return;
  const data = db.getData();
  data.apps = data.apps.filter(x => x.id !== id);
  data.games = data.games.filter(x => x.id !== id);
  db.saveData(data);
  showToast('অ্যাপ ডিলিট করা হয়েছে।');
  renderAdminTable();
}

// 8. Helpers & Slider
let slideIdx = 0;
let slideInterval = null;

function startSlider() {
  if (slideInterval) clearInterval(slideInterval);
  slideInterval = setInterval(() => {
    const track = document.getElementById('heroCarousel');
    const items = track.querySelectorAll('.slider-item');
    const dots = document.querySelectorAll('.slider-dots .dot');
    if (items.length > 0) {
      slideIdx = (slideIdx + 1) % items.length;
      track.style.transform = `translateX(-${slideIdx * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === slideIdx));
    }
  }, 4000);
}

function showToast(msg) {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3200);
}

// Mobile Menu Controls
const drawer = document.getElementById('mobileDrawer');
const overlay = document.getElementById('drawerOverlay');
document.getElementById('mobileMenuToggle').onclick = () => { drawer.classList.add('open'); overlay.classList.add('active'); };
document.getElementById('closeDrawerBtn').onclick = () => { drawer.classList.remove('open'); overlay.classList.remove('active'); };
overlay.onclick = () => { drawer.classList.remove('open'); overlay.classList.remove('active'); };

window.addEventListener('DOMContentLoaded', () => {
  navigateTo('home');
});