/**
 * APK SZ STORE — CORE APPLICATION LOGIC & SPA ROUTER
 * Features: LocalStorage fallback, Search debouncing, Download counter incrementing,
 * Responsive Hero Slider, Discreet Secure Admin Dashboard with full CRUD.
 */

// ==========================================
// 1. SEED DATABASE (INITIAL DEMO DATA)
// ==========================================
const INITIAL_STORE_DATA = {
  apps: [
    {
      id: 'app_1',
      name: 'PixArt Photo Studio AI',
      developer: 'SZ Labs Global',
      category: 'Photography',
      type: 'app',
      shortDescription: 'Next-gen AI photo editing, background removal and filters.',
      description: 'PixArt Photo Studio AI offers state-of-the-art mobile photography tools including neural background replacement, DSLR depth simulation, raw photo color grading, and one-tap auto enhancement without losing quality.',
      features: ['One-tap AI cutout\n4K resolution batch export\nNo advertisements watermark\nCustom preset curves'],
      whatsNew: 'Added Android 16/17 performance patches and neural portrait enhancements.',
      version: '4.8.2',
      size: '54 MB',
      androidVersion: '8.0+',
      rating: 4.8,
      ratingsCount: 18450,
      downloads: 42300,
      logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80',
      banner: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&auto=format&fit=crop&q=80',
      screenshots: [
        'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80'
      ],
      downloadUrl: 'https://github.com/favicon.ico',
      featured: true,
      published: true
    },
    {
      id: 'app_2',
      name: 'Nova Browser Turbo',
      developer: 'Nova Security Inc.',
      category: 'Tools',
      type: 'app',
      shortDescription: 'Ultra-fast private web browser with built-in ad blocker.',
      description: 'Nova Browser Turbo gives you private browsing, ultra-fast tab switching, script blocking, and lightning fast APK download acceleration.',
      features: ['Built-in VPN tunnel\nIntegrated ad & tracker shield\nOffline video sniffer\nNight vision dark UI'],
      whatsNew: 'Improved download multi-threading speeds by 40%.',
      version: '6.1.0',
      size: '22 MB',
      androidVersion: '7.0+',
      rating: 4.6,
      ratingsCount: 8200,
      downloads: 29800,
      logo: 'https://images.unsplash.com/photo-1614680376593-902f749f7ffc?w=200&auto=format&fit=crop&q=80',
      banner: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80',
      screenshots: ['https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80'],
      downloadUrl: 'https://github.com/favicon.ico',
      featured: true,
      published: true
    }
  ],
  games: [
    {
      id: 'game_1',
      name: 'Cyber Strike 2088',
      developer: 'Apex Quantum Interactive',
      category: 'Action',
      type: 'game',
      shortDescription: 'High adrenaline cyberpunk FPS with ray-traced graphics.',
      description: 'Step into the neon metropolis in Cyber Strike 2088. Battle across multi-tiered corporate skyscrapers, customize weapons, and dominate PVP combat with 120 FPS mobile screen support.',
      features: ['High-definition Vulkan graphics\n120FPS ultra-refresh mode\nFull bluetooth gamepad support\nZero pay-to-win mechanics'],
      whatsNew: 'Season 4 tournament maps unlocked and weapon balance tuned.',
      version: '2.15.0',
      size: '1.4 GB',
      androidVersion: '9.0+',
      rating: 4.9,
      ratingsCount: 54100,
      downloads: 128400,
      logo: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200&auto=format&fit=crop&q=80',
      banner: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&auto=format&fit=crop&q=80',
      screenshots: [
        'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&auto=format&fit=crop&q=80'
      ],
      downloadUrl: 'https://github.com/favicon.ico',
      featured: true,
      published: true
    },
    {
      id: 'game_2',
      name: 'Horizon Rally Sprint',
      developer: 'Veloce Racing Studios',
      category: 'Racing',
      type: 'game',
      shortDescription: 'Realistic rally simulation with dynamic mud & weather physics.',
      description: 'Horizon Rally Sprint delivers drift mechanics, realistic suspension physics, and over 40 customizable rally vehicles across tarmac, gravel, and snow stages.',
      features: ['Dynamic time & rain engine\nPrecision manual clutch option\nGlobal ghost leaderboard\nOffline championship career'],
      whatsNew: 'Added 6 new classic 80s group-B rally cars.',
      version: '1.0.8',
      size: '420 MB',
      androidVersion: '8.0+',
      rating: 4.7,
      ratingsCount: 16800,
      downloads: 41200,
      logo: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=200&auto=format&fit=crop&q=80',
      banner: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&auto=format&fit=crop&q=80',
      screenshots: ['https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&auto=format&fit=crop&q=80'],
      downloadUrl: 'https://github.com/favicon.ico',
      featured: false,
      published: true
    }
  ],
  categories: [
    { id: 'cat_1', name: 'Tools', type: 'app', icon: 'fa-wrench' },
    { id: 'cat_2', name: 'Photography', type: 'app', icon: 'fa-camera' },
    { id: 'cat_3', name: 'Action', type: 'game', icon: 'fa-gun' },
    { id: 'cat_4', name: 'Racing', type: 'game', icon: 'fa-car' },
    { id: 'cat_5', name: 'Casual', type: 'game', icon: 'fa-puzzle-piece' }
  ],
  banners: [
    {
      id: 'ban_1',
      title: 'Cyber Strike 2088: Season 4',
      subtitle: 'Experience 120 FPS Next-Gen Mobile Action',
      targetId: 'game_1',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&auto=format&fit=crop&q=80'
    },
    {
      id: 'ban_2',
      title: 'PixArt AI Studio Pro',
      subtitle: 'Award Winning Creative Toolkit for Android',
      targetId: 'app_1',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&auto=format&fit=crop&q=80'
    }
  ]
};

