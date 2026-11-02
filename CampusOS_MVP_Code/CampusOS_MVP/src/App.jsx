import React, { useEffect, useMemo, useState } from "react";
import {
  LayoutDashboard, BriefcaseBusiness, ShoppingBag, Building2, ShieldCheck,
  Search, Plus, Bell, GraduationCap, MapPin, CalendarDays, ArrowUpRight,
  Clock3, CheckCircle2, XCircle, Menu, X, Trash2, Package, Users, TrendingUp
} from "lucide-react";

const initialJobs = [
  { id: 1, title: "Frontend Developer Intern", company: "PixelCraft Technologies", type: "Internship", location: "Remote", stipend: "₹8,000/month", deadline: "20 Nov 2026", category: "Technology", description: "Work with a product team to build responsive web interfaces using React." },
  { id: 2, title: "Campus Marketing Associate", company: "BrightPath", type: "Part-time", location: "Palakkad", stipend: "₹5,000/month", deadline: "24 Nov 2026", category: "Marketing", description: "Coordinate campus campaigns, create content, and support student outreach." },
  { id: 3, title: "Python Developer Intern", company: "CodeNest Labs", type: "Internship", location: "Hybrid", stipend: "₹10,000/month", deadline: "28 Nov 2026", category: "Technology", description: "Assist in developing Python tools and testing APIs with the engineering team." }
];
const initialItems = [
  { id: 1, name: "Engineering Drawing Kit", category: "Study Materials", price: "₹250", condition: "Good", owner: "Ananya • S5 CSE", mode: "Sell" },
  { id: 2, name: "Scientific Calculator", category: "Electronics", price: "₹450", condition: "Like new", owner: "Rahul • S3 ECE", mode: "Sell" },
  { id: 3, name: "DSA Textbook", category: "Books", price: "₹180", condition: "Used", owner: "Meera • S7 CSE", mode: "Lend" }
];
const seedApplications = [
  { id: 1, jobId: 1, student: "Aarav Nair", course: "S5 CSE", status: "Pending" },
  { id: 2, jobId: 2, student: "Diya Menon", course: "S3 ECE", status: "Accepted" }
];

function readStore(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch { return fallback; }
}

