/**
 * Jangan Diam - Main JavaScript
 * Page-based initialization directed by body[data-page]
 */

// Archive Data Store
const archiveData = [
    {
        id: '804',
        actNum: '804',
        date: '18 JULI 2024',
        title: 'Surat Terbuka: Menagih Janji Penyelesaian Yudisial Kasus Semanggi I & II',
        tags: ['Semanggi', 'JSKK', 'Surat Terbuka'],
        summary: 'Tuntutan tertulis kepada Presiden mengenai penuntasan yudisial atas pembunuhan mahasiswa dalam Tragedi Semanggi I dan II.',
        casesReferred: 'Semanggi I, Semanggi II, Trisakti',
        textBody: `
            <p>
                Kepada Yang Terhormat, Presiden Republik Indonesia,
            </p>
            <p>
                Dengan segala hormat, kami, Jaringan Solidaritas Korban untuk Keadilan (JSKK), bersama keluarga korban dan masyarakat sipil yang peduli terhadap penegakan HAM, menyampaikan surat terbuka ini di hadapan Istana Negara pada Kamis, 18 Juli 2024.
            </p>
            <p>
                Hari ini menandai aksi ke-804 dan pengiriman surat tuntutan ke-804 kepada Presiden yang kami laksanakan secara konsisten sejak 18 Januari 2007. Kehadiran kami di depan Istana Negara adalah simbol keteguhan: transformasi rasa duka cita menjadi cinta bagi sesama dan penegakan keadilan hukum.
            </p>
            <p>
                Kami menuntut penyelesaian yudisial yang nyata atas Tragedi Semanggi I (13 November 1998) dan Semanggi II (24 September 1999), di mana mahasiswa ditembak di hadapan publik saat menyuarakan aspirasi reformasi.
            </p>
            <p>
                Surat terbuka ini dibagikan di lokasi aksi kepada seluruh lapisan masyarakat yang melintas. Salinannya diarsipkan secara digital agar sejarah perlawanan ini tidak hilang ditelan zaman.
            </p>
            <blockquote>
                "Berdiri sampai ada keadilan, atau sampai tidak ada lagi yang tersisa untuk berdiri."
            </blockquote>
            <p>
                Dokumen Resmi:<br/>
                <strong>Jaringan Solidaritas Korban untuk Keadilan (JSKK)</strong>
            </p>`
    },
    {
        id: '803',
        actNum: '803',
        date: '11 JULI 2024',
        title: 'Zine Kamisan: 20 Tahun Pembunuhan Munir Tanpa Dalang Utama',
        tags: ['Munir', 'Zine', 'Impunitas'],
        summary: 'Edisi khusus memperingati dua dekade terbunuhnya pejuang HAM Munir Said Thalib di udara tanpa tersentuhnya aktor intelektual.',
        casesReferred: 'Pembunuhan Munir Said Thalib',
        textBody: `
            <p>
                Dua puluh tahun yang lalu, racun arsenik menghentikan detak jantung pejuang HAM Munir Said Thalib dalam penerbangan menuju Amsterdam.
            </p>
            <p>
                Hingga dua dekade berlalu, eksekutor lapangan telah selesai menjalani hukuman, namun aktor intelektual yang merancang dan memerintahkan pembunuhan tersebut belum pernah diadili secara transparan.
            </p>
            <p>
                Zine Kamisan edisi #803 ini menggarisbawahi bahwa kejahatan terhadap kemanusiaan dan pembunuhan pembela HAM tidak boleh kedaluwarsa.
            </p>
            <blockquote>
                "Aku harus tenang walaupun takut, karena ketakutan akan menghilangkan pikiran jernih." - Munir
            </blockquote>
            `
    },
    {
        id: '802',
        actNum: '802',
        date: '04 JULI 2024',
        title: 'Siaran Pers: Stop Kriminalisasi Pejuang Lingkungan & Hak Adat',
        tags: ['Wadas', 'Lingkungan', 'Siaran Pers'],
        summary: 'Pernyataan sikap atas meningkatnya tindakan represif dan kriminalisasi terhadap warga desa yang memperjuangkan tanah ruang hidup.',
        casesReferred: 'Konflik Wadas, Hak Adat Papua',
        textBody: `
            <p>
                Hak atas lingkungan hidup yang bersih, aman, dan sehat merupakan bagian tak terpisahkan dari Hak Asasi Manusia.
            </p>
            <p>
                Aksi Kamisan menyerukan penghentian segala bentuk intimidasi, penangkapan sewenang-wenang, serta kriminalisasi terhadap warga Wadas, masyarakat adat di Papua, dan seluruh pejuang lingkungan hidup.
            </p>
            `
    },
    {
        id: '750',
        actNum: '750',
        date: '15 JUNI 2023',
        title: "Surat Terbuka: Menggugat Kebisuan Penguasa Atas Tragedi 1965-1966",
        tags: ['Tragedi65', 'Surat Terbuka'],
        summary: "Peringatan aksi ke-750 menegaskan bahwa pemulihan hak-hak korban '65 harus disertai dengan pengungkapan kebenaran sejarah.",
        casesReferred: 'Tragedi 1965-1966',
        textBody: `
            <p>
                Aksi Kamisan ke-750 menyoroti masih banyaknya penyintas dan keluarga korban Tragedi '65 yang mengalami stigma serta diskriminasi struktural.
            </p>
            <p>
                Pemulihan hak korban tanpa pengungkapan kebenaran dan permohonan maaf resmi dari negara merupakan bentuk pengabaian sejarah.
            </p>
            `
    },
    {
        id: '700',
        actNum: '700',
        date: '20 MEI 2022',
        title: 'Zine Kamisan: Pengusutan Penyerangan Pejuang Anti-Korupsi',
        tags: ['NovelBaswedan', 'Korupsi', 'Zine'],
        summary: 'Refleksi atas ancaman nyata terhadap aktivis anti-korupsi dan penegakan hukum yang tebang pilih.',
        casesReferred: 'Penyerangan Novel Baswedan',
        textBody: `
            <p>
                Korupsi adalah kejahatan luar biasa yang merampas hak-hak ekonomi dan sosial rakyat Indonesia.
            </p>
            <p>
                Perlindungan terhadap pejuang anti-korupsi dan pembela keadilan adalah kewajiban mutlak negara yang tak dapat ditawar.
            </p>
            `
    }
];

