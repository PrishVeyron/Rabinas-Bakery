export function DarkLuxe() {
  const featured = [
    { name: "Dark Chocolate Coconut Cake", price: 3200, tag: "Signature", img: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=400&q=80" },
    { name: "Coconut Vanilla Birthday Cake", price: 2800, tag: "Bestseller", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80" },
    { name: "Brownie Box (4 pcs)", price: 700, tag: "Popular", img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&q=80" },
  ];

  return (
    <div style={{ fontFamily: "'Georgia', serif", background: "#0f0a06", minHeight: "100vh", color: "#f0e6d0" }}>
      {/* Nav */}
      <nav style={{ background: "rgba(15,10,6,0.95)", borderBottom: "1px solid #3a2810", padding: "0 48px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68, backdropFilter: "blur(12px)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 28, height: 28, border: "1.5px solid #c9a84c", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#c9a84c" }}>R</div>
          <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: 2, color: "#f0e6d0" }}>RABINA'S</span>
          <span style={{ fontSize: 11, color: "#c9a84c", letterSpacing: 4, marginTop: 2 }}>BAKERY</span>
        </div>
        <div style={{ display: "flex", gap: 36, fontSize: 12, color: "#8a7a6a", letterSpacing: 2 }}>
          {["HOME", "MENU", "STORY"].map(l => <span key={l} style={{ cursor: "pointer" }}>{l}</span>)}
        </div>
        <div style={{ border: "1px solid #c9a84c", color: "#c9a84c", borderRadius: 2, padding: "9px 22px", fontSize: 11, cursor: "pointer", letterSpacing: 2 }}>CART</div>
      </nav>

      {/* Hero */}
      <div style={{ position: "relative", minHeight: 480, display: "flex", alignItems: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg, #0f0a06 45%, transparent 100%)", zIndex: 1 }}></div>
        <img src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=900&q=80" alt="hero" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.35 }} />

        <div style={{ position: "relative", zIndex: 2, padding: "80px 64px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, border: "1px solid #c9a84c", padding: "5px 16px", borderRadius: 2, fontSize: 10, color: "#c9a84c", letterSpacing: 3, marginBottom: 28 }}>
            MADE WITH VIRGIN COCONUT OIL
          </div>
          <h1 style={{ fontSize: 60, lineHeight: 1.05, fontWeight: 700, margin: "0 0 24px", maxWidth: 560 }}>
            Baked with<br />
            <span style={{ color: "#c9a84c" }}>intention.</span>
          </h1>
          <p style={{ fontSize: 16, color: "#9a8a78", lineHeight: 1.8, maxWidth: 440, marginBottom: 40 }}>
            Every item is crafted in small batches. No mass production. Just extraordinary cookies and cakes made the way they should be.
          </p>
          <div style={{ display: "flex", gap: 16 }}>
            <button style={{ background: "#c9a84c", color: "#0f0a06", border: "none", padding: "15px 36px", fontSize: 13, cursor: "pointer", letterSpacing: 2, fontWeight: 700 }}>EXPLORE MENU</button>
            <button style={{ background: "transparent", color: "#f0e6d0", border: "1px solid #3a2810", padding: "15px 32px", fontSize: 13, cursor: "pointer", letterSpacing: 2 }}>OUR STORY</button>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ display: "flex", alignItems: "center", padding: "0 64px", gap: 20, margin: "8px 0" }}>
        <div style={{ flex: 1, height: 1, background: "#3a2810" }}></div>
        <span style={{ color: "#c9a84c", fontSize: 18 }}>✦</span>
        <div style={{ flex: 1, height: 1, background: "#3a2810" }}></div>
      </div>

      {/* Featured */}
      <div style={{ padding: "60px 64px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 44 }}>
          <div>
            <div style={{ fontSize: 10, color: "#c9a84c", letterSpacing: 4, marginBottom: 10 }}>SELECTED FOR YOU</div>
            <h2 style={{ fontSize: 34, fontWeight: 700, margin: 0 }}>The Finest Creations</h2>
          </div>
          <span style={{ fontSize: 12, color: "#c9a84c", letterSpacing: 2, cursor: "pointer", borderBottom: "1px solid #c9a84c", paddingBottom: 2 }}>VIEW ALL →</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {featured.map((p) => (
            <div key={p.name} style={{ background: "#1a1008", border: "1px solid #3a2810", overflow: "hidden" }}>
              <div style={{ position: "relative" }}>
                <img src={p.img} alt={p.name} style={{ width: "100%", height: 220, objectFit: "cover", display: "block", filter: "brightness(0.85)" }} />
                <span style={{ position: "absolute", top: 14, right: 14, background: "#c9a84c", color: "#0f0a06", padding: "4px 12px", fontSize: 10, letterSpacing: 1.5, fontWeight: 700 }}>{p.tag.toUpperCase()}</span>
              </div>
              <div style={{ padding: "22px 24px 26px" }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 6px", color: "#f0e6d0", letterSpacing: 0.5 }}>{p.name}</h3>
                <div style={{ height: 1, background: "#3a2810", margin: "16px 0" }}></div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 20, fontWeight: 700, color: "#c9a84c" }}>₹{p.price.toLocaleString('en-IN')}</span>
                  <button style={{ background: "transparent", color: "#c9a84c", border: "1px solid #c9a84c", padding: "8px 18px", fontSize: 11, cursor: "pointer", letterSpacing: 1.5 }}>ADD TO CART</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Coconut Oil feature */}
      <div style={{ margin: "0 64px 64px", background: "linear-gradient(135deg, #1a1008 0%, #2a1a0c 100%)", border: "1px solid #3a2810", padding: "48px 56px", display: "flex", gap: 64, alignItems: "center" }}>
        <div style={{ flex: "0 0 auto" }}>
          <div style={{ width: 72, height: 72, border: "1px solid #c9a84c", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32 }}>🥥</div>
        </div>
        <div>
          <div style={{ fontSize: 10, color: "#c9a84c", letterSpacing: 4, marginBottom: 12 }}>THE DIFFERENCE</div>
          <h2 style={{ fontSize: 28, fontWeight: 700, margin: "0 0 14px", color: "#f0e6d0" }}>Virgin Coconut Oil — Always.</h2>
          <p style={{ fontSize: 14, color: "#9a8a78", lineHeight: 1.9, margin: 0, maxWidth: 480 }}>
            We don't use ordinary butter or vegetable shortening. Virgin coconut oil gives our bakes a uniquely silky texture, natural sweetness, and integrity that mass-market bakeries can't replicate.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: "#c9a84c", padding: "56px 64px", textAlign: "center" }}>
        <div style={{ fontSize: 10, color: "#0f0a06", letterSpacing: 4, marginBottom: 12, opacity: 0.7 }}>PLACE YOUR ORDER</div>
        <h2 style={{ fontSize: 36, fontWeight: 700, color: "#0f0a06", margin: "0 0 12px" }}>Ready for something exquisite?</h2>
        <p style={{ color: "rgba(15,10,6,0.65)", marginBottom: 32, fontSize: 15 }}>Same-day orders welcome. Delivered with care.</p>
        <button style={{ background: "#0f0a06", color: "#c9a84c", border: "none", padding: "16px 44px", fontSize: 12, cursor: "pointer", letterSpacing: 2, fontWeight: 700 }}>ORDER NOW</button>
      </div>

      {/* Footer */}
      <div style={{ background: "#070402", color: "#6a5a48", padding: "28px 64px", display: "flex", justifyContent: "space-between", fontSize: 11, letterSpacing: 1 }}>
        <span style={{ color: "#c9a84c", fontWeight: 700, letterSpacing: 3 }}>RABINA'S BAKERY</span>
        <span>+91 9864099823</span>
        <span>© 2025 All rights reserved</span>
      </div>
    </div>
  );
}