export default function App() {
  const [role, setRole] = useState("Student");
  const [page, setPage] = useState("Overview");
  const [jobs, setJobs] = useState(() => readStore("campusos_jobs", initialJobs));
  const [items, setItems] = useState(() => readStore("campusos_items", initialItems));
  const [applications, setApplications] = useState(() => readStore("campusos_apps", seedApplications));
  const [search, setSearch] = useState("");
  const [showJobForm, setShowJobForm] = useState(false);
  const [showItemForm, setShowItemForm] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => localStorage.setItem("campusos_jobs", JSON.stringify(jobs)), [jobs]);
  useEffect(() => localStorage.setItem("campusos_items", JSON.stringify(items)), [items]);
  useEffect(() => localStorage.setItem("campusos_apps", JSON.stringify(applications)), [applications]);

  const navItems = useMemo(() => {
    const common = [{ label: "Overview", icon: LayoutDashboard }];
    if (role === "Student") return [...common, { label: "Opportunities", icon: BriefcaseBusiness }, { label: "Marketplace", icon: ShoppingBag }, { label: "My Applications", icon: CheckCircle2 }];
    if (role === "Company") return [...common, { label: "My Listings", icon: BriefcaseBusiness }, { label: "Applications", icon: Users }];
    return [...common, { label: "Manage Opportunities", icon: BriefcaseBusiness }, { label: "Marketplace", icon: ShoppingBag }, { label: "Users & Activity", icon: ShieldCheck }];
  }, [role]);

  function changeRole(next) { setRole(next); setPage("Overview"); setMobileOpen(false); }
  function notify(message) { setNotice(message); window.setTimeout(() => setNotice(""), 2800); }
  function apply(job) {
    if (applications.some(a => a.jobId === job.id && a.student === "Demo Student")) return notify("You have already applied to this opportunity.");
    setApplications(prev => [{ id: Date.now(), jobId: job.id, student: "Demo Student", course: "S5 CSE", status: "Pending" }, ...prev]);
    notify("Application submitted successfully!");
  }
  function updateStatus(id, status) {
    setApplications(prev => prev.map(a => a.id === id ? { ...a, status } : a));
    notify(`Application marked ${status.toLowerCase()}.`);
  }
  function addJob(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setJobs(prev => [{ id: Date.now(), title: data.get("title"), company: data.get("company") || "CampusOS Demo Company", type: data.get("type"), location: data.get("location"), stipend: data.get("stipend"), deadline: data.get("deadline"), category: data.get("category"), description: data.get("description") }, ...prev]);
    setShowJobForm(false); notify("Opportunity published!");
  }
  function addItem(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setItems(prev => [{ id: Date.now(), name: data.get("name"), category: data.get("category"), price: data.get("price"), condition: data.get("condition"), owner: "Demo Student • S5 CSE", mode: data.get("mode") }, ...prev]);
    setShowItemForm(false); notify("Marketplace item added!");
  }

  const filteredJobs = jobs.filter(j => `${j.title} ${j.company} ${j.category}`.toLowerCase().includes(search.toLowerCase()));
  const filteredItems = items.filter(i => `${i.name} ${i.category}`.toLowerCase().includes(search.toLowerCase()));
  const currentTitle = page === "Overview" ? `${role} Dashboard` : page;

  return <div className="app-shell">
    <aside className={`sidebar ${mobileOpen ? "mobile-visible" : ""}`}>
      <div className="brand"><div className="brand-mark"><GraduationCap size={23}/></div><div><b>CampusOS</b><small>Campus, connected.</small></div><button className="mobile-close" onClick={() => setMobileOpen(false)}><X/></button></div>
      <div className="workspace-label">WORKSPACE</div>
      <nav>{navItems.map(({label, icon: Icon}) => <button key={label} className={`nav-link ${page === label ? "active" : ""}`} onClick={() => {setPage(label);setMobileOpen(false);setSearch("");}}><Icon size={18}/><span>{label}</span></button>)}</nav>
      <div className="sidebar-bottom"><div className="help-card"><div className="help-icon">✦</div><b>Your campus, one place.</b><p>Discover opportunities and connect with your college community.</p></div><div className="profile"><div className="avatar">DS</div><div><b>{role === "Student" ? "Demo Student" : role === "Company" ? "Demo Company" : "Campus Admin"}</b><small>{role} account</small></div><span className="online-dot"/></div></div>
    </aside>
    {mobileOpen && <div className="scrim" onClick={() => setMobileOpen(false)}/>}
    <main className="main-area">
      <header className="topbar"><div className="top-left"><button className="menu-btn" onClick={() => setMobileOpen(true)}><Menu/></button><div><div className="eyebrow">CAMPUSOS / {role.toUpperCase()}</div><h1>{currentTitle}</h1></div></div><div className="top-actions"><label className="role-select"><span>Preview as</span><select value={role} onChange={e => changeRole(e.target.value)}><option>Student</option><option>Company</option><option>Admin</option></select></label><button className="icon-btn" title="Notifications" onClick={() => notify("You’re all caught up!") }><Bell size={19}/><i/></button><div className="top-avatar">{role === "Student" ? "DS" : role === "Company" ? "DC" : "CA"}</div></div></header>
      <div className="content">
        {page === "Overview" && <Overview role={role} jobs={jobs} items={items} applications={applications} setPage={setPage} />}
        {(page === "Opportunities" || page === "My Listings" || page === "Manage Opportunities") && <section>
          <div className="section-heading"><div><h2>{role === "Student" ? "Explore opportunities" : role === "Company" ? "Your opportunities" : "Opportunity management"}</h2><p>{role === "Student" ? "Find internships and part-time roles that match your interests." : "Create and manage opportunities for students."}</p></div>{role !== "Student" && <button className="primary-btn" onClick={() => setShowJobForm(true)}><Plus size={17}/> Post opportunity</button>}</div>
          <div className="toolbar"><div className="search-box"><Search size={17}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search roles, companies or categories..."/></div><span className="results-count">{filteredJobs.length} opportunities</span></div>
          <div className="job-grid">{filteredJobs.map(job => <JobCard key={job.id} job={job} role={role} applied={applications.some(a => a.jobId === job.id && a.student === "Demo Student")} onApply={() => apply(job)} onDelete={() => {setJobs(prev => prev.filter(j => j.id !== job.id));notify("Listing removed.");}} />)}</div>
        </section>}
        {page === "Marketplace" && <section><div className="section-heading"><div><h2>Student marketplace</h2><p>Buy, sell, or lend useful items within your campus.</p></div><button className="primary-btn" onClick={() => setShowItemForm(true)}><Plus size={17}/> List an item</button></div><div className="toolbar"><div className="search-box"><Search size={17}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search items or categories..."/></div><span className="results-count">{filteredItems.length} items</span></div><div className="market-grid">{filteredItems.map(item => <div className="market-card" key={item.id}><div className="item-art"><Package size={34}/><span>{item.category}</span></div><div className="market-info"><div className="market-top"><span className="pill blue">{item.mode}</span><b>{item.price}</b></div><h3>{item.name}</h3><p>{item.condition} condition · {item.owner}</p><button className="outline-btn full" onClick={() => notify(`Demo contact: ${item.owner}. Add real messaging in the next phase.`)}>View contact <ArrowUpRight size={15}/></button></div></div>)}</div></section>}
        {page === "My Applications" && <section><div className="section-heading"><div><h2>My applications</h2><p>Track the status of opportunities you have applied for.</p></div></div><ApplicationsTable applications={applications.filter(a => a.student === "Demo Student")} jobs={jobs}/></section>}
        {page === "Applications" && <section><div className="section-heading"><div><h2>Received applications</h2><p>Review applicants and update their application status.</p></div></div><ApplicationsTable applications={applications} jobs={jobs} admin={role === "Admin"} onStatus={updateStatus}/></section>}
        {page === "Users & Activity" && <section><div className="section-heading"><div><h2>Platform activity</h2><p>A quick overview of CampusOS demo data.</p></div></div><div className="stats-grid"><Stat icon={Users} label="Demo users" value="128" note="Sample platform data"/><Stat icon={BriefcaseBusiness} label="Opportunities" value={jobs.length} note="Current listings"/><Stat icon={ShoppingBag} label="Marketplace items" value={items.length} note="Current listings"/><Stat icon={TrendingUp} label="Applications" value={applications.length} note="Across opportunities"/></div><div className="panel"><h3>Admin actions</h3><p className="muted">Manage content using the navigation. This MVP uses browser-local demo data.</p><button className="outline-btn" onClick={() => {if(confirm("Reset all CampusOS demo data?")) {localStorage.clear();location.reload();}}}><Trash2 size={16}/> Reset demo data</button></div></section>}
      </div>
      <footer>© 2026 CampusOS <span>Built for a more connected campus.</span><span className="demo-label">MVP DEMO</span></footer>
    </main>
    {showJobForm && <Modal title="Post an opportunity" onClose={() => setShowJobForm(false)}><form onSubmit={addJob} className="form-grid"><Field label="Opportunity title" name="title" placeholder="e.g. UI/UX Design Intern" required/><Field label="Company name" name="company" placeholder="Company or organization"/><label>Type<select name="type"><option>Internship</option><option>Part-time</option></select></label><Field label="Location" name="location" placeholder="Remote / Palakkad"/><Field label="Stipend / pay" name="stipend" placeholder="e.g. ₹8,000/month"/><Field label="Application deadline" name="deadline" type="text" placeholder="e.g. 30 Nov 2026"/><label>Category<select name="category"><option>Technology</option><option>Marketing</option><option>Design</option><option>Other</option></select></label><label className="wide">Description<textarea name="description" placeholder="Describe the role and eligibility..." required/></label><button className="primary-btn wide" type="submit">Publish opportunity</button></form></Modal>}
    {showItemForm && <Modal title="List an item" onClose={() => setShowItemForm(false)}><form onSubmit={addItem} className="form-grid"><Field label="Item name" name="name" placeholder="e.g. Engineering textbook" required/><Field label="Price" name="price" placeholder="e.g. ₹300" required/><label>Category<select name="category"><option>Books</option><option>Study Materials</option><option>Electronics</option><option>Other</option></select></label><label>Condition<select name="condition"><option>Like new</option><option>Good</option><option>Used</option></select></label><label>Listing type<select name="mode"><option>Sell</option><option>Lend</option><option>Exchange</option></select></label><button className="primary-btn wide" type="submit">Add listing</button></form></Modal>}
    {notice && <div className="toast"><CheckCircle2 size={18}/>{notice}</div>}
  </div>;
}