// Toggle mobile menu visibility
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    if (menu) menu.classList.toggle('hidden');
}

// Scroll smoothly to a specific section (home page)
function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
}

// Render archive item grid
function renderArchiveItems(items) {
    const grid = document.getElementById('archive-grid');
    if (!grid) return;
    grid.innerHTML = '';

    if (items.length === 0) {
        grid.innerHTML = `
            <div class="col-span-3 py-20 text-center font-mono text-xs text-zinc-500">
                <iconify-icon icon="lucide:search-x" class="text-4xl block mx-auto mb-4 text-zinc-700"></iconify-icon>
                Tidak ada dokumen yang cocok dengan pencarian.
            </div>`;
        return;
    }

    items.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'border border-darkborder bg-cardbg p-6 cursor-pointer hover:border-zinc-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-white/5 transition-all duration-300 ease-out space-y-4 group flex flex-col justify-between animate-card-enter';
        card.style.animationDelay = `${index * 60}ms`;
        card.onclick = () => navigateToDetail(item.actNum);

        const tagBadges = item.tags.map(t =>
            `<span class="text-[10px] px-2 py-0.5 border border-zinc-800 text-zinc-400 group-hover:border-zinc-700 transition-colors">#${t}</span>`
        ).join(' ');

        card.innerHTML = `
            <div class="space-y-3">
                <div class="flex items-center justify-between font-mono text-xs">
                    <span class="px-2 py-0.5 bg-white text-black font-bold">AKSI #${item.actNum}</span>
                    <span class="text-subtext">${item.date}</span>
                </div>
                <h3 class="font-serif text-xl font-bold text-white group-hover:text-zinc-200 transition-colors leading-snug">
                    ${item.title}
                </h3>
                <p class="text-xs text-subtext line-clamp-3 leading-relaxed">
                    ${item.summary}
                </p>
                <div class="flex flex-wrap gap-1.5 pt-1">
                    ${tagBadges}
                </div>
            </div>
            <div class="pt-4 border-t border-darkborder flex items-center justify-between font-mono text-[11px] text-zinc-400">
                <span>[PDF, FOTO, NASKAH]</span>
                <span class="group-hover:translate-x-1.5 transition-transform duration-200 text-white flex items-center gap-1">
                    <span>BACA DOKUMEN</span>
                    <iconify-icon icon="lucide:arrow-right" class="text-xs"></iconify-icon>
                </span>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Filter and sort archive items
function filterArchive() {
    const searchEl = document.getElementById('archive-search');
    const sortEl = document.getElementById('archive-sort');
    if (!searchEl || !sortEl) return;

    const query = searchEl.value.toLowerCase();
    const sortVal = sortEl.value;

    let filtered = archiveData.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.summary.toLowerCase().includes(query) ||
        item.actNum.includes(query) ||
        item.tags.some(t => t.toLowerCase().includes(query))
    );

    if (sortVal === 'oldest') {
        filtered.sort((a, b) => parseInt(a.actNum) - parseInt(b.actNum));
    } else {
        filtered.sort((a, b) => parseInt(b.actNum) - parseInt(a.actNum));
    }

    renderArchiveItems(filtered);
}

// Navigate to detail page
function navigateToDetail(actNum) {
    window.location.href = `detail.html?id=${actNum}`;
}

// Detail page initialization & population
let currentDetailItem = null;

function initDetailPage() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id') || archiveData[0].actNum;
    const item = archiveData.find(i => i.actNum === id) || archiveData[0];
    currentDetailItem = item;
    populateDetail(item);
}

function populateDetail(item) {
    const set = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.textContent = val;
    };
    const setHTML = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = val;
    };

    set('detail-breadcrumb-act', `AKSI KE-${item.actNum}`);
    set('detail-act-badge', `AKSI #${item.actNum}`);
    set('detail-title', item.title);
    set('detail-date', item.date);
    set('detail-source', item.source || 'Arsip JSKK');
    set('detail-pub-date', item.date);
    set('detail-proc-date', item.processedDate || item.date);
    setHTML('detail-text-body', item.textBody);
    set('detail-photo-caption', `FOTO AKSI KE-${item.actNum}`);

    // Issues (supports array or comma-separated string)
    const issuesContainer = document.getElementById('detail-cases-referred');
    if (issuesContainer) {
        const rawIssues = Array.isArray(item.issues || item.casesReferred)
            ? (item.issues || item.casesReferred)
            : (item.casesReferred || 'Semanggi I, Trisakti').split(',').map(s => s.trim());

        issuesContainer.innerHTML = rawIssues
            .filter(Boolean)
            .map(issue => `<span class="border border-darkborder px-2.5 py-1 bg-pureblack text-white font-medium">${issue}</span>`)
            .join(' ');
    }

    // Tags
    const tagsContainer = document.getElementById('detail-tags-container');
    if (tagsContainer) {
        tagsContainer.innerHTML = item.tags
            .map(t => `<span class="border border-darkborder px-3 py-1 bg-offblack text-zinc-300">#${t}</span>`)
            .join(' ');
    }

    // Source links
    const sourceUrl = item.sourceUrl || 'https://kontras.org';
    const srcLink = document.getElementById('detail-source-link');
    if (srcLink) srcLink.href = sourceUrl;
    const topSrcLink = document.getElementById('detail-top-source-link');
    if (topSrcLink) topSrcLink.href = sourceUrl;

    // Previous / Next navigation
    const currentIndex = archiveData.findIndex(i => i.actNum === item.actNum);
    const prevItem = archiveData[currentIndex + 1]; // Older item = higher index
    const nextItem = archiveData[currentIndex - 1]; // Newer item = lower index

    const prevBtn = document.getElementById('detail-prev-btn');
    const prevText = document.getElementById('detail-prev-text');
    if (prevBtn && prevText) {
        if (prevItem) {
            prevBtn.style.opacity = '1';
            prevBtn.onclick = () => { window.location.href = `detail.html?id=${prevItem.actNum}`; };
            prevText.textContent = `AKSI KE-${prevItem.actNum}`;
        } else {
            prevBtn.style.opacity = '0.4';
            prevBtn.onclick = null;
            prevText.textContent = 'AKSI AWAL';
        }
    }

    const nextBtn = document.getElementById('detail-next-btn');
    const nextText = document.getElementById('detail-next-text');
    if (nextBtn && nextText) {
        if (nextItem) {
            nextBtn.style.opacity = '1';
            nextBtn.onclick = () => { window.location.href = `detail.html?id=${nextItem.actNum}`; };
            nextText.textContent = `AKSI KE-${nextItem.actNum}`;
        } else {
            nextBtn.style.opacity = '0.4';
            nextBtn.onclick = null;
            nextText.textContent = 'BELUM TERBIT';
        }
    }

    // Update document title
    document.title = `${item.title} | Jangan Diam`;
}

