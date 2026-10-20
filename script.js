/* ===== EDIT HERE =====
   Keep this file, index.html and your photos (1.jpg ... 12.jpg)
   in the SAME folder. Change file names/titles below if needed. */
const PHOTOS = [
  { file: "1.jpg",  title: "Spacious Hall" },
  { file: "2.jpg",  title: "Hall with Wash Basin" },
  { file: "3.jpg",  title: "Wash Basin & Mirror" },
  { file: "4.jpg",  title: "Kitchen" },
  { file: "5.jpg",  title: "Bedroom with Cupboards" },
  { file: "6.jpg",  title: "Entrance / Courtyard" },
  { file: "7.jpg",  title: "Windows & Door" },
  { file: "8.jpg",  title: "Bedroom 2 with Wardrobe" },
  { file: "9.jpg",  title: "Bathroom 1" },
  { file: "10.jpg", title: "Side Passage" },
  { file: "11.jpg", title: "Bathroom 2" },
  { file: "12.jpg", title: "Puja Ghar" }
];

/* Gallery */
const g = document.getElementById("gallery");
PHOTOS.forEach((p, i) => {
  const d = document.createElement("div");
  d.className = "g-item rv";
  d.tabIndex = 0;
  d.style.setProperty("--d", (i % 4) * 0.08 + "s");
  d.innerHTML = `<img src="${p.file}" alt="${p.title}" loading="lazy"><div class="cap">${p.title}</div>`;
  d.onclick = () => openLb(i);
  d.onkeydown = e => { if (e.key === "Enter") openLb(i); };
  d.querySelector("img").onerror = function () { d.style.display = "none"; };
  g.appendChild(d);
});
document.getElementById("heroBg").style.backgroundImage = `url('${PHOTOS[0].file}')`;
document.getElementById("yr").textContent = new Date().getFullYear();

/* Scrolling strip */
const tags = ["South Facing", "2 BHK", "2 Bathrooms", "Puja Ghar", "Marble Flooring", "Built-in Wardrobes", "No Broker", "Banjarawala, Dehradun"];
const row = tags.map(t => `<span>☀ ${t}</span>`).join("");
document.getElementById("mq").innerHTML = row + row + row + row;

/* Scroll reveal */
const io = new IntersectionObserver(es => {
  es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll(".rv").forEach(el => io.observe(el));

/* Count-up for the quick facts */
document.querySelectorAll("[data-count]").forEach(el => {
  const end = +el.dataset.count;
  const co = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting) return;
    co.disconnect();
    let n = 0;
    const t = setInterval(() => { n++; el.textContent = n; if (n >= end) clearInterval(t); }, 260);
    el.textContent = 0;
  });
  co.observe(el);
});

/* Hero parallax */
const bg = document.getElementById("heroBg");
addEventListener("scroll", () => { bg.style.marginTop = Math.min(scrollY * 0.25, 120) + "px"; }, { passive: true });

/* Lightbox */
const lb = document.getElementById("lb"), lbImg = document.getElementById("lbImg"), lbCap = document.getElementById("lbCap");
let cur = 0;
function show() {
  lbImg.style.opacity = 0;
  lbImg.onload = () => { lbImg.style.transition = "opacity .3s"; lbImg.style.opacity = 1; };
  lbImg.src = PHOTOS[cur].file;
  lbImg.alt = PHOTOS[cur].title;
  lbCap.textContent = `${PHOTOS[cur].title}  (${cur + 1}/${PHOTOS.length})`;
}
function openLb(i) { cur = i; show(); lb.classList.add("open"); document.body.style.overflow = "hidden"; }
function closeLb() { lb.classList.remove("open"); document.body.style.overflow = ""; }
function move(s) { cur = (cur + s + PHOTOS.length) % PHOTOS.length; show(); }
document.getElementById("lbX").onclick = closeLb;
document.getElementById("lbP").onclick = () => move(-1);
document.getElementById("lbN").onclick = () => move(1);
lb.onclick = e => { if (e.target === lb) closeLb(); };
document.addEventListener("keydown", e => {
  if (!lb.classList.contains("open")) return;
  if (e.key === "Escape") closeLb();
  if (e.key === "ArrowLeft") move(-1);
  if (e.key === "ArrowRight") move(1);
});
let sx = 0;
lb.addEventListener("touchstart", e => sx = e.touches[0].clientX, { passive: true });
lb.addEventListener("touchend", e => { const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 50) move(dx < 0 ? 1 : -1); });