function Overview({role,jobs,items,applications,setPage}) {
  const isStudent = role === "Student";
  const myApps = applications.filter(a => a.student === "Demo Student");
  return <><div className="welcome-banner"><div><div className="banner-tag">YOUR CAMPUS, CONNECTED</div><h2>{isStudent ? "Make the most of your campus journey." : role === "Company" ? "Connect with the next generation of talent." : "A clearer view of your campus ecosystem."}</h2><p>{isStudent ? "Explore opportunities, discover useful resources, and take your next step." : role === "Company" ? "Share opportunities and discover motivated student applicants." : "Monitor opportunities, marketplace listings, and student activity."}</p><button className="banner-btn" onClick={() => setPage(isStudent ? "Opportunities" : role === "Company" ? "My Listings" : "Manage Opportunities")}>{isStudent ? "Explore opportunities" : "Manage opportunities"} <ArrowUpRight size={16}/></button></div><div className="banner-art"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="cap-circle"><GraduationCap size={58}/></div><span className="float-chip chip-a">✦ Learn</span><span className="float-chip chip-b">↗ Grow</span></div></div>
    <div className="stats-grid"><Stat icon={BriefcaseBusiness} label="Active opportunities" value={jobs.length} note="Internships and part-time roles"/><Stat icon={ShoppingBag} label="Marketplace listings" value={items.length} note="Items shared by students"/><Stat icon={CheckCircle2} label={isStudent ? "Your applications" : "Applications received"} value={isStudent ? myApps.length : applications.length} note="Track application progress"/><Stat icon={Users} label="Campus community" value="128+" note="Demo student accounts"/></div>
    <div className="overview-bottom"><div className="panel"><div className="panel-head"><div><h3>{isStudent ? "Recent opportunities" : "Recent activity"}</h3><p>Latest updates from CampusOS</p></div><button className="text-btn" onClick={() => setPage(isStudent ? "Opportunities" : "Applications")}>View all <ArrowUpRight size={15}/></button></div>{jobs.slice(0,3).map(j=><div className="mini-job" key={j.id}><div className="company-logo">{j.company.slice(0,1).toUpperCase()}</div><div className="mini-job-main"><b>{j.title}</b><small>{j.company} · {j.type}</small></div><span className="mini-location">{j.location}</span></div>)}</div><div className="panel quick-panel"><h3>Quick access</h3><p>Jump into the most-used areas.</p><button onClick={() => setPage(isStudent ? "Marketplace" : "Manage Opportunities")}><span className="quick-icon purple"><ShoppingBag size={17}/></span><span><b>{isStudent ? "Browse marketplace" : "Manage listings"}</b><small>{isStudent ? "Find books, tools and more" : "Create or update opportunities"}</small></span><ArrowUpRight size={16}/></button><button onClick={() => setPage(isStudent ? "My Applications" : "Applications")}><span className="quick-icon orange"><CheckCircle2 size={17}/></span><span><b>{isStudent ? "Track applications" : "Review applications"}</b><small>{isStudent ? "Check your application status" : "See interested students"}</small></span><ArrowUpRight size={16}/></button></div></div>
  </>;
}
function Stat({icon:Icon,label,value,note}) { return <div className="stat-card"><div className="stat-top"><span>{label}</span><div className="stat-icon"><Icon size={18}/></div></div><strong>{value}</strong><small>{note}</small></div>; }
function JobCard({job,role,applied,onApply,onDelete}) { return <article className="job-card"><div className="job-card-top"><div className="company-logo large">{job.company.slice(0,1).toUpperCase()}</div><span className="pill">{job.type}</span></div><h3>{job.title}</h3><div className="company-name">{job.company}</div><p className="job-description">{job.description}</p><div className="job-meta"><span><MapPin size={14}/>{job.location}</span><span><CalendarDays size={14}/>{job.deadline}</span></div><div className="job-bottom"><b>{job.stipend}</b>{role === "Student" ? <button className={applied ? "applied-btn" : "small-primary"} disabled={applied} onClick={onApply}>{applied ? "Applied ✓" : "Apply now"}</button> : <button className="icon-delete" onClick={onDelete} title="Remove listing"><Trash2 size={16}/></button>}</div></article>; }
function ApplicationsTable({applications,jobs,admin,onStatus}) { return <div className="table-wrap"><table><thead><tr><th>Applicant</th><th>Opportunity</th><th>Course</th><th>Status</th>{admin && <th>Update</th>}</tr></thead><tbody>{applications.length ? applications.map(a=><tr key={a.id}><td><b>{a.student}</b></td><td>{jobs.find(j=>j.id===a.jobId)?.title || "Opportunity removed"}</td><td>{a.course}</td><td><span className={`status ${a.status.toLowerCase()}`}>{a.status}</span></td>{admin && <td><select value={a.status} onChange={e=>onStatus(a.id,e.target.value)}><option>Pending</option><option>Accepted</option><option>Rejected</option></select></td>}</tr>) : <tr><td colSpan={admin?5:4} className="empty-cell">No applications yet. Explore opportunities and apply to get started.</td></tr>}</tbody></table></div>; }
function Field({label,name,placeholder,type="text",required}) { return <label>{label}<input name={name} type={type} placeholder={placeholder} required={required}/></label>; }
function Modal({title,onClose,children}) { return <div className="modal-backdrop" onMouseDown={onClose}><div className="modal" onMouseDown={e=>e.stopPropagation()}><div className="modal-head"><h2>{title}</h2><button className="icon-btn" onClick={onClose}><X size={19}/></button></div>{children}</div></div>; }
