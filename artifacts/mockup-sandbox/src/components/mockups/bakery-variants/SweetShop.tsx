export function SweetShop() {
  const featured = [
    { name: "Coconut Choc Chip Cookies", price: 450, emoji: "🍪", bg: "#ffe4f0", tag: "Fave!" },
    { name: "Coconut Vanilla Cake", price: 2800, emoji: "🎂", bg: "#e4f0ff", tag: "Wow!" },
    { name: "Coconut Macaroons", price: 600, emoji: "🍬", bg: "#e4ffe8", tag: "New!" },
    { name: "Brownie Box", price: 700, emoji: "🍫", bg: "#fff4e4", tag: "Yum!" },
  ];

  return (
    <div style={{ fontFamily: "'Arial Rounded MT Bold', 'Arial', sans-serif", background: "#fff5f8", minHeight: "100vh", color: "#2d1f2a" }}>
      {/* Nav */}
      <nav style={{ background: "#fff", borderBottom: "3px solid #ffb3d1", padding: "0 36px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 28 }}>🧁</span>
          <span style={{ fontSize: 19, fontWeight: 900, color: "#e05090", letterSpacing: -0.5 }}>Rabina's Bakery</span>
        </div>
        <div style={{ display: "flex", gap: 28, fontSize: 14, fontWeight: 700, color: "#9b5c8a" }}>
          {["Home", "Menu", "Our Story"].map(l => <span key={l} style={{ cursor: "pointer" }}>{l}</span>)}
        </div>
        <div style={{ background: "#e05090", color: "#fff", borderRadius: 999, padding: "9px 22px", fontSize: 14, cursor: "pointer", fontWeight: 700, boxShadow: "0 4px 0 #b03070" }}>🛒 Cart</div>
      </nav>

      {/* Hero */}
      <div style={{ background: "linear-gradient(160deg, #ffe0f0 0%, #ffefd0 60%, #e8f5e0 100%)", padding: "72px 56px 64px", display: "flex", alignItems: "center", gap: 48, position: "relative", overflow: "hidden" }}>
        {/* Floating decorations */}
        {["🍪", "🎂", "🍩", "🍫", "🌸"].map((e, i) => (
          <span key={i} style={{ position: "absolute", fontSize: [40,30,36,28,24][i], opacity: 0.15, top: [10,50,70,20,40][i], right: [40,90,160,220,300][i], transform: `rotate(${[-12,8,-6,15,-10][i]}deg)`, pointerEvents: "none" }}>{e}</span>
        ))}

        <div style={{ flex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", border: "2px solid #ffb3d1", borderRadius: 999, padding: "6px 16px", fontSize: 12, color: "#e05090", marginBottom: 24, fontWeight: 700 }}>
            🥥 Made with natural coconut oil!
          </div>
          <h1 style={{ fontSize: 54, lineHeight: 1.15, fontWeight: 900, margin: "0 0 18px", color: "#2d1f2a", letterSpacing: -1 }}>
            Baked with<br />
            <span style={{ color: "#e05090", WebkitTextStroke: "0px" }}>lots of love</span> 💕
          </h1>
          <p style={{ fontSize: 17, color: "#7a4a6a", lineHeight: 1.6, maxWidth: 400, marginBottom: 36 }}>
            Handcrafted cookies & cakes baked fresh every day. No preservatives — just pure, delicious goodness!
          </p>
          <div style={{ display: "flex", gap: 14 }}>
            <button style={{ background: "#e05090", color: "#fff", border: "none", borderRadius: 999, padding: "15px 34px", fontSize: 16, cursor: "pointer", fontWeight: 900, boxShadow: "0 5px 0 #b03070" }}>Order Now 🎉</button>
            <button style={{ background: "#fff", color: "#e05090", border: "2.5px solid #ffb3d1", borderRadius: 999, padding: "15px 28px", fontSize: 16, cursor: "pointer", fontWeight: 700 }}>Our Story</button>
          </div>
        </div>

        <div style={{ flex: "0 0 300px", borderRadius: 28, overflow: "hidden", boxShadow: "0 16px 0 #f0a0c0, 0 20px 40px rgba(220,80,140,0.2)", border: "4px solid #fff", transform: "rotate(2deg)" }}>
          <img src="https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&q=80" alt="cookies" style={{ width: "100%", height: 260, objectFit: "cover", display: "block" }} />
        </div>
      </div>

      {/* Perks */}
      <div style={{ background: "#e05090", padding: "14px 40px", display: "flex", justifyContent: "center", gap: 48, fontSize: 13, color: "#fff", fontWeight: 700 }}>
        {["🥥 Coconut Oil Only", "🌿 No Preservatives", "🍪 Baked Daily", "💌 WhatsApp Orders"].map(t => <span key={t}>{t}</span>)}
      </div>

      {/* Featured */}
      <div style={{ padding: "60px 48px" }}>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <h2 style={{ fontSize: 36, fontWeight: 900, margin: 0, color: "#2d1f2a" }}>
            Fresh from the oven! 🔥
          </h2>
          <p style={{ color: "#9b5c8a", fontSize: 15, marginTop: 8 }}>Our most-loved treats, ready to order</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
          {featured.map((p) => (
            <div key={p.name} style={{ background: p.bg, borderRadius: 24, padding: "24px 20px 20px", border: "2px solid #fff", boxShadow: "0 6px 0 rgba(220,80,140,0.1)", textAlign: "center", position: "relative" }}>
              <span style={{ position: "absolute", top: 12, right: 14, background: "#e05090", color: "#fff", borderRadius: 999, padding: "3px 10px", fontSize: 11, fontWeight: 900 }}>{p.tag}</span>
              <div style={{ fontSize: 52, marginBottom: 12 }}>{p.emoji}</div>
              <h3 style={{ fontSize: 13, fontWeight: 900, margin: "0 0 10px", color: "#2d1f2a", lineHeight: 1.3 }}>{p.name}</h3>
              <div style={{ fontSize: 17, fontWeight: 900, color: "#e05090", marginBottom: 14 }}>₹{p.price.toLocaleString('en-IN')}</div>
              <button style={{ background: "#e05090", color: "#fff", border: "none", borderRadius: 999, padding: "8px 18px", fontSize: 12, cursor: "pointer", fontWeight: 700, width: "100%", boxShadow: "0 3px 0 #b03070" }}>Add to Cart +</button>
            </div>
          ))}
        </div>
      </div>

      {/* Coconut Oil callout */}
      <div style={{ margin: "0 48px 60px", background: "linear-gradient(135deg, #ffe0f0, #ffefd0)", borderRadius: 28, padding: "44px 52px", display: "flex", gap: 44, alignItems: "center", border: "2px solid #ffb3d1" }}>
        <span style={{ fontSize: 72, flexShrink: 0 }}>🥥</span>
        <div>
          <h2 style={{ fontSize: 28, fontWeight: 900, margin: "0 0 12px", color: "#2d1f2a" }}>Why coconut oil? Because it's amazing! ✨</h2>
          <p style={{ fontSize: 15, color: "#7a4a6a", lineHeight: 1.7, margin: 0, maxWidth: 480 }}>
            We use real virgin coconut oil in every single recipe. It makes our cookies extra chewy, our cakes beautifully moist, and gives everything a naturally sweet flavour. Zero artificial junk!
          </p>
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: "linear-gradient(135deg, #e05090, #c030a0)", padding: "56px 40px", textAlign: "center" }}>
        <div style={{ fontSize: 42, marginBottom: 12 }}>🎊</div>
        <h2 style={{ fontSize: 36, fontWeight: 900, color: "#fff", margin: "0 0 10px" }}>Ready for something sweet?</h2>
        <p style={{ color: "rgba(255,255,255,0.8)", marginBottom: 28, fontSize: 16 }}>Let us bake something special just for you today!</p>
        <button style={{ background: "#fff", color: "#e05090", border: "none", borderRadius: 999, padding: "16px 44px", fontSize: 17, cursor: "pointer", fontWeight: 900, boxShadow: "0 5px 0 rgba(0,0,0,0.15)" }}>Browse Menu & Order 🍪</button>
      </div>

      {/* Footer */}
      <div style={{ background: "#2d1f2a", color: "#c090a8", padding: "28px 48px", display: "flex", justifyContent: "space-between", fontSize: 13, fontWeight: 700 }}>
        <span style={{ color: "#ffb3d1", fontSize: 15 }}>🧁 Rabina's Bakery</span>
        <span>WhatsApp: +91 9864099823</span>
        <span>© 2025 Made with 💕</span>
      </div>
    </div>
  );
}
