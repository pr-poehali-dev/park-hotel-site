import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/33639e0c-8956-4064-ad39-265eb1350f03/files/728f2da9-0d39-4e9e-891d-c87f3eaa68d5.jpg";
const ROOM_IMG = "https://cdn.poehali.dev/projects/33639e0c-8956-4064-ad39-265eb1350f03/files/f75e4517-3a25-4cbf-8244-74eb6477bb1c.jpg";
const SPA_IMG = "https://cdn.poehali.dev/projects/33639e0c-8956-4064-ad39-265eb1350f03/files/6c9825ac-40a7-4d14-9173-156c3e098c15.jpg";

const rooms = [
  {
    name: "Лесной домик",
    size: "32 м²",
    guests: "2 гостя",
    price: "6 900",
    desc: "Уютный домик с панорамным окном на сосновый лес, камином и деревянным декором.",
    img: ROOM_IMG,
    features: ["Камин", "Вид на лес", "Завтрак включён"],
  },
  {
    name: "Семейный коттедж",
    size: "58 м²",
    guests: "4 гостя",
    price: "12 400",
    desc: "Просторный коттедж с двумя спальнями, гостиной и террасой, выходящей прямо в лес.",
    img: HERO_IMG,
    features: ["Терраса", "Две спальни", "Барбекю"],
  },
  {
    name: "Спа-люкс",
    size: "48 м²",
    guests: "2 гостя",
    price: "14 800",
    desc: "Люкс с собственным горячим бассейном на открытой террасе среди деревьев.",
    img: SPA_IMG,
    features: ["Горячий бассейн", "Спа-процедуры", "Баттлер"],
  },
];

const services = [
  { icon: "Leaf", title: "СПА и баня", desc: "Фитобаня на берёзовых вениках, термальный бассейн, массаж с натуральными маслами" },
  { icon: "UtensilsCrossed", title: "Ресторан", desc: "Кухня из местных продуктов, грибы и ягоды из леса, фермерское мясо" },
  { icon: "TreePine", title: "Эко-экскурсии", desc: "Пешие маршруты, наблюдение за птицами, ночные прогулки с гидом" },
  { icon: "Wind", title: "Медитация в лесу", desc: "Утренние практики осознанности, дыхательные сессии, йога на природе" },
  { icon: "Bike", title: "Активный отдых", desc: "Велосипеды, каяки, рыбалка, скандинавская ходьба" },
  { icon: "Baby", title: "Детская программа", desc: "Изучение природы, лесные мастер-классы, безопасные тропы для детей" },
];

const gallery = [HERO_IMG, ROOM_IMG, SPA_IMG, HERO_IMG, SPA_IMG, ROOM_IMG];

function useScrollFade(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function FadeSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useScrollFade();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </div>
  );
}