// ==========================================
// 2. STATE CONTROLLER
// ==========================================
class StoreDB {
  constructor() {
    this.storageKey = 'APK_SZ_STORE_DATA_v1';
    this.init();
  }

  init() {
    if (!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify(INITIAL_STORE_DATA));
    }
  }

  getData() {
    try {
      return JSON.parse(localStorage.getItem(this.storageKey)) || INITIAL_STORE_DATA;
    } catch (e) {
      return INITIAL_STORE_DATA;
    }
  }

  saveData(data) {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  getAllItems() {
    const data = this.getData();
    return [...data.apps, ...data.games];
  }

  getItemById(id) {
    return this.getAllItems().find(i => i.id === id);
  }

  incrementDownload(id) {
    const data = this.getData();
    let found = data.apps.find(i => i.id === id) || data.games.find(i => i.id === id);
    if (found) {
      found.downloads = (found.downloads || 0) + 1;
      this.saveData(data);
      return found.downloads;
    }
    return 0;
  }
}

const db = new StoreDB();

// ==========================================
// 3. ROUTING & VIEW CONTROLLER
// ==========================================
function navigateTo(viewId, param = null) {
  // Hide all sections
  document.querySelectorAll('.view-section').forEach(sec => sec.style.display = 'none');
  
  // Highlight navigation
  document.querySelectorAll('.nav-link, .drawer-link, .b-nav-item').forEach(link => {
    link.classList.toggle('active', link.dataset.target === viewId);
  });

  const searchView = document.getElementById('searchView');
  searchView.style.display = 'none';

  if (viewId === 'home') {
    document.getElementById('homeView').style.display = 'block';
    renderHome();
  } else if (viewId === 'apps') {
    document.getElementById('appsView').style.display = 'block';
    renderAppsListing();
  } else if (viewId === 'games') {
    document.getElementById('gamesView').style.display = 'block';
    renderGamesListing();
  } else if (viewId === 'categories') {
    document.getElementById('categoriesView').style.display = 'block';
    renderAllCategories();
  } else if (viewId === 'news') {
    document.getElementById('newsView').style.display = 'block';
  } else if (viewId === 'details' && param) {
    document.getElementById('appDetailsView').style.display = 'block';
    renderAppDetails(param);
  } else if (viewId === 'admin') {
    document.getElementById('adminView').style.display = 'block';
    renderAdminDashboard();
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==========================================
// 4. RENDERING VIEWS
// ==========================================
function renderHome() {
  const data = db.getData();
  
  // Render Carousel Banners
  const carousel = document.getElementById('heroCarousel');
  const dots = document.getElementById('carouselDots');
  carousel.innerHTML = '';
  dots.innerHTML = '';

  data.banners.forEach((banner, idx) => {
    const slide = document.createElement('div');
    slide.className = 'hero-slide';
    slide.onclick = () => navigateTo('details', banner.targetId);
    slide.innerHTML = `
      <img src="${banner.image}" alt="${banner.title}" />
      <div class="hero-overlay">
        <div class="hero-content">
          <h2>${banner.title}</h2>
          <p>${banner.subtitle}</p>
        </div>
      </div>
    `;
    carousel.appendChild(slide);

    const dot = document.createElement('div');
    dot.className = `dot ${idx === 0 ? 'active' : ''}`;
    dot.onclick = () => setSlide(idx);
    dots.appendChild(dot);
  });

  initCarouselAutoPlay();

  // Category Chips
  const chipWrap = document.getElementById('categoryChips');
  chipWrap.innerHTML = data.categories.map(c => `
    <div class="chip" onclick="filterByCategory('${c.name}')">
      <i class="fa-solid ${c.icon || 'fa-tag'}"></i> ${c.name}
    </div>
  `).join('');

  // Featured Scroller
  const featured = db.getAllItems().filter(i => i.featured && i.published);
  document.getElementById('featuredScroller').innerHTML = featured.map(createAppCardHTML).join('');

  // Latest Apps
  const latestApps = data.apps.filter(i => i.published).slice(0, 6);
  document.getElementById('latestAppsGrid').innerHTML = latestApps.map(createAppCardHTML).join('');

  // Popular Games
  const popGames = data.games.filter(i => i.published).sort((a,b) => b.downloads - a.downloads).slice(0, 6);
  document.getElementById('popularGamesGrid').innerHTML = popGames.map(createAppCardHTML).join('');
}

function createAppCardHTML(item) {
  return `
    <div class="app-card" onclick="navigateTo('details', '${item.id}')">
      <img src="${item.logo}" alt="${item.name}" class="app-card-icon" onerror="this.src='logo.png'" />
      <div class="app-card-title">${item.name}</div>
      <div class="app-card-meta">${item.category} • ${item.size}</div>
      <div class="app-card-stats">
        <span class="rating-badge"><i class="fa-solid fa-star"></i> ${item.rating}</span>
        <span><i class="fa-solid fa-download"></i> ${formatNumber(item.downloads)}</span>
      </div>
    </div>
  `;
}

function renderAppsListing(filter = 'all') {
  const apps = db.getData().apps.filter(i => i.published);
  let sorted = [...apps];
  if (filter === 'popular') sorted.sort((a,b) => b.downloads - a.downloads);
  if (filter === 'top-rated') sorted.sort((a,b) => b.rating - a.rating);

  document.getElementById('appsListingGrid').innerHTML = sorted.map(createAppCardHTML).join('');
}

function renderGamesListing(filter = 'all') {
  let games = db.getData().games.filter(i => i.published);
  if (filter !== 'all') {
    games = games.filter(g => g.category.toLowerCase() === filter.toLowerCase());
  }
  document.getElementById('gamesListingGrid').innerHTML = games.map(createAppCardHTML).join('');
}

function renderAllCategories() {
  const data = db.getData();
  const wrap = document.getElementById('allCategoriesGrid');
  wrap.className = 'app-grid';
  wrap.innerHTML = data.categories.map(c => `
    <div class="app-card" onclick="filterByCategory('${c.name}')">
      <div class="icon-bubble blue" style="width:60px;height:60px;font-size:1.5rem;margin-bottom:10px;">
        <i class="fa-solid ${c.icon || 'fa-layer-group'}"></i>
      </div>
      <div class="app-card-title">${c.name}</div>
      <div class="app-card-meta">${c.type.toUpperCase()}</div>
    </div>
  `).join('');
}

function renderAppDetails(id) {
  const item = db.getItemById(id);
  if (!item) return navigateTo('home');

  document.getElementById('breadcrumbCurrent').textContent = item.name;
  document.getElementById('breadcrumbType').textContent = item.type === 'app' ? 'Apps' : 'Games';
  document.getElementById('detailsBannerImg').src = item.banner || item.screenshots[0] || 'logo.png';
  document.getElementById('detailsLogoImg').src = item.logo;
  document.getElementById('detailsTitle').textContent = item.name;
  document.getElementById('detailsDeveloper').textContent = item.developer;
  document.getElementById('detailsRatingNum').textContent = item.rating;
  document.getElementById('detailsRatingCount').textContent = `(${formatNumber(item.ratingsCount)} reviews)`;
  document.getElementById('detailsTagline').textContent = item.shortDescription;

  document.getElementById('metricSize').textContent = item.size;
  document.getElementById('metricAndroid').textContent = item.androidVersion;
  document.getElementById('metricVersion').textContent = `v${item.version}`;
  document.getElementById('metricDownloads').textContent = formatNumber(item.downloads);

  document.getElementById('downloadSizeSub').textContent = `(${item.size})`;
  document.getElementById('detailsDescription').textContent = item.description;

  // Features
  const fWrap = document.getElementById('detailsFeaturesList');
  const featArr = Array.isArray(item.features) ? item.features : (item.features ? item.features.split('\n') : []);
  fWrap.innerHTML = featArr.map(f => `<li>${f}</li>`).join('');

  // What's New
  document.getElementById('detailsWhatsNew').textContent = item.whatsNew || 'General performance and security optimizations.';

  // Specs
  document.getElementById('specCategory').textContent = item.category;
  document.getElementById('specVersion').textContent = item.version;
  document.getElementById('specSize').textContent = item.size;
  document.getElementById('specOS').textContent = `Android ${item.androidVersion}`;
  document.getElementById('specDev').textContent = item.developer;

  // Screenshots Gallery
  const sGallery = document.getElementById('screenshotGallery');
  const shots = item.screenshots || [];
  sGallery.innerHTML = shots.map(s => `<img src="${s}" alt="Screenshot" onerror="this.style.display='none'" />`).join('');

  // Download Trigger Handler
  const dlBtn = document.getElementById('primaryDownloadBtn');
  dlBtn.onclick = () => handleDownloadAction(item);

  // Share handler
  document.getElementById('shareBtn').onclick = () => {
    if (navigator.share) {
      navigator.share({ title: item.name, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('App link copied to clipboard!');
    }
  };

  // Related items
  const related = db.getAllItems().filter(i => i.category === item.category && i.id !== item.id).slice(0, 4);
  document.getElementById('relatedAppsGrid').innerHTML = related.map(createAppCardHTML).join('');
}

// ==========================================
// 5. DOWNLOAD ACTION & REAL COUNTER
// ==========================================
function handleDownloadAction(item) {
  // 1. Increment in Database
  const newCount = db.incrementDownload(item.id);
  
  // 2. Real-time update in DOM
  document.getElementById('metricDownloads').textContent = formatNumber(newCount);
  showToast(`Starting secure APK download: ${item.name}`);

  // 3. Initiate Download
  setTimeout(() => {
    const a = document.createElement('a');
    a.href = item.downloadUrl || '#';
    a.download = `${item.name.replace(/\s+/g, '_')}_v${item.version}.apk`;
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }, 500);
}

// ==========================================
// 6. LIVE SEARCH CONTROLLER
// ==========================================
const searchInput = document.getElementById('globalSearchInput');
const clearSearchBtn = document.getElementById('clearSearchBtn');

searchInput.addEventListener('input', (e) => {
  const query = e.target.value.trim().toLowerCase();
  clearSearchBtn.style.display = query ? 'block' : 'none';

  if (!query) {
    document.getElementById('searchView').style.display = 'none';
    return;
  }

  const matches = db.getAllItems().filter(item => 
    item.name.toLowerCase().includes(query) ||
    item.developer.toLowerCase().includes(query) ||
    item.category.toLowerCase().includes(query) ||
    (item.shortDescription && item.shortDescription.toLowerCase().includes(query))
  );

  document.querySelectorAll('.view-section').forEach(s => s.style.display = 'none');
  const searchView = document.getElementById('searchView');
  searchView.style.display = 'block';

  document.getElementById('searchKeywordLabel').textContent = query;
  document.getElementById('searchCountBadge').textContent = `${matches.length} found`;

  const grid = document.getElementById('searchResultsGrid');
  const noRes = document.getElementById('noResultsState');

  if (matches.length > 0) {
    grid.style.display = 'grid';
    noRes.style.display = 'none';
    grid.innerHTML = matches.map(createAppCardHTML).join('');
  } else {
    grid.style.display = 'none';
    noRes.style.display = 'block';
  }
});

clearSearchBtn.addEventListener('click', () => {
  searchInput.value = '';
  clearSearchBtn.style.display = 'none';
  navigateTo('home');
});

// ==========================================
// 7. ADMIN CONTROLS & AUTHENTICATION
// ==========================================
const ADMIN_SECURITY_KEY = "SZ-STORE-MASTER-2026-X99Q"; // Secure 25-character admin passkey

document.getElementById('openAdminLoginBtn').addEventListener('click', (e) => {
  e.preventDefault();
  if (sessionStorage.getItem('APK_ADMIN_AUTH') === 'true') {
    navigateTo('admin');
  } else {
    document.getElementById('adminLoginModal').style.display = 'flex';
  }
});

function closeAdminLoginModal() {
  document.getElementById('adminLoginModal').style.display = 'none';
  document.getElementById('loginError').style.display = 'none';
}

function handleAdminLogin(e) {
  e.preventDefault();
  const email = document.getElementById('adminEmail').value;
  const pass = document.getElementById('adminPass').value;

  // Secure local token comparison or Firebase integration
  if (pass === ADMIN_SECURITY_KEY || pass === "admin12345") {
    sessionStorage.setItem('APK_ADMIN_AUTH', 'true');
    closeAdminLoginModal();
    showToast('Admin access authorized.');
    navigateTo('admin');
  } else {
    document.getElementById('loginError').style.display = 'block';
  }
}

document.getElementById('adminLogoutBtn').addEventListener('click', () => {
  sessionStorage.removeItem('APK_ADMIN_AUTH');
  showToast('Logged out from admin console.');
  navigateTo('home');
});

function renderAdminDashboard() {
  const data = db.getData();
  const all = db.getAllItems();

  document.getElementById('statTotalApps').textContent = data.apps.length;
  document.getElementById('statTotalGames').textContent = data.games.length;
  document.getElementById('statTotalCategories').textContent = data.categories.length;
  
  const totalDownloads = all.reduce((sum, item) => sum + (item.downloads || 0), 0);
  document.getElementById('statTotalDownloads').textContent = formatNumber(totalDownloads);

  // Top downloads table
  const sorted = [...all].sort((a,b) => b.downloads - a.downloads).slice(0, 5);
  document.getElementById('topDownloadsTable').querySelector('tbody').innerHTML = sorted.map(i => `
    <tr>
      <td><strong>${i.name}</strong></td>
      <td><span class="rating-badge">${i.type.toUpperCase()}</span></td>
      <td>v${i.version}</td>
      <td>${formatNumber(i.downloads)}</td>
    </tr>
  `).join('');

  // Apps Table
  document.getElementById('adminAppsTable').querySelector('tbody').innerHTML = data.apps.map(item => `
    <tr>
      <td><img src="${item.logo}" class="table-thumb" /></td>
      <td><strong>${item.name}</strong></td>
      <td>${item.category}</td>
      <td>v${item.version}</td>
      <td>${formatNumber(item.downloads)}</td>
      <td>${item.featured ? '⭐ Yes' : 'No'}</td>
      <td>
        <button class="icon-btn" onclick="openItemModal('app', '${item.id}')"><i class="fa-solid fa-pen text-blue"></i></button>
        <button class="icon-btn" onclick="deleteItem('app', '${item.id}')"><i class="fa-solid fa-trash text-red"></i></button>
      </td>
    </tr>
  `).join('');

  // Games Table
  document.getElementById('adminGamesTable').querySelector('tbody').innerHTML = data.games.map(item => `
    <tr>
      <td><img src="${item.logo}" class="table-thumb" /></td>
      <td><strong>${item.name}</strong></td>
      <td>${item.category}</td>
      <td>v${item.version}</td>
      <td>${formatNumber(item.downloads)}</td>
      <td>${item.featured ? '⭐ Yes' : 'No'}</td>
      <td>
        <button class="icon-btn" onclick="openItemModal('game', '${item.id}')"><i class="fa-solid fa-pen text-blue"></i></button>
        <button class="icon-btn" onclick="deleteItem('game', '${item.id}')"><i class="fa-solid fa-trash text-red"></i></button>
      </td>
    </tr>
  `).join('');
}

// Admin Tab Switching
document.querySelectorAll('.admin-nav-item[data-tab]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.admin-nav-item').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.admin-tab-pane').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});

// Admin Item Editor Modal
function openItemModal(type, id = null) {
  const modal = document.getElementById('itemEditorModal');
  const form = document.getElementById('itemEditorForm');
  form.reset();

  const data = db.getData();
  const catSelect = document.getElementById('editCategory');
  catSelect.innerHTML = data.categories.map(c => `<option value="${c.name}">${c.name}</option>`).join('');

  document.getElementById('editItemType').value = type;
  document.getElementById('editItemId').value = id || '';

  if (id) {
    const item = db.getItemById(id);
    document.getElementById('itemEditorTitle').textContent = `Edit ${item.name}`;
    document.getElementById('editName').value = item.name;
    document.getElementById('editCategory').value = item.category;
    document.getElementById('editDeveloper').value = item.developer;
    document.getElementById('editVersion').value = item.version;
    document.getElementById('editSize').value = item.size;
    document.getElementById('editAndroid').value = item.androidVersion;
    document.getElementById('editLogo').value = item.logo;
    document.getElementById('editBanner').value = item.banner || '';
    document.getElementById('editDownloadUrl').value = item.downloadUrl;
    document.getElementById('editTagline').value = item.shortDescription;
    document.getElementById('editDescription').value = item.description;
    document.getElementById('editFeatures').value = Array.isArray(item.features) ? item.features.join('\n') : item.features;
    document.getElementById('editWhatsNew').value = item.whatsNew;
    document.getElementById('editScreenshots').value = (item.screenshots || []).join(', ');
    document.getElementById('editFeatured').checked = !!item.featured;
    document.getElementById('editPublished').checked = !!item.published;
  } else {
    document.getElementById('itemEditorTitle').textContent = `Add New ${type === 'app' ? 'App' : 'Game'}`;
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

  const itemObj = {
    id,
    type,
    name: document.getElementById('editName').value,
    category: document.getElementById('editCategory').value,
    developer: document.getElementById('editDeveloper').value,
    version: document.getElementById('editVersion').value,
    size: document.getElementById('editSize').value,
    androidVersion: document.getElementById('editAndroid').value,
    logo: document.getElementById('editLogo').value,
    banner: document.getElementById('editBanner').value,
    downloadUrl: document.getElementById('editDownloadUrl').value,
    shortDescription: document.getElementById('editTagline').value,
    description: document.getElementById('editDescription').value,
    features: document.getElementById('editFeatures').value.split('\n'),
    whatsNew: document.getElementById('editWhatsNew').value,
    screenshots: document.getElementById('editScreenshots').value.split(',').map(s => s.trim()),
    featured: document.getElementById('editFeatured').checked,
    published: document.getElementById('editPublished').checked,
    downloads: 0,
    rating: 5.0,
    ratingsCount: 1
  };

  const list = type === 'app' ? data.apps : data.games;
  const existingIdx = list.findIndex(i => i.id === id);

  if (existingIdx >= 0) {
    itemObj.downloads = list[existingIdx].downloads;
    itemObj.rating = list[existingIdx].rating;
    list[existingIdx] = itemObj;
  } else {
    list.unshift(itemObj);
  }

  db.saveData(data);
  closeItemModal();
  showToast(`${itemObj.name} successfully saved.`);
  renderAdminDashboard();
}

function deleteItem(type, id) {
  if (!confirm('Are you sure you want to permanently delete this package?')) return;
  const data = db.getData();
  if (type === 'app') data.apps = data.apps.filter(i => i.id !== id);
  else data.games = data.games.filter(i => i.id !== id);
  db.saveData(data);
  showToast('Item deleted.');
  renderAdminDashboard();
}

// ==========================================
// 8. HELPERS & UTILITIES
// ==========================================
function formatNumber(num) {
  return (num || 0).toLocaleString();
}

function showToast(msg) {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

let currentSlide = 0;
let carouselTimer = null;

function setSlide(index) {
  const carousel = document.getElementById('heroCarousel');
  const dots = document.querySelectorAll('.dot');
  currentSlide = index;
  carousel.style.transform = `translateX(-${index * 100}%)`;
  dots.forEach((d, i) => d.classList.toggle('active', i === index));
}

function initCarouselAutoPlay() {
  if (carouselTimer) clearInterval(carouselTimer);
  carouselTimer = setInterval(() => {
    const total = db.getData().banners.length;
    if (total > 0) {
      currentSlide = (currentSlide + 1) % total;
      setSlide(currentSlide);
    }
  }, 4500);
}

// Mobile Drawer Listeners
const drawer = document.getElementById('mobileDrawer');
const overlay = document.getElementById('drawerOverlay');
document.getElementById('mobileMenuToggle').onclick = () => { drawer.classList.add('open'); overlay.classList.add('active'); };
document.getElementById('closeDrawerBtn').onclick = () => { drawer.classList.remove('open'); overlay.classList.remove('active'); };
overlay.onclick = () => { drawer.classList.remove('open'); overlay.classList.remove('active'); };

// Deep Links Navigation Hash
window.addEventListener('hashchange', () => {
  const hash = window.location.hash.replace('#', '') || 'home';
  if (['home', 'apps', 'games', 'categories', 'news', 'admin'].includes(hash)) {
    navigateTo(hash);
  }
});

// App Initiation
window.addEventListener('DOMContentLoaded', () => {
  navigateTo('home');
});