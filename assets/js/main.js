/**
 * Jangan Diam - Main JavaScript with Alpine.js
 * Data fetched from data/*.json
 */

document.addEventListener('alpine:init', () => {
    // 1. Archive Component (archive.html)
    Alpine.data('archiveApp', () => ({
        items: [],
        search: '',
        sort: 'newest',
        loading: true,
        currentPage: 1,
        itemsPerPage: 6,

        async init() {
            try {
                const res = await fetch('data/archive.json');
                this.items = await res.json();
            } catch (err) {
                console.error('Failed to load archive data:', err);
            } finally {
                this.loading = false;
                hidePreloader();
            }

            this.$watch('search', () => {
                this.currentPage = 1;
            });
            this.$watch('sort', () => {
                this.currentPage = 1;
            });
        },

        get filteredItems() {
            const query = this.search.toLowerCase().trim();
            let result = this.items.filter(item =>
                item.title.toLowerCase().includes(query) ||
                item.summary.toLowerCase().includes(query) ||
                item.actNum.includes(query) ||
                item.tags.some(t => t.toLowerCase().includes(query))
            );

            if (this.sort === 'oldest') {
                result.sort((a, b) => parseInt(a.actNum) - parseInt(b.actNum));
            } else {
                result.sort((a, b) => parseInt(b.actNum) - parseInt(a.actNum));
            }
            return result;
        },

        get paginatedItems() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            return this.filteredItems.slice(start, start + this.itemsPerPage);
        },

        get totalPages() {
            return Math.ceil(this.filteredItems.length / this.itemsPerPage);
        },

        get latestItems() {
            return [...this.items]
                .sort((a, b) => parseInt(b.actNum) - parseInt(a.actNum))
                .slice(0, 3);
        },

        getVisiblePages() {
            const total = this.totalPages;
            if (total <= 5) {
                return Array.from({ length: total }, (_, i) => i + 1);
            }
            const current = this.currentPage;
            const pages = [];
            if (current <= 3) {
                pages.push(1, 2, 3, 4, '...', total);
            } else if (current >= total - 2) {
                pages.push(1, '...', total - 3, total - 2, total - 1, total);
            } else {
                pages.push(1, '...', current - 1, current, current + 1, '...', total);
            }
            return pages;
        },

        navigateToDetail(actNum) {
            window.location.href = `detail.html?id=${actNum}`;
        }
    }));

    // 2. Archive Detail Component (detail.html)
    Alpine.data('detailApp', () => ({
        items: [],
        currentItem: null,
        prevItem: null,
        nextItem: null,
        loading: true,
        lightboxOpen: false,
        lightboxType: 'naskah',
        activeAttachment: null,

        async init() {
            try {
                const res = await fetch('data/archive.json');
                this.items = await res.json();
                
                const params = new URLSearchParams(window.location.search);
                const id = params.get('id') || (this.items[0] ? this.items[0].actNum : '917');
                const index = this.items.findIndex(i => i.actNum === id);
                
                if (index !== -1) {
                    this.currentItem = this.items[index];
                    this.prevItem = this.items[index + 1] || null;
                    this.nextItem = this.items[index - 1] || null;
                } else {
                    this.currentItem = this.items[0];
                    this.prevItem = this.items[1] || null;
                    this.nextItem = null;
                }

                if (this.currentItem) {
                    document.title = `${this.currentItem.title} | Jangan Diam`;
                }
            } catch (err) {
                console.error('Failed to load archive detail:', err);
            } finally {
                this.loading = false;
                hidePreloader();
            }
        },

        openLightbox(attOrType) {
            if (typeof attOrType === 'object' && attOrType !== null) {
                this.activeAttachment = attOrType;
                this.lightboxType = attOrType.type;
            } else {
                this.lightboxType = attOrType;
                this.activeAttachment = this.currentItem?.attachments?.find(a => a.type === attOrType) || null;
            }
            this.lightboxOpen = true;
        },

        closeLightbox() {
            this.lightboxOpen = false;
            this.activeAttachment = null;
        },

        copyText() {
            if (!this.currentItem) return;
            const titleMd = `# ${this.currentItem.title}\n\n`;
            const bodyMd = htmlToMarkdown(this.currentItem.textBody || '');
            const fullMd = titleMd + bodyMd;
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(fullMd).then(() => showCopyToast('Teks MD berhasil disalin!'));
            } else {
                legacyCopy(fullMd, 'Teks MD berhasil disalin!');
            }
        },

        async downloadAttachments() {
            if (!this.currentItem) {
                alert('Tidak ada data arsip.');
                return;
            }

            // 1. Copy text as Markdown to clipboard
            const titleMd = `# ${this.currentItem.title}\n\n`;
            const bodyMd = htmlToMarkdown(this.currentItem.textBody || '');
            const fullMd = titleMd + bodyMd;

            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(fullMd);
            } else {
                legacyCopy(fullMd, '');
            }

            // 2. Download .md file
            const sanitizeTitle = (this.currentItem.title || 'selebaran').replace(/[^a-z0-9_-]/gi, '_').substring(0, 30);
            const mdFilename = `Aksi_${this.currentItem.actNum}_${sanitizeTitle}.md`;
            const blob = new Blob([fullMd], { type: 'text/markdown;charset=utf-8' });
            const blobUrl = URL.createObjectURL(blob);
            const mdLink = document.createElement('a');
            mdLink.href = blobUrl;
            mdLink.download = mdFilename;
            document.body.appendChild(mdLink);
            mdLink.click();
            document.body.removeChild(mdLink);
            setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);

            // 3. Download image attachments
            const attachments = this.currentItem.attachments || [];
            let count = 1; // 1 for .md file
            for (let i = 0; i < attachments.length; i++) {
                const att = attachments[i];
                if (att.imageUrl) {
                    count++;
                    await new Promise(r => setTimeout(r, 300));
                    const ext = att.imageUrl.includes('.png') ? 'png' : 'jpg';
                    const filename = `Aksi_${this.currentItem.actNum}_${att.type || 'lampiran'}_${i + 1}.${ext}`;
                    await triggerFileDownload(att.imageUrl, filename);
                }
            }

            showCopyToast(`Teks disalin & mengunduh ${count} berkas (.md + lampiran)...`);
        }
    }));

    // 3. Timeline Component (timeline.html)
    Alpine.data('timelineApp', () => ({
        milestones: [],
        loading: true,

        async init() {
            try {
                const res = await fetch('data/timeline.json');
                this.milestones = await res.json();
            } catch (err) {
                console.error('Failed to load timeline data:', err);
            } finally {
                this.loading = false;
                hidePreloader();
            }
        }
    }));

    // 4. Reference Component (reference.html)
    Alpine.data('referenceApp', () => ({
        books: [],
        videos: [],
        articles: [],
        loading: true,

        async init() {
            try {
                const res = await fetch('data/reference.json');
                const data = await res.json();
                this.books = data.books || [];
                this.videos = data.videos || [];
                this.articles = data.articles || [];

                this.$nextTick(() => {
                    this.initSwiper();
                    requestAnimationFrame(() => {
                        setTimeout(() => {
                            hidePreloader();
                        }, 100);
                    });
                });
            } catch (err) {
                console.error('Failed to load reference data:', err);
                hidePreloader();
            } finally {
                this.loading = false;
            }
        },

        initSwiper() {
            if (typeof Swiper === 'undefined') return;

            new Swiper('.books-swiper', {
                slidesPerView: 1,
                spaceBetween: 20,
                navigation: {
                    nextEl: '.books-next',
                    prevEl: '.books-prev',
                },
                pagination: {
                    el: '.books-pagination',
                    clickable: true,
                },
                breakpoints: {
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 24,
                    }
                }
            });

            new Swiper('.videos-swiper', {
                slidesPerView: 1,
                spaceBetween: 20,
                navigation: {
                    nextEl: '.videos-next',
                    prevEl: '.videos-prev',
                },
                pagination: {
                    el: '.videos-pagination',
                    clickable: true,
                },
                breakpoints: {
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 24,
                    }
                }
            });
        }
    }));

    // 5. Hero Component (index.html)
    Alpine.data('heroApp', () => ({
        counter: '0+',
        lyrics: [],
        currentIndex: 0,
        isPlaying: false,
        timer: null,

        async init() {
            this.initCounter();
            try {
                const res = await fetch('data/mars.json');
                this.lyrics = await res.json();
                setTimeout(() => {
                    this.startSinging();
                }, 2000);
            } catch (err) {
                console.error('Failed to load mars lyrics:', err);
            } finally {
                hidePreloader();
            }
        },

        initCounter() {
            const start = new Date(2007, 0, 18);
            const now = new Date();
            const totalWeeks = Math.floor((now - start) / (7 * 24 * 60 * 60 * 1000));
            const duration = 2000;
            const startTime = performance.now();

            const step = (timestamp) => {
                const progress = Math.min((timestamp - startTime) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(eased * totalWeeks);
                this.counter = current.toLocaleString('id-ID') + '+';
                if (progress < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
        },

        toggleSinging() {
            if (this.isPlaying) {
                this.stopSinging();
            } else {
                this.startSinging();
            }
        },

        startSinging() {
            if (this.isPlaying || !this.lyrics.length) return;
            this.isPlaying = true;
            this.showNextLyric();
        },

        stopSinging() {
            this.isPlaying = false;
            if (this.timer) clearTimeout(this.timer);
            const emblem = document.getElementById('hero-umbrella-emblem');
            if (emblem) emblem.classList.remove('singing');
            const chatContainer = document.getElementById('lyric-chat-container');
            if (chatContainer) {
                const existing = chatContainer.querySelectorAll('.lyric-bubble');
                existing.forEach(b => {
                    b.classList.remove('active');
                    b.classList.add('exiting');
                    setTimeout(() => b.remove(), 350);
                });
            }
        },

        showNextLyric() {
            if (!this.isPlaying || !this.lyrics.length) return;

            const emblem = document.getElementById('hero-umbrella-emblem');
            if (emblem && !emblem.classList.contains('singing')) {
                emblem.classList.add('singing');
            }

            const chatContainer = document.getElementById('lyric-chat-container');
            if (chatContainer) {
                const existing = chatContainer.querySelectorAll('.lyric-bubble');
                existing.forEach(b => {
                    b.classList.remove('active');
                    b.classList.add('exiting');
                    setTimeout(() => b.remove(), 350);
                });

                const item = this.lyrics[this.currentIndex];
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
            }

            const currentItem = this.lyrics[this.currentIndex];
            const nextItem = this.lyrics[(this.currentIndex + 1) % this.lyrics.length];
            const diffSec = (this.currentIndex === this.lyrics.length - 1) ? 5 : (nextItem.timeSec - currentItem.timeSec);
            const duration = Math.max(diffSec * 1000, 1200);

            this.currentIndex = (this.currentIndex + 1) % this.lyrics.length;
            this.timer = setTimeout(() => this.showNextLyric(), duration);
        }
    }));

    // 6. Statistics Component
    Alpine.data('statsApp', () => ({
        data: null,
        stats: [],
        durationYears: '',
        loading: true,

        async init() {
            try {
                const res = await fetch('data/statistics.json');
                this.data = await res.json();
                
                // Compute dynamic duration from startDate to current year
                if (this.data && this.data.startDate) {
                    const startYear = new Date(this.data.startDate).getFullYear();
                    const currentYear = new Date().getFullYear();
                    const diff = Math.max(0, currentYear - startYear);
                    this.durationYears = `${diff}+ Tahun`;

                    if (this.data.stats) {
                        const movement = this.data.stats.find(s => s.dynamicKey === 'durationYears' || s.label === 'PERJALANAN GERAKAN');
                        if (movement) movement.value = this.durationYears;
                    }
                }

                this.stats = this.data.stats || [];
            } catch (err) {
                console.error('Failed to load statistics:', err);
            } finally {
                this.loading = false;
                hidePreloader();
            }
        }
    }));
});

// Navigation & Helper Functions
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    if (menu) menu.classList.toggle('hidden');
}