export default function Index() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [bookingForm, setBookingForm] = useState({
    checkin: "", checkout: "", guests: "2", room: "", name: "", wishes: "",
  });
  const [bookingStatus, setBookingStatus] = useState<null | "loading" | "success">(null);
  const [galleryOpen, setGalleryOpen] = useState<number | null>(null);

  const navLinks = [
    { id: "rooms", label: "Номера" },
    { id: "services", label: "Услуги" },
    { id: "gallery", label: "Галерея" },
    { id: "booking", label: "Бронирование" },
    { id: "contacts", label: "Контакты" },
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "rooms", "services", "gallery", "booking", "contacts"];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingStatus("loading");
    setTimeout(() => setBookingStatus("success"), 1800);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "hsl(var(--cream))", color: "hsl(var(--bark))" }}>

      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{ backgroundColor: "rgba(245,239,228,0.93)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(107,90,60,0.15)" }}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          <button onClick={() => scrollTo("hero")} className="flex items-center gap-2">
            <span className="text-2xl">🌿</span>
            <span className="font-display text-xl font-semibold tracking-wide" style={{ color: "hsl(var(--forest))" }}>
              Лесная Усадьба
            </span>
          </button>

          <div className="hidden md:flex items-center gap-7">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="font-body text-sm tracking-wide transition-colors"
                style={{
                  color: activeSection === link.id ? "hsl(var(--forest))" : "hsl(var(--earth))",
                  fontWeight: activeSection === link.id ? 600 : 400
                }}
              >
                {link.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => scrollTo("booking")}
            className="hidden md:block text-sm px-5 py-2 rounded transition-all hover:opacity-90 active:scale-95"
            style={{ backgroundColor: "hsl(var(--forest))", color: "hsl(var(--cream))", fontFamily: "'Golos Text', sans-serif" }}
          >
            Забронировать
          </button>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2" style={{ color: "hsl(var(--forest))" }}>
            <Icon name={mobileOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden px-6 pb-4 flex flex-col gap-4" style={{ backgroundColor: "hsl(var(--cream))" }}>
            {navLinks.map(link => (
              <button key={link.id} onClick={() => scrollTo(link.id)} className="text-left font-body text-base" style={{ color: "hsl(var(--earth))" }}>
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("booking")}
              className="text-sm px-5 py-2.5 rounded w-full"
              style={{ backgroundColor: "hsl(var(--forest))", color: "hsl(var(--cream))" }}
            >
              Забронировать
            </button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" className="relative h-screen min-h-[600px] flex items-end overflow-hidden">
        <img
          src={HERO_IMG}
          alt="Лесная Усадьба"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, rgba(18,28,15,0.88) 0%, rgba(18,28,15,0.35) 55%, rgba(18,28,15,0.08) 100%)"
          }}
        />
        <div className="relative z-10 max-w-6xl mx-auto px-6 pb-20 w-full">
          <div className="max-w-2xl">
            <p
              className="font-body text-sm tracking-[0.25em] uppercase mb-4 opacity-0 animate-slide-up"
              style={{ color: "hsl(var(--earth-light))", animationFillMode: "forwards", animationDelay: "0.1s" }}
            >
              Парк-отель · Природный отдых
            </p>
            <h1
              className="font-display text-5xl md:text-7xl font-light leading-none mb-6 opacity-0 animate-slide-up"
              style={{ color: "#f5efe4", animationFillMode: "forwards", animationDelay: "0.25s" }}
            >
              Там, где лес<br /><em>дышит</em> покоем
            </h1>
            <p
              className="font-body text-base md:text-lg leading-relaxed mb-10 opacity-0 animate-slide-up"
              style={{ color: "rgba(245,239,228,0.78)", animationFillMode: "forwards", animationDelay: "0.4s" }}
            >
              Экологичные домики и коттеджи в вековом лесу, спа с природными материалами и кухня из местных продуктов — всё это в 2 часах от города.
            </p>
            <div className="flex flex-wrap gap-4 opacity-0 animate-slide-up" style={{ animationFillMode: "forwards", animationDelay: "0.55s" }}>
              <button
                onClick={() => scrollTo("booking")}
                className="px-8 py-3.5 rounded text-sm tracking-wide transition-all hover:opacity-90 active:scale-95"
                style={{ backgroundColor: "hsl(var(--earth-mid))", color: "#f5efe4", fontFamily: "'Golos Text', sans-serif" }}
              >
                Забронировать номер
              </button>
              <button
                onClick={() => scrollTo("rooms")}
                className="px-8 py-3.5 rounded text-sm tracking-wide border transition-all hover:bg-white/10"
                style={{ borderColor: "rgba(245,239,228,0.45)", color: "#f5efe4", fontFamily: "'Golos Text', sans-serif" }}
              >
                Посмотреть номера
              </button>
            </div>
          </div>

          <div className="mt-16 flex flex-wrap gap-10">
            {[
              { num: "12", label: "домиков и коттеджей" },
              { num: "5 га", label: "природного парка" },
              { num: "∞", label: "тишины и покоя" },
            ].map(s => (
              <div key={s.label}>
                <div className="font-display text-3xl font-semibold" style={{ color: "hsl(var(--earth-light))" }}>{s.num}</div>
                <div className="font-body text-xs tracking-wide" style={{ color: "rgba(245,239,228,0.55)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-8 right-8 flex flex-col items-center animate-bounce opacity-50">
          <Icon name="ChevronDown" size={20} style={{ color: "#f5efe4" }} />
        </div>
      </section>

      {/* ROOMS */}
      <section id="rooms" className="py-24 px-6" style={{ backgroundColor: "hsl(var(--cream))" }}>
        <div className="max-w-6xl mx-auto">
          <FadeSection>
            <div className="text-center mb-16">
              <p className="font-body text-xs tracking-[0.3em] uppercase mb-3" style={{ color: "hsl(var(--earth-mid))" }}>Проживание</p>
              <h2 className="font-display text-4xl md:text-5xl font-light" style={{ color: "hsl(var(--bark))" }}>Номера и коттеджи</h2>
              <div className="w-16 h-px mx-auto mt-6" style={{ backgroundColor: "hsl(var(--earth-mid))" }} />
            </div>
          </FadeSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {rooms.map((room, i) => (
              <FadeSection key={room.name}>
                <div
                  className="rounded overflow-hidden flex flex-col group"
                  style={{
                    backgroundColor: "hsl(var(--cream-dark))",
                    border: "1px solid hsl(var(--border))",
                    transitionDelay: `${i * 100}ms`
                  }}
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={room.img}
                      alt={room.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div
                      className="absolute top-3 right-3 text-xs px-3 py-1 rounded-full font-body"
                      style={{ backgroundColor: "hsl(var(--forest))", color: "hsl(var(--cream))" }}
                    >
                      от {room.price} ₽/ночь
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-display text-2xl font-medium mb-2" style={{ color: "hsl(var(--bark))" }}>{room.name}</h3>
                    <div className="flex gap-4 mb-3 font-body text-xs" style={{ color: "hsl(var(--earth-mid))" }}>
                      <span className="flex items-center gap-1"><Icon name="Maximize2" size={12} />{room.size}</span>
                      <span className="flex items-center gap-1"><Icon name="Users" size={12} />{room.guests}</span>
                    </div>
                    <p className="font-body text-sm leading-relaxed mb-5 flex-1" style={{ color: "hsl(var(--muted-foreground))" }}>
                      {room.desc}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {room.features.map(f => (
                        <span key={f} className="text-xs px-2.5 py-1 rounded-full font-body"
                          style={{ backgroundColor: "hsl(var(--secondary))", color: "hsl(var(--earth))" }}>
                          {f}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() => { setBookingForm(b => ({ ...b, room: room.name })); scrollTo("booking"); }}
                      className="w-full py-2.5 rounded text-sm tracking-wide transition-all hover:opacity-90"
                      style={{ backgroundColor: "hsl(var(--forest))", color: "hsl(var(--cream))", fontFamily: "'Golos Text', sans-serif" }}
                    >
                      Выбрать номер
                    </button>
                  </div>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 px-6 relative overflow-hidden" style={{ backgroundColor: "hsl(var(--forest))" }}>
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 4 Q56 20 40 36 Q24 20 40 4Z' fill='%23f5efe4'/%3E%3Cpath d='M40 44 Q56 60 40 76 Q24 60 40 44Z' fill='%23f5efe4'/%3E%3C/svg%3E")`,
            backgroundSize: "80px 80px"
          }}
        />
        <div className="max-w-6xl mx-auto relative z-10">
          <FadeSection>
            <div className="text-center mb-16">
              <p className="font-body text-xs tracking-[0.3em] uppercase mb-3" style={{ color: "hsl(var(--earth-light))" }}>Что мы предлагаем</p>
              <h2 className="font-display text-4xl md:text-5xl font-light" style={{ color: "hsl(var(--cream))" }}>Услуги и активности</h2>
              <div className="w-16 h-px mx-auto mt-6" style={{ backgroundColor: "hsl(var(--earth-light))" }} />
            </div>
          </FadeSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s) => (
              <FadeSection key={s.title}>
                <div
                  className="p-7 rounded transition-all duration-300 hover:-translate-y-1"
                  style={{
                    backgroundColor: "rgba(245,239,228,0.07)",
                    border: "1px solid rgba(245,239,228,0.13)"
                  }}
                >
                  <div className="w-10 h-10 rounded flex items-center justify-center mb-4"
                    style={{ backgroundColor: "rgba(200,160,80,0.2)" }}>
                    <Icon name={s.icon} size={20} style={{ color: "hsl(var(--earth-light))" }} />
                  </div>
                  <h3 className="font-display text-xl mb-2" style={{ color: "hsl(var(--cream))" }}>{s.title}</h3>
                  <p className="font-body text-sm leading-relaxed" style={{ color: "rgba(245,239,228,0.6)" }}>{s.desc}</p>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-24 px-6" style={{ backgroundColor: "hsl(var(--cream-dark))" }}>
        <div className="max-w-6xl mx-auto">
          <FadeSection>
            <div className="text-center mb-16">
              <p className="font-body text-xs tracking-[0.3em] uppercase mb-3" style={{ color: "hsl(var(--earth-mid))" }}>Атмосфера</p>
              <h2 className="font-display text-4xl md:text-5xl font-light" style={{ color: "hsl(var(--bark))" }}>Галерея</h2>
              <div className="w-16 h-px mx-auto mt-6" style={{ backgroundColor: "hsl(var(--earth-mid))" }} />
            </div>
          </FadeSection>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {gallery.map((img, i) => (
              <FadeSection key={i}>
                <div
                  className={`overflow-hidden rounded cursor-pointer group relative ${i === 0 ? "row-span-2" : ""}`}
                  onClick={() => setGalleryOpen(i)}
                  style={{ aspectRatio: i === 0 ? "3/4" : "4/3" }}
                >
                  <img
                    src={img}
                    alt={`Фото ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ backgroundColor: "rgba(18,28,15,0.35)" }}>
                    <Icon name="ZoomIn" size={28} style={{ color: "#f5efe4" }} />
                  </div>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>

        {galleryOpen !== null && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(18,28,15,0.96)" }}
            onClick={() => setGalleryOpen(null)}
          >
            <button className="absolute top-6 right-6 hover:opacity-70 transition-opacity" onClick={() => setGalleryOpen(null)}>
              <Icon name="X" size={28} style={{ color: "#f5efe4" }} />
            </button>
            <img
              src={gallery[galleryOpen]}
              alt="Полный размер"
              className="max-w-full max-h-[88vh] rounded object-contain"
              onClick={e => e.stopPropagation()}
            />
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 hover:opacity-70 transition-opacity"
              onClick={e => { e.stopPropagation(); setGalleryOpen((galleryOpen - 1 + gallery.length) % gallery.length); }}
            >
              <Icon name="ChevronLeft" size={36} style={{ color: "#f5efe4" }} />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 hover:opacity-70 transition-opacity"
              onClick={e => { e.stopPropagation(); setGalleryOpen((galleryOpen + 1) % gallery.length); }}
            >
              <Icon name="ChevronRight" size={36} style={{ color: "#f5efe4" }} />
            </button>
          </div>
        )}
      </section>

      {/* BOOKING */}
      <section id="booking" className="py-24 px-6" style={{ backgroundColor: "hsl(var(--cream))" }}>
        <div className="max-w-3xl mx-auto">
          <FadeSection>
            <div className="text-center mb-12">
              <p className="font-body text-xs tracking-[0.3em] uppercase mb-3" style={{ color: "hsl(var(--earth-mid))" }}>Онлайн-бронирование</p>
              <h2 className="font-display text-4xl md:text-5xl font-light" style={{ color: "hsl(var(--bark))" }}>Забронировать номер</h2>
              <div className="w-16 h-px mx-auto mt-6" style={{ backgroundColor: "hsl(var(--earth-mid))" }} />
              <p className="font-body text-sm mt-5" style={{ color: "hsl(var(--muted-foreground))" }}>
                Заполните форму — мы проверим доступность и подтвердим бронирование в течение часа
              </p>
            </div>
          </FadeSection>

          <FadeSection>
            <form
              onSubmit={handleBooking}
              className="rounded-lg p-8 md:p-10"
              style={{ backgroundColor: "hsl(var(--cream-dark))", border: "1px solid hsl(var(--border))" }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {[
                  { label: "Дата заезда", type: "date", key: "checkin" as const },
                  { label: "Дата выезда", type: "date", key: "checkout" as const },
                ].map(field => (
                  <div key={field.key}>
                    <label className="block font-body text-xs tracking-wide uppercase mb-2" style={{ color: "hsl(var(--earth))" }}>
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      required
                      value={bookingForm[field.key]}
                      onChange={e => setBookingForm(b => ({ ...b, [field.key]: e.target.value }))}
                      className="w-full px-4 py-3 rounded font-body text-sm outline-none"
                      style={{ backgroundColor: "hsl(var(--cream))", border: "1px solid hsl(var(--border))", color: "hsl(var(--bark))" }}
                    />
                  </div>
                ))}

                <div>
                  <label className="block font-body text-xs tracking-wide uppercase mb-2" style={{ color: "hsl(var(--earth))" }}>
                    Количество гостей
                  </label>
                  <select
                    value={bookingForm.guests}
                    onChange={e => setBookingForm(b => ({ ...b, guests: e.target.value }))}
                    className="w-full px-4 py-3 rounded font-body text-sm outline-none"
                    style={{ backgroundColor: "hsl(var(--cream))", border: "1px solid hsl(var(--border))", color: "hsl(var(--bark))" }}
                  >
                    {[1, 2, 3, 4, 5, 6].map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? "гость" : n < 5 ? "гостя" : "гостей"}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-body text-xs tracking-wide uppercase mb-2" style={{ color: "hsl(var(--earth))" }}>
                    Тип размещения
                  </label>
                  <select
                    value={bookingForm.room}
                    onChange={e => setBookingForm(b => ({ ...b, room: e.target.value }))}
                    className="w-full px-4 py-3 rounded font-body text-sm outline-none"
                    style={{ backgroundColor: "hsl(var(--cream))", border: "1px solid hsl(var(--border))", color: "hsl(var(--bark))" }}
                  >
                    <option value="">Выберите тип</option>
                    {rooms.map(r => (
                      <option key={r.name} value={r.name}>{r.name} — от {r.price} ₽/ночь</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label className="block font-body text-xs tracking-wide uppercase mb-2" style={{ color: "hsl(var(--earth))" }}>
                  Ваше имя и телефон
                </label>
                <input
                  type="text"
                  required
                  placeholder="Иван Петров, +7 900 123 45 67"
                  value={bookingForm.name}
                  onChange={e => setBookingForm(b => ({ ...b, name: e.target.value }))}
                  className="w-full px-4 py-3 rounded font-body text-sm outline-none"
                  style={{ backgroundColor: "hsl(var(--cream))", border: "1px solid hsl(var(--border))", color: "hsl(var(--bark))" }}
                />
              </div>

              <div className="mb-8">
                <label className="block font-body text-xs tracking-wide uppercase mb-2" style={{ color: "hsl(var(--earth))" }}>
                  Пожелания (необязательно)
                </label>
                <textarea
                  rows={3}
                  placeholder="Особые пожелания, аллергии, торжества..."
                  value={bookingForm.wishes}
                  onChange={e => setBookingForm(b => ({ ...b, wishes: e.target.value }))}
                  className="w-full px-4 py-3 rounded font-body text-sm outline-none resize-none"
                  style={{ backgroundColor: "hsl(var(--cream))", border: "1px solid hsl(var(--border))", color: "hsl(var(--bark))" }}
                />
              </div>

              {bookingStatus === "success" ? (
                <div className="text-center py-5 rounded" style={{ backgroundColor: "rgba(60,90,40,0.1)", border: "1px solid rgba(60,90,40,0.25)" }}>
                  <p className="font-display text-2xl mb-1" style={{ color: "hsl(var(--forest))" }}>Заявка отправлена! 🌿</p>
                  <p className="font-body text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>Мы свяжемся с вами в течение часа для подтверждения</p>
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={bookingStatus === "loading"}
                  className="w-full py-4 rounded font-body text-sm tracking-wide transition-all hover:opacity-90 active:scale-[0.99]"
                  style={{ backgroundColor: "hsl(var(--forest))", color: "hsl(var(--cream))" }}
                >
                  {bookingStatus === "loading" ? "Проверяем доступность..." : "Отправить заявку на бронирование"}
                </button>
              )}
            </form>
          </FadeSection>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 px-6" style={{ backgroundColor: "hsl(var(--bark))" }}>
        <div className="max-w-6xl mx-auto">
          <FadeSection>
            <div className="text-center mb-16">
              <p className="font-body text-xs tracking-[0.3em] uppercase mb-3" style={{ color: "hsl(var(--earth-light))" }}>Как нас найти</p>
              <h2 className="font-display text-4xl md:text-5xl font-light" style={{ color: "hsl(var(--cream))" }}>Контакты</h2>
              <div className="w-16 h-px mx-auto mt-6" style={{ backgroundColor: "hsl(var(--earth-light))" }} />
            </div>
          </FadeSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
            {[
              { icon: "MapPin", title: "Адрес", lines: ["Московская обл., Дмитровский р-н", "д. Лесное, ул. Заповедная, 1"] },
              { icon: "Phone", title: "Телефон", lines: ["+7 (495) 123-45-67", "Ежедневно 8:00 — 22:00"] },
              { icon: "Mail", title: "Email", lines: ["info@lesnaya-usadba.ru", "Ответим в течение часа"] },
            ].map(c => (
              <FadeSection key={c.title}>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: "rgba(200,160,80,0.2)" }}>
                    <Icon name={c.icon} size={20} style={{ color: "hsl(var(--earth-light))" }} />
                  </div>
                  <h3 className="font-display text-lg mb-2" style={{ color: "hsl(var(--cream))" }}>{c.title}</h3>
                  {c.lines.map(l => (
                    <p key={l} className="font-body text-sm" style={{ color: "rgba(245,239,228,0.55)" }}>{l}</p>
                  ))}
                </div>
              </FadeSection>
            ))}
          </div>

          <FadeSection>
            <div
              className="w-full h-64 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "rgba(60,90,40,0.4)", border: "1px solid rgba(200,160,80,0.2)" }}
            >
              <div className="text-center">
                <Icon name="Map" size={40} style={{ color: "hsl(var(--earth-light))", display: "block", margin: "0 auto 12px" }} />
                <p className="font-display text-xl" style={{ color: "hsl(var(--cream))" }}>Карта проезда</p>
                <p className="font-body text-sm mt-2" style={{ color: "rgba(245,239,228,0.45)" }}>2 часа от Москвы по Дмитровскому шоссе</p>
              </div>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-6 py-8" style={{ backgroundColor: "hsl(var(--bark))", borderTop: "1px solid rgba(245,239,228,0.08)" }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🌿</span>
            <span className="font-display text-lg" style={{ color: "hsl(var(--cream))" }}>Лесная Усадьба</span>
          </div>
          <p className="font-body text-xs" style={{ color: "rgba(245,239,228,0.35)" }}>
            © 2024 Парк-отель Лесная Усадьба. Все права защищены.
          </p>
          <div className="flex gap-5">
            {navLinks.map(l => (
              <button key={l.id} onClick={() => scrollTo(l.id)}
                className="font-body text-xs hover:opacity-70 transition-opacity"
                style={{ color: "rgba(245,239,228,0.45)" }}>
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
