export function RusticGarden() {
  const featured = [
    { name: "Coconut Chocolate Chip Cookies", price: 450, tag: "Bestseller", img: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&q=80" },
    { name: "Coconut Vanilla Birthday Cake", price: 2800, tag: "Featured", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80" },
    { name: "Coconut Macaroons", price: 600, tag: "New", img: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80" },
  ];

  return (
    <div style={{ fontFamily: "'Georgia', serif", background: "#f5f0e8", minHeight: "100vh", color: "#3a2e22" }}>
      {/* Nav */}
      <nav style={{ background: "#e8e0d0", borderBottom: "1px solid #c9b99a", padding: "0 40px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 22, color: "#7a9a6a" }}>✿</span>
          <span style={{ fontSize: 20, fontWeight: 700, letterSpacing: 1, color: "#3a2e22" }}>Rabina's Bakery</span>
        </div>
        <div style={{ display: "flex", gap: 32, fontSize: 14, color: "#6b5744" }}>
          {["Home", "Menu", "Our Story"].map(l => <span key={l} style={{ cursor: "pointer", letterSpacing: 1 }}>{l}</span>)}
        </div>
        <div style={{ background: "#7a9a6a", color: "#fff", borderRadius: 20, padding: "8px 20px", fontSize: 13, cursor: "pointer" }}>View Cart</div>
      </nav>

      {/* Hero */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        <div style={{ background: "linear-gradient(135deg, #c8d8b0 0%, #e8d5b0 50%, #f0c8a8 100%)", padding: "80px 60px 60px", display: "flex", alignItems: "center", gap: 60 }}>
          {/* Botanical decorations */}
          <div style={{ position: "absolute", top: 0, right: 0, fontSize: 120, opacity: 0.12, lineHeight: 1, userSelect: "none" }}>🌿</div>
          <div style={{ position: "absolute", bottom: -10, left: 20, fontSize: 80, opacity: 0.10, lineHeight: 1, userSelect: "none" }}>🌸</div>

          <div style={{ flex: 1, position: "relative", zIndex: 1 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fff8f0", border: "1px solid #c9b99a", borderRadius: 20, padding: "6px 16px", fontSize: 12, color: "#8b6a50", marginBottom: 20, letterSpacing: 1.5 }}>
              <span style={{ color: "#7a9a6a" }}>✿</span> HANDCRAFTED WITH COCONUT OIL
            </div>
            <h1 style={{ fontSize: 52, lineHeight: 1.15, fontWeight: 700, margin: "0 0 20px", color: "#2d2218" }}>
              From our kitchen,<br />
              <em style={{ color: "#7a9a6a", fontStyle: "italic" }}>with love.</em>
            </h1>
            <p style={{ fontSize: 16, color: "#6b5744", lineHeight: 1.7, maxWidth: 420, marginBottom: 36 }}>
              Every cookie and cake is baked in small batches using virgin coconut oil. No shortcuts, no preservatives — just wholesome goodness.
            </p>
            <div style={{ display: "flex", gap: 16 }}>
              <button style={{ background: "#7a9a6a", color: "#fff", border: "none", borderRadius: 28, padding: "14px 32px", fontSize: 15, cursor: "pointer", fontFamily: "Georgia, serif", letterSpacing: 0.5 }}>Browse the Menu</button>
              <button style={{ background: "transparent", color: "#6b5744", border: "1.5px solid #b8a88a", borderRadius: 28, padding: "14px 28px", fontSize: 15, cursor: "pointer", fontFamily: "Georgia, serif" }}>Our Story</button>
            </div>
          </div>

          <div style={{ flex: "0 0 340px", borderRadius: 24, overflow: "hidden", boxShadow: "0 16px 48px rgba(60,40,20,0.18)", border: "4px solid #fff" }}>
            <img src="https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&q=80" alt="cookies" style={{ width: "100%", height: 280, objectFit: "cover", display: "block" }} />
          </div>
        </div>
      </div>

      {/* Trust bar */}
      <div style={{ background: "#7a9a6a", color: "#fff", padding: "14px 40px", display: "flex", justifyContent: "center", gap: 60, fontSize: 13, letterSpacing: 0.5 }}>
        {["✿ No Artificial Additives", "✿ Virgin Coconut Oil", "✿ Baked Fresh Daily", "✿ Made in Small Batches"].map(t => <span key={t}>{t}</span>)}
      </div>

      {/* Featured */}
      <div style={{ padding: "64px 60px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontSize: 13, color: "#7a9a6a", letterSpacing: 3, marginBottom: 12 }}>FRESH FROM THE OVEN</div>
          <h2 style={{ fontSize: 38, fontWeight: 700, margin: 0, color: "#2d2218" }}>Our Beloved Treats</h2>
          <div style={{ width: 60, height: 2, background: "#c9b99a", margin: "16px auto 0" }}></div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }}>
          {featured.map((p) => (
            <div key={p.name} style={{ background: "#fff", borderRadius: 20, overflow: "hidden", border: "1px solid #e0d4c0", boxShadow: "0 4px 20px rgba(60,40,20,0.07)" }}>
              <div style={{ position: "relative" }}>
                <img src={p.img} alt={p.name} style={{ width: "100%", height: 200, objectFit: "cover", display: "block" }} />
                <span style={{ position: "absolute", top: 14, left: 14, background: "#7a9a6a", color: "#fff", borderRadius: 12, padding: "4px 12px", fontSize: 11, letterSpacing: 1 }}>{p.tag}</span>
              </div>
              <div style={{ padding: "20px 22px 22px" }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 8px", color: "#2d2218" }}>{p.name}</h3>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16 }}>
                  <span style={{ fontSize: 18, fontWeight: 700, color: "#7a9a6a" }}>₹{p.price.toLocaleString('en-IN')}</span>
                  <button style={{ background: "#f5f0e8", color: "#3a2e22", border: "1px solid #c9b99a", borderRadius: 16, padding: "8px 18px", fontSize: 13, cursor: "pointer" }}>Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Coconut Oil Section */}
      <div style={{ background: "#e8e0d0", margin: "0 60px 64px", borderRadius: 28, padding: "52px 60px", display: "flex", gap: 60, alignItems: "center", border: "1px solid #c9b99a" }}>
        <div style={{ fontSize: 80, flexShrink: 0 }}>🥥</div>
        <div>
          <div style={{ fontSize: 12, color: "#7a9a6a", letterSpacing: 3, marginBottom: 10 }}>THE SECRET INGREDIENT</div>
          <h2 style={{ fontSize: 32, fontWeight: 700, margin: "0 0 16px", color: "#2d2218" }}>Why Virgin Coconut Oil?</h2>
          <p style={{ fontSize: 15, color: "#6b5744", lineHeight: 1.8, margin: 0, maxWidth: 500 }}>
            Coconut oil isn't just a substitute — it's an upgrade. It gives our baked goods a delicate, naturally sweet undertone, a perfectly moist texture, and keeps everything fresher for longer. Plus it's kinder to your body.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: "linear-gradient(135deg, #7a9a6a, #5a7a50)", margin: "0 0 0", padding: "60px 40px", textAlign: "center", color: "#fff" }}>
        <div style={{ fontSize: 13, letterSpacing: 3, marginBottom: 12, opacity: 0.8 }}>READY TO ORDER?</div>
        <h2 style={{ fontSize: 36, fontWeight: 700, margin: "0 0 12px" }}>Pick your favourites today</h2>
        <p style={{ opacity: 0.85, marginBottom: 32, fontSize: 15 }}>Same-day baking on orders before noon. Fresh to your door.</p>
        <button style={{ background: "#fff", color: "#5a7a50", border: "none", borderRadius: 28, padding: "16px 40px", fontSize: 16, cursor: "pointer", fontFamily: "Georgia, serif", fontWeight: 700 }}>Browse Menu & Order</button>
      </div>

      {/* Footer */}
      <div style={{ background: "#2d2218", color: "#c9b99a", padding: "32px 60px", display: "flex", justifyContent: "space-between", fontSize: 13 }}>
        <span style={{ fontWeight: 700, fontSize: 16, color: "#e8d5b0" }}>Rabina's Bakery ✿</span>
        <span>WhatsApp: +91 9864099823</span>
        <span>© 2025 All rights reserved</span>
      </div>
    </div>
  );
}