function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
}

function legacyCopy(text, msg) {
    const ta = document.createElement('textarea');
    ta.value = text.trim();
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showCopyToast(msg);
}

function showCopyToast(msg = 'Teks berhasil disalin!') {
    let toast = document.getElementById('copy-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'copy-toast';
        toast.className = 'fixed bottom-16 sm:bottom-6 left-1/2 -translate-x-1/2 bg-white text-black font-mono text-xs px-5 py-3 z-50 transition-opacity duration-300';
        document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.opacity = '1';
    setTimeout(() => { toast.style.opacity = '0'; }, 2500);
}

function htmlToMarkdown(html) {
    if (!html) return '';
    let md = html;
    md = md.replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, (m, p1) => {
        const clean = p1.replace(/<[^>]*>/g, '').trim();
        return `\n> ${clean}\n\n`;
    });
    md = md.replace(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi, (m, level, p1) => {
        const hashes = '#'.repeat(parseInt(level));
        const clean = p1.replace(/<[^>]*>/g, '').trim();
        return `\n\n${hashes} ${clean}\n\n`;
    });
    md = md.replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, (m, p1) => {
        let index = 1;
        const lis = p1.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (lm, lp) => {
            return `${index++}. ${lp.trim()}\n`;
        });
        return `\n${lis}\n`;
    });
    md = md.replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, (m, p1) => {
        const lis = p1.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (lm, lp) => {
            return `- ${lp.trim()}\n`;
        });
        return `\n${lis}\n`;
    });
    md = md.replace(/<(strong|b)[^>]*>([\s\S]*?)<\/\1>/gi, '**$2**');
    md = md.replace(/<(em|i)[^>]*>([\s\S]*?)<\/\1>/gi, '*$2*');
    md = md.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '$1\n\n');
    md = md.replace(/<[^>]*>/g, '');
    md = md.replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ');
    return md.replace(/\n{3,}/g, '\n\n').trim();
}