// Copy detail text content
function copyCurrentText() {
    if (!currentDetailItem) return;
    const plainText = currentDetailItem.textBody.replace(/<[^>]*>/g, '');
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(plainText.trim())
            .then(() => showCopyToast())
            .catch(() => legacyCopy(plainText));
    } else {
        legacyCopy(plainText);
    }
}

function legacyCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text.trim();
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showCopyToast();
}

function showCopyToast() {
    let toast = document.getElementById('copy-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'copy-toast';
        toast.className = 'fixed bottom-6 left-1/2 -translate-x-1/2 bg-white text-black font-mono text-xs px-5 py-3 z-50 transition-opacity duration-300';
        document.body.appendChild(toast);
    }
    toast.textContent = 'Teks berhasil disalin!';
    toast.style.opacity = '1';
    setTimeout(() => { toast.style.opacity = '0'; }, 2500);
}

// Lightbox modal handlers
function openLightbox(type) {
    const lightbox = document.getElementById('lightbox-modal');
    const content = document.getElementById('lightbox-content');
    if (!lightbox || !content) return;

    const actNum = currentDetailItem ? currentDetailItem.actNum : '-';

    if (type === 'naskah') {
        content.innerHTML = `
            <div class="space-y-4">
                <iconify-icon icon="lucide:file-text" class="text-6xl text-white mx-auto"></iconify-icon>
                <h3 class="font-serif text-2xl font-bold text-white">Naskah Asli Pindaian Surat Terbuka Aksi #${actNum}</h3>
                <p class="font-mono text-xs text-zinc-400">Pemindaian Berkas Fisik Berstempel Resmi JSKK</p>
            </div>
        `;
    } else {
        content.innerHTML = `
            <div class="space-y-4">
                <iconify-icon icon="lucide:camera" class="text-6xl text-white mx-auto"></iconify-icon>
                <h3 class="font-serif text-2xl font-bold text-white">Dokumentasi Foto Aksi Lapangan #${actNum}</h3>
                <p class="font-mono text-xs text-zinc-400">Foto Suasana Keheningan di Depan Istana Merdeka</p>
            </div>
        `;
    }

    lightbox.classList.remove('hidden');
    lightbox.classList.add('flex');
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox-modal');
    if (lightbox) {
        lightbox.classList.add('hidden');
        lightbox.classList.remove('flex');
    }
}

