import React from "react";
import logoSisiDanau from "./logo-sisi-danau.png";
import { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;
const today = () => { const d=new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`; };
const STOCK_PRESETS = {"Dapur":[{"name":"AJINOMOTO","unit":"KG"},{"name":"ASEM","unit":"GR"},{"name":"BAKING POWDER","unit":"PACK"},{"name":"BAWANG GORENG","unit":"GR"},{"name":"BIJI PALA","unit":"KG"},{"name":"BUNGA LAWANG","unit":"GR"},{"name":"CABE KERING","unit":"KG"},{"name":"CAJUN","unit":"GR"},{"name":"DAUN SALAM","unit":"GR"},{"name":"GARAM","unit":"PACK"},{"name":"GULA MERAH","unit":"KG"},{"name":"GULA PASIR","unit":"KG"},{"name":"JINTAN","unit":"GR"},{"name":"KEMIRI","unit":"GR"},{"name":"KENTANG","unit":"KG"},{"name":"KETUMBAR","unit":"GR"},{"name":"KNORR CHICKEN SEASONING","unit":"KG"},{"name":"LADA HITAM","unit":"GR"},{"name":"LADA PUTIH","unit":"GR"},{"name":"PARSLEY","unit":"GR"},{"name":"ROSEMARY","unit":"GR"},{"name":"ROYCO AYAM","unit":"KG"},{"name":"ROYCO SAPI","unit":"KG"},{"name":"TEPUNG TAPIOKA","unit":"GR"},{"name":"TEPUNG CAMPUR","unit":"KG"},{"name":"TEPUNG TERIGU","unit":"KG"},{"name":"TERASI","unit":"GR"},{"name":"TERASI SASET","unit":"PCS"},{"name":"VANILLI","unit":"GR"},{"name":"WIJEN","unit":"GR"},{"name":"BAHAN SAUS","unit":"SATUAN"},{"name":"FISH SAUCE","unit":"BOTOL"},{"name":"KECAP","unit":"JURIGEN"},{"name":"MILLAC/COOKING CREAM","unit":"L"},{"name":"MINYAK WIJEN","unit":"BOTOL"},{"name":"SAUS BARBEQUE","unit":"KG"},{"name":"SAUS DEMIGLACE","unit":"KG"},{"name":"SAUS SAMBAL","unit":"JURIGEN"},{"name":"SAUS TARTAR","unit":"GR"},{"name":"SAUS TERIYAKI","unit":"BOTOL"},{"name":"SAUS TIRAM","unit":"GR"},{"name":"SAUS TOMAT","unit":"JURIGEN"},{"name":"SODA","unit":"BOTOL"},{"name":"SUSU COKLAT","unit":"PACK"},{"name":"THOUSAND ISLAND","unit":"KG"},{"name":"SAYUR","unit":"SATUAN"},{"name":"BAWANG BOMBAY","unit":"KG"},{"name":"BAWANG MERAH","unit":"KG"},{"name":"BAWANG MERAH (KUPAS)","unit":"GR"},{"name":"BAWANG PUTIH","unit":"KG"},{"name":"BAWANG PUTIH (KUPAS)","unit":"GR"},{"name":"BROKOLI","unit":"GR"},{"name":"CABE KERITING","unit":"KG"},{"name":"CABE MERAH BESAR","unit":"KG"},{"name":"CABE RAWIT","unit":"KG"},{"name":"DAUN BAWANG","unit":"KG"},{"name":"DAUN JERUK","unit":"GR"},{"name":"JAHE","unit":"GR"},{"name":"JAMUR","unit":"KG"},{"name":"JERUK NIPIS","unit":"KG"},{"name":"JERUK SAMBEL","unit":"GR"},{"name":"KANGKUNG","unit":"GR"},{"name":"KOL UNGU","unit":"KG"},{"name":"KUBIS","unit":"KG"},{"name":"KUNYIT","unit":"GR"},{"name":"LENGKUAS","unit":"GR"},{"name":"PISANG","unit":"BIJI"},{"name":"SAWI PAKCOY","unit":"GR"},{"name":"SAWI PUTIH","unit":"GR"},{"name":"SELADA","unit":"GR"},{"name":"SELEDRI","unit":"GR"},{"name":"SEREH","unit":"GR"},{"name":"TEMPE","unit":"BIJI"},{"name":"TIMUN","unit":"KG"},{"name":"TOMAT","unit":"KG"},{"name":"WORTEL","unit":"KG"},{"name":"BAHAN","unit":"SATUAN"},{"name":"BERAS","unit":"KG"},{"name":"KEJU","unit":"KG"},{"name":"MARGARINE","unit":"KG"},{"name":"MIE TELUR","unit":"PACK"},{"name":"MIE TELUR (REBUS)","unit":"PORSI"},{"name":"MINYAK","unit":"L"},{"name":"GAS","unit":"PCS"},{"name":"BAHAN","unit":"SATUAN"},{"name":"AYAM BOILER","unit":"KG"},{"name":"AYAM UNGKEP","unit":"PORSI"},{"name":"AYAM KAMPUNG","unit":"KG"},{"name":"AYAM KAMPUNG UNGKEP","unit":"PORSI"},{"name":"BAKSO IKAN","unit":"PACK"},{"name":"BAKSO IKAN (SLICE)","unit":"GR"},{"name":"BAKSO SAPI","unit":"PACK"},{"name":"BAKSO SAPI (SLICE)","unit":"GR"},{"name":"BEEF SHORTPLATE","unit":"KG"},{"name":"BEEF SHORTPLATE (POTONG)","unit":"PORSI"},{"name":"BUNTUT","unit":"KG"},{"name":"BUNTUT REBUS","unit":"PORSI"},{"name":"CIRENG","unit":"PACK"},{"name":"CUMI","unit":"KG"},{"name":"CUMI POTONG","unit":"PORSI"},{"name":"CUMI TOPPING","unit":"GR"},{"name":"DADA AYAM","unit":"KG"},{"name":"DADA STEAK","unit":"PORSI"},{"name":"DADA TOPPING","unit":"GR"},{"name":"DORI","unit":"PACK"},{"name":"DORI DABU DABU","unit":"PORSI"},{"name":"DORI FISH N CHIPS","unit":"PORSI"},{"name":"FF STEAK","unit":"KG"},{"name":"FF STEAK","unit":"PORSI"},{"name":"FRENCH FRIES","unit":"KG"},{"name":"FRENCH FRIES","unit":"PORSI"},{"name":"IGA","unit":"KG"},{"name":"IGA REBUS","unit":"PORSI"},{"name":"KULIT","unit":"KG"},{"name":"KULIT UNGKEP","unit":"PORSI"},{"name":"PAHA AYAM","unit":"KG"},{"name":"PAHA GEPREK","unit":"PORSI"},{"name":"PAHA STEAK","unit":"PORSI"},{"name":"PAHA TERIYAKI","unit":"PORSI"},{"name":"SIRLOIN","unit":"PORSI"},{"name":"TELUR","unit":"KG"},{"name":"TENDERLOIN","unit":"PORSI"},{"name":"TULANG SAPI","unit":"KG"},{"name":"UDANG","unit":"KG"},{"name":"UDANG","unit":"PORSI"},{"name":"UDANG TOPPING","unit":"GR"},{"name":"BUMBU DAN SAUS","unit":"SATUAN"},{"name":"SAUS BARBEQUE","unit":"GR"},{"name":"SAUS MUSHROOM","unit":"GR"},{"name":"SAUS BLACKPEPPER","unit":"GR"},{"name":"SAUS TERIYAKI","unit":"GR"},{"name":"SAUS PADANG","unit":"GR"},{"name":"SAMBAL TERASI","unit":"GR"},{"name":"SAMBAL CIRENG","unit":"GR"},{"name":"SAMBAL BAWANG","unit":"GR"},{"name":"BUMBU BAKAR","unit":"GR"},{"name":"BUMBU TOMYAM","unit":"GR"},{"name":"BUMBU MERAH","unit":"GR"},{"name":"BUMBU PUTIH","unit":"GR"},{"name":"BUSTOMI","unit":"GR"},{"name":"GOSOK CUCI","unit":"PCS"},{"name":"KOTAK TAKE AWAY BESAR","unit":"PCS"},{"name":"KOTAK TAKE AWAY KECIL","unit":"PCS"},{"name":"PLASTIK ES","unit":"PACK"},{"name":"PLASTIK MERAH BESAR","unit":"PACK"},{"name":"PLASTIK TAKE AWAY BESAR","unit":"PACK"},{"name":"PLASTIK TAKE AWAY KECIL","unit":"PACK"},{"name":"PLASTIK TIPIS 1 KG AN","unit":"PACK"},{"name":"PLASTIK WRAP","unit":"ROLL"},{"name":"SABUN CUCI PIRING","unit":"L"},{"name":"SARUNG TANGAN PLASTIK","unit":"PACK"},{"name":"SENDOK TAKE AWAY","unit":"PACK"},{"name":"SPON CUCI PIRING","unit":"PCS"},{"name":"THINWALL BULAT 1000 ML","unit":"PCS"},{"name":"THINWALL BULAT750","unit":"PCS"},{"name":"TRASH BAG","unit":"PACK"},{"name":"WADAH SAUS KECIL","unit":"PACK"}],"Bar":[{"name":"AIR MINERAL","unit":"BOTOL"},{"name":"ASTOR","unit":"PACK"},{"name":"BISCOFF BISKUIT","unit":"PACK"},{"name":"BISCOFF SELAI","unit":"GR"},{"name":"BUAH JAMBU","unit":"BIJI"},{"name":"BUAH JERUK NIPIS","unit":"BIJI"},{"name":"BUAH LEMON","unit":"BIJI"},{"name":"BUAH MELON","unit":"GR"},{"name":"BUAH NAGA","unit":"GR"},{"name":"BUAH SEMANGKA","unit":"GR"},{"name":"CARAMEL TOPPING","unit":"GR"},{"name":"CENDOL","unit":"GR"},{"name":"CHEESE TOPPING","unit":"GR"},{"name":"CHOCOLATE POWDER","unit":"GR"},{"name":"COFFEE BEANS","unit":"GR"},{"name":"ES KRISTAL","unit":"PACK"},{"name":"FRESH MILK","unit":"L"},{"name":"GALON","unit":"PCS"},{"name":"GALON CLEO","unit":"PCS"},{"name":"GULA AREN CAIR","unit":"GR"},{"name":"GULA PASIR","unit":"KG"},{"name":"GULA STICK","unit":"PACK"},{"name":"ICE CREAM CHOCOLATE","unit":"GR"},{"name":"ICE CREAM STRAWBERRY","unit":"GR"},{"name":"ICE CREAM VANILLA","unit":"GR"},{"name":"JERUK","unit":"PCS"},{"name":"KOPI GADJAH","unit":"GR"},{"name":"KRIMER POWDER","unit":"GR"},{"name":"LEMON TEA POWDER","unit":"GR"},{"name":"LONGAN KALENG","unit":"KALENG"},{"name":"MATCHA POWDER","unit":"GR"},{"name":"SIRUP MARJAN LECI","unit":"ML"},{"name":"SIRUP BLUECURACAO","unit":"ML"},{"name":"SIRUP MINT","unit":"ML"},{"name":"SIRUP STRAWBERRY","unit":"ML"},{"name":"SIRUP HAZELNUTT","unit":"ML"},{"name":"SIRUP VANILLA","unit":"ML"},{"name":"SKM CARNATION","unit":"KALENG"},{"name":"SODA","unit":"BOTOL"},{"name":"STRAWBERRY","unit":"GR"},{"name":"SUNBAY","unit":"KALENG"},{"name":"SUSU UHT DIAMOND","unit":"L"},{"name":"TEH DANDANG","unit":"PACK"},{"name":"THAI TEA","unit":"GR"},{"name":"SEDOTAN BIASA","unit":"PACK"},{"name":"SEDOTAN JUMBO","unit":"PACK"},{"name":"SEDOTAN KOPI","unit":"PACK"},{"name":"CUP HOT","unit":"PCS"},{"name":"CUP ES","unit":"PCS"},{"name":"PLASTIK ROLL PRESS","unit":"PCS"}],"Service":[{"name":"BATERAI SOUND","unit":"PACK"},{"name":"GLASS CLEANER","unit":"L"},{"name":"HAND SOAP","unit":"L"},{"name":"KAPAS","unit":"PACK"},{"name":"KERTAS PRINT DAPUR","unit":"PCS"},{"name":"KERTAS PRINT KASIR","unit":"PCS"},{"name":"PLASTIK SAMPAH","unit":"PACK"},{"name":"PLASTIK SENDOK BESAR","unit":"PACK"},{"name":"PLASTIK SENDOK KECIL","unit":"PACK"},{"name":"SABUN PEL","unit":"L"},{"name":"SABUN PEMBERSIH KLOSET","unit":"L"},{"name":"SPIRTUS","unit":"L"},{"name":"TISU","unit":"PCS"},{"name":"TUSUK GIGI","unit":"PACK"},{"name":"BAYGON","unit":"PCS"},{"name":"DOUBLE TIP","unit":"PCS"},{"name":"BOLPOINT","unit":"PACK"},{"name":"PIRING PLASTIK","unit":"PACK"},{"name":"GARPU PLASTIK","unit":"PACK"},{"name":"PEMBERSIH KACA","unit":"L"},{"name":"SPIDOL","unit":"PCS"}]};

const money = (n) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(Number(n || 0));
const number = (n) => Number(n || 0);

export default function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("dashboard");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [stocks, setStocks] = useState([]);
  const [stockItems, setStockItems] = useState([]);
  const [showAddItem, setShowAddItem] = useState(false);
  const [cash, setCash] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authMode, setAuthMode] = useState("login");
  const [stockDate, setStockDate] = useState(today());
  const [exportDepartment, setExportDepartment] = useState("Dapur");
  const [exportStart, setExportStart] = useState("2026-10-01");
  const [exportEnd, setExportEnd] = useState("2026-10-31");

  async function refresh() {
    if (!supabase || !session) return;
    setError("");
    const results = await Promise.all([
      supabase.from("inventory_entries").select("*").order("entry_date", { ascending: false }).limit(500),
      supabase.from("stock_items").select("*").order("name"),
      supabase.from("cash_entries").select("*").order("entry_date", { ascending: false }).limit(500),
      supabase.from("ingredients").select("*").order("name"),
      supabase.from("recipes").select("*").order("name")
    ]);
    const bad = results.find(r => r.error);
    if (bad) { setError(bad.error.message); return; }
    setStocks(results[0].data || []);
    setStockItems(results[1].data || []);
    setCash(results[2].data || []);
    setIngredients(results[3].data || []);
    setRecipes(results[4].data || []);
  }

  useEffect(() => {
    if (!supabase) { setLoading(false); return; }
    supabase.auth.getSession().then(({ data }) => { setSession(data.session); setLoading(false); });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => setSession(nextSession));
    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => { if (session) refresh(); }, [session]);

  async function signIn(e) {
    e.preventDefault(); setError(""); setNotice("");
    if (!supabase) return setError("Konfigurasi Supabase belum diisi. Ikuti README.md terlebih dahulu.");
    let result;

if (authMode === "login") {
  result = await supabase.auth.signInWithPassword({
    email,
    password,
  });
} else {
  result = await supabase.auth.signUp({
    email,
    password,
  });
}

const { error } = result;
    if (error) setError(error.message);
    else setNotice(authMode === "login" ? "Berhasil masuk." : "Pendaftaran dikirim. Jika konfirmasi email aktif, buka email untuk mengonfirmasi akun.");
  }
  async function signOut() { await supabase.auth.signOut(); setStocks([]); setStockItems([]); setCash([]); setIngredients([]); setRecipes([]); }

  async function insert(table, payload, after) {
    setError(""); setNotice("");
    const { error } = await supabase.from(table).insert(payload);
    if (error) { setError(error.message); return; }
    setNotice("Data berhasil disimpan."); if (after) after(); await refresh();
  }
  async function addStockItem({ department, name, unit }) {
    setError(""); setNotice("");
    const cleanName = name.trim().replace(/\s+/g, " ");
    const cleanUnit = unit.trim() || "pcs";
    if (!cleanName) { setError("Nama barang wajib diisi."); return false; }
    const exists = [...(STOCK_PRESETS[department] || []), ...stockItems.filter(x => x.department === department)]
      .some(x => x.name.trim().toLocaleLowerCase("id-ID") === cleanName.toLocaleLowerCase("id-ID") && x.unit.trim().toLocaleLowerCase("id-ID") === cleanUnit.toLocaleLowerCase("id-ID"));
    if (exists) { setError(`Barang ${cleanName} dengan satuan ${cleanUnit} sudah terdaftar di Stok ${department}.`); return false; }
    const { data, error } = await supabase.from("stock_items").insert({ department, name: cleanName, unit: cleanUnit }).select().single();
    if (error) { setError(error.message); return false; }
    setStockItems(prev => [...prev, data]);
    setNotice(`Barang ${cleanName} berhasil ditambahkan ke Stok ${department}.`);
    setShowAddItem(false);
    return true;
  }
  async function saveStockRow(row) {
    setError(""); setNotice("");
    const payload = { entry_date: row.entry_date || stockDate, department: row.department, item_name: row.item_name, unit: row.unit || "pcs", opening: number(row.opening), incoming: number(row.incoming), outgoing: number(row.outgoing), spoiled: number(row.spoiled), closing: Math.max(0, number(row.opening) + number(row.incoming) - number(row.outgoing) - number(row.spoiled)), notes: row.notes || null };
    let result;
    if (row.id && !String(row.id).startsWith("preset-")) result = await supabase.from("inventory_entries").update(payload).eq("id", row.id);
    else result = await supabase.from("inventory_entries").insert(payload);
    if (result.error) { setError(result.error.message); return false; }
    setNotice(`Stok ${row.item_name} berhasil disimpan.`); await refresh(); return true;
  }
  async function remove(table, id) {
    if (!confirm("Yakin ingin menghapus data ini?")) return;
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) setError(error.message); else { setNotice("Data dihapus."); await refresh(); }
  }

  const cashBalance = useMemo(() => [...cash].sort((a,b) => a.entry_date.localeCompare(b.entry_date) || a.created_at.localeCompare(b.created_at)).reduce((s, r) => s + number(r.debit) - number(r.credit), 0), [cash]);
  const todayStocks = stocks.filter(s => s.entry_date === today());
  const todayCash = cash.filter(c => c.entry_date === today()).reduce((s,c) => s + number(c.debit) - number(c.credit), 0);
  const recipeCost = (recipeId) => {
    const recipe = recipes.find(r => r.id === recipeId);
    return recipe?.total_cost ? number(recipe.total_cost) : 0;
  };

  if (loading) return <main className="center">Memuat aplikasi...</main>;
  if (!supabase) return <main className="auth-wrap"><section className="auth-card"><img className="logo-image auth-logo-image" src={logoSisiDanau} alt="Logo Resto & Cafe Sisi Danau" /><h1>Resto & Cafe Sisi Danau</h1><p>Konfigurasi database online belum diisi.</p><p>Buka file <code>README.md</code> di folder project, ikuti langkah Supabase, lalu buat file <code>.env</code>.</p></section></main>;
  if (!session) return <main className="auth-wrap"><form className="auth-card" onSubmit={signIn}><img className="logo-image auth-logo-image" src={logoSisiDanau} alt="Logo Resto & Cafe Sisi Danau" /><h1>Resto & Cafe Sisi Danau</h1><p className="muted">Aplikasi stok dan kas</p><div className="field"><label>Email</label><input type="email" value={email} onChange={e=>setEmail(e.target.value)} required /></div><div className="field"><label>Password (minimal 6 karakter)</label><input type="password" value={password} onChange={e=>setPassword(e.target.value)} minLength="6" required /></div><button className="primary full">{authMode === "login" ? "Masuk" : "Daftar akun"}</button><button type="button" className="link full" onClick={()=>setAuthMode(authMode === "login" ? "signup" : "login")}>{authMode === "login" ? "Belum punya akun? Daftar" : "Sudah punya akun? Masuk"}</button>{error && <p className="error">{error}</p>}{notice && <p className="success">{notice}</p>}</form></main>;

  return <div className="app-shell">
    <aside className="sidebar"><div className="brand"><img className="logo-image small" src={logoSisiDanau} alt="Logo Sisi Danau" /><div><strong>SISI DANAU</strong><small>Manajemen Restoran</small></div></div><nav>
      {[ ["dashboard","▦","Dashboard"],["stockDapur","▤","Stok Dapur"],["stockBar","☕","Stok Bar"],["stockService","▧","Stok Service"],["export","⇩","Export & Cetak"],["cash","↔","Kas Harian"] ].map(([id,icon,label])=><button key={id} className={tab===id?"nav-item active":"nav-item"} onClick={()=>setTab(id)}><span>{icon}</span>{label}</button>)}
    </nav><div className="side-bottom"><small>{session.user.email}</small><button className="link" onClick={signOut}>Keluar</button></div></aside>
    <main className="main"><header className="topbar"><div><p className="eyebrow">SISTEM OPERASIONAL</p><h1>{({dashboard:"Dashboard",stockDapur:"Stok Dapur",stockBar:"Stok Bar",stockService:"Stok Service",cash:"Kas Harian",export:"Export & Cetak"})[tab] || "Dashboard"}</h1></div><div className="date-chip">{new Date().toLocaleDateString("id-ID",{day:"numeric",month:"long",year:"numeric"})}</div></header>
      {error && <div className="alert error">{error}</div>}{notice && <div className="alert success">{notice}</div>}
      {tab==="dashboard" && <div className="dashboard-page">
        <section className="dashboard-hero">
          <div className="hero-copy"><span className="hero-kicker">RUANG KENDALI OPERASIONAL</span><h2>Selamat datang di<br/><em>Sisi Danau</em></h2><p>Pantau stok harian dan arus kas restoran dalam satu tempat.</p><div className="hero-actions"><button className="hero-button hero-button-light" onClick={()=>setTab("stockDapur")}>Catat stok <span>↗</span></button><button className="hero-button hero-button-ghost" onClick={()=>setTab("cash")}>Buka kas harian</button></div></div>
          <div className="hero-mark"><div className="hero-orbit"><img src={logoSisiDanau} alt="Logo Sisi Danau" /></div><span className="hero-caption">TENANG · TERTATA · TERPANTAU</span></div>
          <div className="hero-decoration hero-decoration-one"></div><div className="hero-decoration hero-decoration-two"></div>
        </section>
        <div className="dashboard-section-heading"><div><p className="eyebrow">RINGKASAN HARI INI</p><h2>Operasional dalam angka</h2></div><span className="dashboard-date-label">{new Date().toLocaleDateString("id-ID",{weekday:"long",day:"numeric",month:"long"})}</span></div>
        <section className="stats dashboard-stats"><Stat title="Input stok hari ini" value={todayStocks.length} note="catatan stok tersimpan" /><Stat title="Perubahan kas hari ini" value={money(todayCash)} note="debit dikurangi kredit" /><Stat title="Saldo berjalan" value={money(cashBalance)} note="saldo seluruh transaksi" /><Stat title="Jenis barang" value={Object.values(STOCK_PRESETS).reduce((sum,items)=>sum+items.length,0)+stockItems.length} note="barang dari daftar stok" /></section>
        <section className="dashboard-shortcuts"><button className="shortcut-card" onClick={()=>setTab("stockDapur")}><span className="shortcut-icon kitchen-icon">⌂</span><span><strong>Stok Dapur</strong><small>Bahan baku & persediaan</small></span><b>↗</b></button><button className="shortcut-card" onClick={()=>setTab("stockBar")}><span className="shortcut-icon bar-icon">◒</span><span><strong>Stok Bar</strong><small>Bahan minuman & kemasan</small></span><b>↗</b></button><button className="shortcut-card" onClick={()=>setTab("stockService")}><span className="shortcut-icon service-icon">✧</span><span><strong>Stok Service</strong><small>Perlengkapan pelayanan</small></span><b>↗</b></button><button className="shortcut-card" onClick={()=>setTab("export")}><span className="shortcut-icon report-icon">▤</span><span><strong>Export & Cetak</strong><small>Siapkan laporan stok</small></span><b>↗</b></button></section>
        <section className="panel dashboard-recent"><div className="panel-heading-row"><div><p className="eyebrow">AKTIVITAS TERBARU</p><h2>Catatan stok terbaru</h2></div><button className="text-action" onClick={()=>setTab("stockDapur")}>Lihat stok <span>→</span></button></div><StockTable rows={stocks.slice(0,6)} remove={remove}/></section>
        <section className="dashboard-note"><span className="note-icon">✦</span><div><strong>Catatan operasional</strong><p>Pastikan stok fisik diperbarui setiap hari dan setiap transaksi kas dicatat agar saldo selalu akurat.</p></div><button onClick={()=>setTab("cash")}>Kelola kas <span>→</span></button></section>
      </div>}
      { ["stockDapur","stockBar","stockService"].includes(tab) && <section className="panel"><div className="stock-toolbar"><div><h2>Stok {({stockDapur:"Dapur",stockBar:"Bar",stockService:"Service"})[tab]}</h2><p className="muted small-text">Klik Edit pada baris barang untuk mengisi stok langsung di tabel. Stok akhir dihitung otomatis dan disimpan ke Supabase.</p></div><div className="stock-toolbar-actions"><div className="field date-filter"><label>Tanggal stok</label><input type="date" value={stockDate} onChange={e=>setStockDate(e.target.value)} /></div><button className="primary add-item-button" onClick={()=>{setShowAddItem(v=>!v);setError("");setNotice("");}}>{showAddItem ? "Tutup" : "+ Tambah Barang"}</button></div></div>{showAddItem && <AddStockItemForm department={({stockDapur:"Dapur",stockBar:"Bar",stockService:"Service"})[tab]} onCancel={()=>setShowAddItem(false)} onSave={addStockItem}/>}<StockTable rows={buildStockDisplayRows(({stockDapur:"Dapur",stockBar:"Bar",stockService:"Service"})[tab],stocks,stockDate,stockItems)} remove={remove} editable onSave={saveStockRow} selectedDate={stockDate}/></section>}
      {tab==="export" && <>
        <section className="panel export-controls">
          <h2>Export & Cetak Laporan Stok</h2>
          <p>Pilih bagian dan periode laporan. Gunakan tombol Cetak / Simpan PDF untuk membuka dialog cetak browser.</p>
          <div className="form-grid export-filter-grid">
            <Field label="Bagian stok"><select value={exportDepartment} onChange={e=>setExportDepartment(e.target.value)}><option value="Dapur">Stok Dapur</option><option value="Bar">Stok Bar</option><option value="Service">Stok Service</option></select></Field>
            <Field label="Tanggal awal"><input type="date" value={exportStart} onChange={e=>setExportStart(e.target.value)} required /></Field>
            <Field label="Tanggal akhir"><input type="date" min={exportStart} value={exportEnd} onChange={e=>setExportEnd(e.target.value)} required /></Field>
            <div className="export-actions"><button className="primary" onClick={()=>window.print()} disabled={!exportStart||!exportEnd||exportEnd<exportStart}>Cetak / Simpan PDF</button></div>
          </div>
          <p className="muted small-text">Periode pilihan awal: 1–31 Oktober 2026. Saat dialog cetak muncul, pilih printer atau “Save as PDF”.</p>
        </section>
        <section className="panel print-report-panel">
          <div className="print-report-heading"><img className="print-report-logo" src={logoSisiDanau} alt="Logo Resto & Cafe Sisi Danau" /><div className="print-report-brand">RESTO &amp; CAFE SISI DANAU</div><h2>LAPORAN STOK {exportDepartment.toUpperCase()}</h2><p>Periode {new Date(`${exportStart}T00:00:00`).toLocaleDateString("id-ID",{day:"2-digit",month:"long",year:"numeric"})} – {new Date(`${exportEnd}T00:00:00`).toLocaleDateString("id-ID",{day:"2-digit",month:"long",year:"numeric"})}</p></div>
          <div className="table-wrap"><table className="print-report-table"><thead><tr><th>Tanggal</th><th>Nama barang</th><th>Satuan</th><th>Stok awal</th><th>Masuk</th><th>Keluar</th><th>Spoiled</th><th>Stok akhir</th><th>Keterangan</th></tr></thead><tbody>{stocks.filter(r=>r.department===exportDepartment&&r.entry_date>=exportStart&&r.entry_date<=exportEnd).sort((a,b)=>a.entry_date.localeCompare(b.entry_date)||String(a.item_name).localeCompare(String(b.item_name),"id-ID")).map(r=><tr key={r.id}><td>{r.entry_date}</td><td>{r.item_name}</td><td>{r.unit}</td><td>{number(r.opening)}</td><td>{number(r.incoming)}</td><td>{number(r.outgoing)}</td><td>{number(r.spoiled)}</td><td><strong>{number(r.closing)}</strong></td><td>{r.notes||""}</td></tr>)}</tbody></table></div>
          {stocks.filter(r=>r.department===exportDepartment&&r.entry_date>=exportStart&&r.entry_date<=exportEnd).length===0&&<p className="empty">Belum ada catatan stok tersimpan untuk bagian dan periode ini.</p>}
          <div className="print-report-footer"><span>Dicetak pada: {new Date().toLocaleDateString("id-ID",{day:"2-digit",month:"long",year:"numeric"})}</span><span>Jumlah catatan: {stocks.filter(r=>r.department===exportDepartment&&r.entry_date>=exportStart&&r.entry_date<=exportEnd).length}</span></div>
          <div className="signature-row"><div>Disiapkan oleh,<br/><br/><br/>(__________________)</div><div>Diperiksa oleh,<br/><br/><br/>(__________________)</div><div>Disetujui oleh,<br/><br/><br/>(__________________)</div></div>
        </section>
      </>}
      {tab==="cash" && <><section className="panel"><h2>Tambah transaksi kas</h2><CashForm onSave={v=>insert("cash_entries",v)} /></section><section className="panel"><h2>Riwayat kas</h2><CashTable rows={cash} remove={remove}/><p className="balance">Saldo berdasarkan seluruh transaksi: {money(cashBalance)}</p></section></>}
      <footer>Resto & Cafe Sisi Danau · Simpan data secara online melalui Supabase</footer>
    </main>
  </div>;
}

function Stat({title,value,note}) { return <div className="stat"><span>{title}</span><strong>{value}</strong><small>{note}</small></div>; }
function Empty(){return <p className="empty">Belum ada data. Tambahkan data menggunakan formulir di atas.</p>}
function AddStockItemForm({department,onSave,onCancel}) {
  const [name,setName] = useState("");
  const [unit,setUnit] = useState("pcs");
  const [saving,setSaving] = useState(false);
  return <form className="add-item-form" onSubmit={async e=>{e.preventDefault();setSaving(true);const ok=await onSave({department,name,unit});setSaving(false);if(ok){setName("");setUnit("pcs");}}}>
    <div className="add-item-heading"><div><strong>Tambah barang baru</strong><p>Barang akan masuk ke daftar Stok {department} dan bisa langsung dicatat.</p></div><span className="item-department-badge">{department}</span></div>
    <div className="add-item-fields"><Field label="Nama barang"><input autoFocus value={name} onChange={e=>setName(e.target.value)} required maxLength={120} placeholder="Contoh: Tepung beras" /></Field><Field label="Satuan"><input value={unit} onChange={e=>setUnit(e.target.value)} required maxLength={30} placeholder="kg, liter, pcs" /></Field><div className="add-item-actions"><button className="primary" disabled={saving}>{saving ? "Menyimpan..." : "Simpan Barang"}</button><button type="button" className="secondary" onClick={onCancel}>Batal</button></div></div>
  </form>;
}
function StockForm({department,stocks,onSave}) {
  const [f,setF]=useState({entry_date:today(),item_name:"",unit:"",opening:"0",incoming:"0",outgoing:"0",spoiled:"0",notes:""});
  const presets=STOCK_PRESETS[department]||[];
  const findPrevious=(name,date)=>stocks.filter(r=>r.department===department&&r.item_name===name&&r.entry_date<date).sort((a,b)=>b.entry_date.localeCompare(a.entry_date)||String(b.created_at||"").localeCompare(String(a.created_at||"")))[0];
  const previous=findPrevious(f.item_name,f.entry_date);
  const opening=previous?number(previous.closing):0;
  const calculated=Math.max(0,opening+number(f.incoming)-number(f.outgoing)-number(f.spoiled));
  function setItem(name){const item=presets.find(x=>x.name===name);setF(p=>({...p,item_name:name,unit:item?.unit||p.unit}));}
  return <form className="form-grid" onSubmit={e=>{e.preventDefault();onSave({entry_date:f.entry_date,department,item_name:f.item_name,unit:f.unit||"pcs",opening,incoming:number(f.incoming),outgoing:number(f.outgoing),closing:calculated,physical_count:null,spoiled:number(f.spoiled),notes:f.notes});setF(p=>({...p,item_name:"",unit:"",incoming:"0",outgoing:"0",spoiled:"0",notes:""}));}}>
    <Field label="Tanggal"><input type="date" value={f.entry_date} onChange={e=>setF(p=>({...p,entry_date:e.target.value}))} required/></Field>
    <Field label="Nama barang"><input list={`items-${department}`} value={f.item_name} onChange={e=>setItem(e.target.value)} required placeholder="Pilih atau ketik barang"/><datalist id={`items-${department}`}>{presets.map((x,i)=><option key={`${x.name}-${i}`} value={x.name}>{x.unit}</option>)}</datalist></Field>
    <Field label="Satuan"><input value={f.unit} onChange={e=>setF(p=>({...p,unit:e.target.value}))} required placeholder="kg, liter, pcs"/></Field>
    <Field label="Stok awal (otomatis)"><input type="number" value={opening} readOnly/><small className="muted">{previous?`Mengikuti stok akhir ${previous.entry_date}`:"Belum ada catatan sebelumnya; mulai dari 0"}</small></Field>
    <Field label="Barang masuk"><input type="number" min="0" step="any" value={f.incoming} onChange={e=>setF(p=>({...p,incoming:e.target.value}))} required/></Field>
    <Field label="Barang keluar"><input type="number" min="0" step="any" value={f.outgoing} onChange={e=>setF(p=>({...p,outgoing:e.target.value}))} required/></Field>
    <Field label="Spoiled / rusak"><input type="number" min="0" step="any" value={f.spoiled} onChange={e=>setF(p=>({...p,spoiled:e.target.value}))} required/></Field>
    <Field label="Keterangan"><input value={f.notes} onChange={e=>setF(p=>({...p,notes:e.target.value}))} placeholder="Opsional"/></Field>
    <div className="form-end"><div className="calc">Stok akhir otomatis: <strong>{calculated}</strong> <span className="muted">(awal + masuk − keluar − spoiled)</span></div><button className="primary">Simpan stok</button></div>
  </form>;
}
function CashForm({onSave}) {
  const [f,setF]=useState({entry_date:today(),description:"",debit:"0",credit:"0",notes:""});
  const set=(k,v)=>setF(p=>({...p,[k]:v}));
  return <form className="form-grid" onSubmit={e=>{e.preventDefault();onSave({...f,debit:number(f.debit),credit:number(f.credit),notes:f.notes.trim()||null});setF(p=>({...p,description:"",debit:"0",credit:"0",notes:""}));}}>
    <Field label="Tanggal"><input type="date" value={f.entry_date} onChange={e=>set("entry_date",e.target.value)} required/></Field>
    <Field label="Uraian transaksi"><input value={f.description} onChange={e=>set("description",e.target.value)} required placeholder="Contoh: uang modal awal"/></Field>
    <Field label="Debit / uang masuk (Rp)"><input type="number" min="0" value={f.debit} onChange={e=>set("debit",e.target.value)} required/></Field>
    <Field label="Kredit / uang keluar (Rp)"><input type="number" min="0" value={f.credit} onChange={e=>set("credit",e.target.value)} required/></Field>
    <Field label="Keterangan tambahan (opsional)"><input value={f.notes} onChange={e=>set("notes",e.target.value)} placeholder="Contoh: shift pagi, bukti transfer"/></Field>
    <div className="form-end"><div className="calc">Perubahan saldo: <strong>{money(number(f.debit)-number(f.credit))}</strong></div><button className="primary">Simpan transaksi</button></div>
  </form>;
}
function IngredientForm({onSave}) {
  const [f,setF]=useState({name:"",unit:"gram",price_per_unit:"0"});
  const set=(k,v)=>setF(p=>({...p,[k]:v}));
  return <form className="form-grid" onSubmit={e=>{e.preventDefault();onSave({...f,price_per_unit:number(f.price_per_unit)});setF({name:"",unit:"gram",price_per_unit:"0"});}}>
    <Field label="Nama bahan"><input value={f.name} onChange={e=>set("name",e.target.value)} required placeholder="Contoh: Tepung terigu"/></Field>
    <Field label="Satuan dasar"><select value={f.unit} onChange={e=>set("unit",e.target.value)}><option>gram</option><option>ml</option><option>pcs</option><option>kg</option><option>liter</option></select></Field>
    <Field label="Harga per satuan dasar (Rp)"><input type="number" min="0" step="any" value={f.price_per_unit} onChange={e=>set("price_per_unit",e.target.value)} required/></Field>
    <div className="form-end"><p className="muted small-text">Masukkan harga sesuai satuan dasar yang dipilih. Contoh: harga per gram, bukan harga per kilogram.</p><button className="primary">Simpan bahan</button></div>
  </form>;
}
function RecipeForm({onSave}) {
  const [f,setF]=useState({name:"",servings:"1",total_cost:"0"});
  const set=(k,v)=>setF(p=>({...p,[k]:v}));
  return <form className="form-grid" onSubmit={e=>{e.preventDefault();onSave({...f,servings:number(f.servings),total_cost:number(f.total_cost)});setF({name:"",servings:"1",total_cost:"0"});}}>
    <Field label="Nama resep"><input value={f.name} onChange={e=>set("name",e.target.value)} required placeholder="Contoh: Chicken Teriyaki"/></Field>
    <Field label="Jumlah porsi"><input type="number" min="1" value={f.servings} onChange={e=>set("servings",e.target.value)} required/></Field>
    <Field label="Total biaya bahan resep (Rp)"><input type="number" min="0" step="any" value={f.total_cost} onChange={e=>set("total_cost",e.target.value)} required/></Field>
    <div className="form-end"><div className="calc">HPP per porsi: <strong>{money(number(f.total_cost)/Math.max(1,number(f.servings)))}</strong></div><button className="primary">Simpan resep</button></div>
  </form>;
}
function Field({label,children}){return <div className="field"><label>{label}</label>{children}</div>}
function buildStockDisplayRows(department, savedRows, selectedDate=today(), customItems=[]) {
  const presetItems = STOCK_PRESETS[department] || [];
  const custom = customItems.filter(x=>x.department===department).map(x=>({name:x.name,unit:x.unit,masterId:x.id}));
  const seen = new Set();
  const presets = [...presetItems,...custom].filter(item=>{const key=`${item.name.trim().toLocaleLowerCase("id-ID")}__${item.unit.trim().toLocaleLowerCase("id-ID")}`;if(seen.has(key))return false;seen.add(key);return true;});
  const departmentRows = savedRows.filter(r => r.department === department);
  const exactRows = departmentRows.filter(r => r.entry_date === selectedDate);
  const exactByKey = new Map(exactRows.map(r => [`${String(r.item_name||"").trim().toLocaleLowerCase("id-ID")}__${String(r.unit||"").trim().toLocaleLowerCase("id-ID")}`, r]));
  const presetRows = presets.map((item,index) => {
    const key = `${item.name.trim().toLocaleLowerCase("id-ID")}__${item.unit.trim().toLocaleLowerCase("id-ID")}`;
    const exact = exactByKey.get(key);
    if (exact) return exact;
    const previous = departmentRows.filter(r => r.item_name?.trim().toLocaleLowerCase("id-ID") === item.name.trim().toLocaleLowerCase("id-ID") && r.unit?.trim().toLocaleLowerCase("id-ID") === item.unit.trim().toLocaleLowerCase("id-ID") && r.entry_date < selectedDate).sort((a,b)=>b.entry_date.localeCompare(a.entry_date)||String(b.created_at||"").localeCompare(String(a.created_at||"")))[0];
    const opening = previous ? number(previous.closing) : 0;
    return {id:`preset-${department}-${index}`,entry_date:selectedDate,department,item_name:item.name,unit:item.unit,opening,incoming:0,outgoing:0,spoiled:0,closing:opening,notes:"",isPreset:true,previousDate:previous?.entry_date||null};
  });
  const extraSaved = exactRows.filter(r => !presets.some(item => item.name.trim().toLocaleLowerCase("id-ID")===String(r.item_name||"").trim().toLocaleLowerCase("id-ID") && item.unit.trim().toLocaleLowerCase("id-ID")===String(r.unit||"").trim().toLocaleLowerCase("id-ID")));
  return [...presetRows,...extraSaved].sort((a,b)=>String(a.item_name).localeCompare(String(b.item_name),"id-ID"));
}
function StockTable({rows,remove,editable=false,onSave,selectedDate=today()}) {
  const [editingId,setEditingId]=useState(null);
  const [draft,setDraft]=useState({});
  const startEdit=(r)=>{setEditingId(r.id);setDraft({...r,entry_date:selectedDate});};
  const set=(key,value)=>setDraft(p=>({...p,[key]:value}));
  const computed=Math.max(0,number(draft.opening)+number(draft.incoming)-number(draft.outgoing)-number(draft.spoiled));
  async function save(){const ok=await onSave({...draft,entry_date:selectedDate,closing:computed});if(ok){setEditingId(null);setDraft({});}}
  return <div className="table-wrap"><table><thead><tr><th>Tanggal</th><th>Barang</th><th>Satuan</th><th>Stok awal</th><th>Masuk</th><th>Keluar</th><th>Spoiled</th><th>Stok akhir</th><th>Keterangan</th><th>Aksi</th></tr></thead><tbody>{rows.map(r=>{const isEditing=editingId===r.id;const current=isEditing?draft:r;const closing=isEditing?computed:number(r.closing);return <tr key={r.id}><td>{selectedDate}</td><td>{r.item_name}{r.previousDate&&!isEditing&&<small className="muted row-hint">Stok sebelumnya: {r.previousDate}</small>}</td><td>{r.unit}</td><td>{r.opening}</td><td>{isEditing?<input className="table-input" type="number" min="0" step="any" value={current.incoming??0} onChange={e=>set("incoming",e.target.value)}/>:r.incoming}</td><td>{isEditing?<input className="table-input" type="number" min="0" step="any" value={current.outgoing??0} onChange={e=>set("outgoing",e.target.value)}/>:r.outgoing}</td><td>{isEditing?<input className="table-input" type="number" min="0" step="any" value={current.spoiled??0} onChange={e=>set("spoiled",e.target.value)}/>:number(r.spoiled)}</td><td><strong>{closing}</strong></td><td>{isEditing?<input className="table-input notes-input" value={current.notes||""} onChange={e=>set("notes",e.target.value)} placeholder="Keterangan"/>:(r.notes||"—")}</td><td>{isEditing?<div className="row-actions"><button className="primary compact" onClick={save}>Simpan</button><button className="secondary compact" onClick={()=>{setEditingId(null);setDraft({});}}>Batal</button></div>:editable?<button className="primary compact" onClick={()=>startEdit(r)}>Edit</button>:r.isPreset?<span className="muted small-text">Belum dicatat</span>:<button className="danger" onClick={()=>remove("inventory_entries",r.id)}>Hapus</button>}</td></tr>})}</tbody></table>{!rows.length&&<Empty/>}</div>
}
function CashTable({rows,remove}){const ordered=[...rows].sort((a,b)=>a.entry_date.localeCompare(b.entry_date)||String(a.created_at||"").localeCompare(String(b.created_at||"")));let balance=0;const withBalance=ordered.map(r=>{balance+=number(r.debit)-number(r.credit);return {...r,runningBalance:balance}}).reverse();return <div className="table-wrap"><table><thead><tr><th>Tanggal</th><th>Uraian</th><th>Debit</th><th>Kredit</th><th>Saldo</th><th>Keterangan</th><th>Aksi</th></tr></thead><tbody>{withBalance.map(r=><tr key={r.id}><td>{r.entry_date}</td><td>{r.description}</td><td>{money(r.debit)}</td><td>{money(r.credit)}</td><td><strong>{money(r.runningBalance)}</strong></td><td>{r.notes||"—"}</td><td><button className="danger" onClick={()=>remove("cash_entries",r.id)}>Hapus</button></td></tr>)}</tbody></table>{!rows.length&&<Empty/>}</div>}