async function triggerFileDownload(url, filename) {
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error('Fetch failed');
        const blob = await res.blob();
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
    } catch (e) {
        const a = document.createElement('a');
        a.href = url;
        a.target = '_blank';
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
}

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

document.addEventListener('DOMContentLoaded', () => {
    if (typeof AOS !== 'undefined') {
        AOS.init({ once: true, offset: 60, easing: 'ease-out-cubic', duration: 700 });
    }
    initHeroRain();
});

function hidePreloader() {
    const preloader = document.getElementById('site-preloader');
    if (!preloader || preloader.classList.contains('preloader-hidden')) return;
    preloader.classList.add('preloader-hidden');
    setTimeout(() => {
        if (preloader.parentNode) preloader.parentNode.removeChild(preloader);
    }, 500);
}

window.addEventListener('load', () => {
    // If no dynamic Alpine components active, hide preloader fallback after window load
    setTimeout(hidePreloader, 300);
});

// ── Font Size Scaling Controls ──
const FONT_SCALES = [100, 110, 120, 130, 140];
let currentFontScaleIndex = parseInt(localStorage.getItem('fontScaleIndex') || '0', 10);
if (isNaN(currentFontScaleIndex) || currentFontScaleIndex < 0 || currentFontScaleIndex >= FONT_SCALES.length) {
    currentFontScaleIndex = 0;
}

function applyFontScale(index) {
    currentFontScaleIndex = index;
    localStorage.setItem('fontScaleIndex', currentFontScaleIndex.toString());
    const scale = FONT_SCALES[currentFontScaleIndex];
    document.documentElement.style.fontSize = scale === 100 ? '' : `${scale}%`;

    const fontDisplay = document.getElementById('font-scale-display');
    if (fontDisplay) {
        fontDisplay.textContent = `${scale}%`;
    }
    const decBtn = document.getElementById('font-scale-dec');
    const incBtn = document.getElementById('font-scale-inc');
    if (decBtn) decBtn.disabled = currentFontScaleIndex === 0;
    if (incBtn) incBtn.disabled = currentFontScaleIndex === FONT_SCALES.length - 1;
}

function changeFontScale(delta) {
    const newIndex = Math.max(0, Math.min(FONT_SCALES.length - 1, currentFontScaleIndex + delta));
    applyFontScale(newIndex);
}

function resetFontScale() {
    applyFontScale(0);
}

// Immediate initial application
applyFontScale(currentFontScaleIndex);

document.addEventListener('DOMContentLoaded', () => {
    applyFontScale(currentFontScaleIndex);
});