// Close lightbox on backdrop click
document.addEventListener('click', (e) => {
    const lightbox = document.getElementById('lightbox-modal');
    if (lightbox && e.target === lightbox) closeLightbox();
});

// Rain canvas animation effect
function initHeroRain() {
    const canvas = document.getElementById('hero-rain-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let drops = [];
    const DENSITY = 260;

    function resize() {
        const hero = document.getElementById('hero-jumbotron');
        if (!hero) return;
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
    }

    function createDrop() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * -canvas.height,
            len: 18 + Math.random() * 30,
            speed: 3 + Math.random() * 5,
            opacity: 0.15 + Math.random() * 0.35,
            drift: -0.3 + Math.random() * 0.1,
        };
    }

    function init() {
        resize();
        drops = Array.from({ length: DENSITY }, createDrop);
    }

    function tick() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const d of drops) {
            ctx.beginPath();
            ctx.moveTo(d.x, d.y);
            ctx.lineTo(d.x + d.drift * d.len * 0.5, d.y + d.len);
            ctx.strokeStyle = `rgba(200,210,220,${d.opacity})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();

            d.y += d.speed;
            d.x += d.drift;
            if (d.y > canvas.height + d.len) {
                Object.assign(d, createDrop());
                d.y = -d.len;
            }
        }
        requestAnimationFrame(tick);
    }

    init();
    tick();
    window.addEventListener('resize', resize);
}

// Animated week counter on hero section
function initHeroCounter() {
    const el = document.getElementById('hero-week-counter');
    if (!el) return;

    const start = new Date(2007, 0, 18); // 18 Jan 2007
    const now = new Date();
    const totalWeeks = Math.floor((now - start) / (7 * 24 * 60 * 60 * 1000));

    const duration = 2000;
    const startTime = performance.now();

    function step(timestamp) {
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // Ease-out cubic
        const current = Math.floor(eased * totalWeeks);
        el.textContent = current.toLocaleString('id-ID') + '+';
        if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}

// Animated lyrics display synchronized with Mars timestamps
function initSingingUmbrella() {
    const chatContainer = document.getElementById('lyric-chat-container');
    if (!chatContainer) return;

    // Lyrics & timestamps matching reference/Mars.md
    const marsLyricsData = [
        { timeSec: 0, lyric: "Kau muda bangun dari diam" },
        { timeSec: 4, lyric: "Siapkan payung-payung hitam" },
        { timeSec: 9, lyric: "Biar sekali sepekan" },
        { timeSec: 13, lyric: "Kita jumpa di Kamisan" },
        { timeSec: 18, lyric: "Bangkit lawan atau s'lamanya" },
        { timeSec: 23, lyric: "Dibungkam ketakutan" },
        { timeSec: 27, lyric: "Beri ajar pada penguasa" },
        { timeSec: 32, lyric: "Kepal tangan serukan" },
        { timeSec: 35, lyric: "Hey! Hidup korban" },
        { timeSec: 37, lyric: "Jangan diam" },
        { timeSec: 39, lyric: "Jangan diam, lawan!" },
        { timeSec: 43, lyric: "Hidup korban" },
        { timeSec: 46, lyric: "Jangan diam" },
        { timeSec: 48, lyric: "Jangan diam, lawan!" },
        { timeSec: 52, lyric: "Bawa kawan sekalian" },
        { timeSec: 56, lyric: "Masuk dalam barisan" },
        { timeSec: 60, lyric: "Undang semua kemarahan" },
        { timeSec: 64, lyric: "Jangan diam, lawan!" },
        { timeSec: 68, lyric: "Sebar kabar kebenaran" },
        { timeSec: 72, lyric: "Jangan diam, lawan!" },
        { timeSec: 77, lyric: "Sampai tiba keadilan" },
        { timeSec: 81, lyric: "Jangan diam, lawan!" },
        { timeSec: 103, lyric: "Kau muda bangun dari diam" },
        { timeSec: 107, lyric: "Siapkan payung-payung hitam" },
        { timeSec: 112, lyric: "Biar sekali sepekan" },
        { timeSec: 116, lyric: "Kita jumpa di Kamisan" },
        { timeSec: 121, lyric: "Bangkit lawan atau s'lamanya" },
        { timeSec: 126, lyric: "Dibungkam ketakutan" },
        { timeSec: 130, lyric: "Beri ajar pada penguasa" },
        { timeSec: 135, lyric: "Kepal tangan serukan" },
        { timeSec: 138, lyric: "Hey! Hidup korban" },
        { timeSec: 140, lyric: "Jangan diam" },
        { timeSec: 143, lyric: "Jangan diam, lawan!" },
        { timeSec: 147, lyric: "Hidup korban" },
        { timeSec: 149, lyric: "Jangan diam" },
        { timeSec: 151, lyric: "Jangan diam, lawan!" },
        { timeSec: 155, lyric: "Bawa kawan sekalian" },
        { timeSec: 160, lyric: "Masuk dalam barisan" },
        { timeSec: 164, lyric: "Undang semua kemarahan" },
        { timeSec: 168, lyric: "Jangan diam, lawan!" },
        { timeSec: 172, lyric: "Sebar kabar kebenaran" },
        { timeSec: 176, lyric: "Jangan diam, lawan!" },
        { timeSec: 180, lyric: "Sampai tiba keadilan" },
        { timeSec: 184, lyric: "Jangan diam, lawan!" }
    ];

    let currentIndex = 0;
    let isPlaying = false;
    let timerTimeout = null;

    const emblemEl = document.getElementById('hero-umbrella-emblem');

    function getStepDuration(index) {
        const currentItem = marsLyricsData[index];
        const nextItem = marsLyricsData[(index + 1) % marsLyricsData.length];

        let diffSec;
        if (index === marsLyricsData.length - 1) {
            diffSec = 5;
        } else {
            diffSec = nextItem.timeSec - currentItem.timeSec;
        }

        return Math.max(diffSec * 1000, 1200);
    }

    function clearBubbles() {
        const existingBubbles = chatContainer.querySelectorAll('.lyric-bubble');
        existingBubbles.forEach(b => {
            b.classList.remove('active');
            b.classList.add('exiting');
            setTimeout(() => b.remove(), 350);
        });
    }

    function showNextLyric() {
        if (!isPlaying) return;

        const item = marsLyricsData[currentIndex];

        clearBubbles();

        const bubble = document.createElement('div');
        bubble.className = 'lyric-bubble pos-top';
        bubble.innerHTML = `
            <p class="font-serif text-sm sm:text-base font-semibold tracking-wide text-zinc-100 text-center leading-snug">
                ${item.lyric}
            </p>
        `;

        chatContainer.appendChild(bubble);

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                bubble.classList.add('active');
            });
        });

        const duration = getStepDuration(currentIndex);
        currentIndex = (currentIndex + 1) % marsLyricsData.length;

        timerTimeout = setTimeout(showNextLyric, duration);
    }

    function startSinging() {
        if (isPlaying) return;
        isPlaying = true;
        if (emblemEl) emblemEl.classList.add('singing');
        showNextLyric();
    }

    function stopSinging() {
        isPlaying = false;
        if (timerTimeout) clearTimeout(timerTimeout);
        if (emblemEl) emblemEl.classList.remove('singing');
        clearBubbles();
    }

    if (emblemEl) {
        emblemEl.addEventListener('click', () => {
            if (isPlaying) {
                stopSinging();
            } else {
                startSinging();
            }
        });

        // Autoplay lyrics 2 seconds after page load
        setTimeout(() => {
            if (!isPlaying) {
                startSinging();
            }
        }, 2000);
    }
}

// DOM initialization based on data-page attribute
document.addEventListener('DOMContentLoaded', () => {
    const page = document.body.dataset.page || 'home';

    // Initialize AOS library if present
    if (typeof AOS !== 'undefined') {
        AOS.init({ once: true, offset: 60, easing: 'ease-out-cubic', duration: 700 });
    }

    // Execute page-specific initialization
    if (page === 'home') {
        initHeroCounter();
        initSingingUmbrella();
    }

    if (page === 'arsip') {
        renderArchiveItems(archiveData);
    }

    if (page === 'arsip-detail') {
        initDetailPage();
    }
});

// Site preloader handler
function hidePreloader() {
    const preloader = document.getElementById('site-preloader');
    if (!preloader || preloader.classList.contains('preloader-hidden')) return;
    preloader.classList.add('preloader-hidden');
    setTimeout(() => {
        if (preloader.parentNode) preloader.parentNode.removeChild(preloader);
    }, 500);
}

// Dismiss preloader when all assets finish loading
window.addEventListener('load', hidePreloader);

// Fallback timer in case load event already fired or is delayed
if (document.readyState === 'complete') {
    hidePreloader();
} else {
    setTimeout(hidePreloader, 1800);
}
