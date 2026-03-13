import { useState } from "react";

const defaultUsers = [
  { id: 1, name: "Raj Verma", email: "raj@gmail.com", password: "123456", age: 20, gender: "Male", terms: true },
  { id: 2, name: "Aparna Sen", email: "aparna@gmail.com", password: "123456", age: 21, gender: "Female", terms: false },
  { id: 3, name: "Soma Dey", email: "soma@gmail.com", password: "123456", age: 22, gender: "Female", terms: true },
];

function getColor(name) {
  const c = { "Raj Verma": "#6c63ff", "Aparna Sen": "#4f8ef7", "Soma Dey": "#5b8dee" };
  const fallback = ["#6c63ff","#4f8ef7","#5b8dee","#06b6d4","#10b981","#f59e0b","#ef4444","#ec4899"];
  return c[name] || fallback[name.charCodeAt(0) % fallback.length];
}

function getInitials(name) {
  return name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
}

export default function App() {

  const [users, setUsers] = useState(defaultUsers);
  const [form, setForm] = useState({ name:"", email:"", password:"", age:"", gender:"Male", terms:false });
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    const {name,value,type,checked} = e.target;
    setForm({...form,[name]: type==="checkbox"?checked:value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if(editId){
      setUsers(users.map(u=>u.id===editId?{...form,id:editId}:u));
      setEditId(null);
    }else{
      setUsers([...users,{...form,id:Date.now()}]);
    }

    setForm({ name:"", email:"", password:"", age:"", gender:"Male", terms:false });
  };

  const handleEdit = (user)=>{ setForm(user); setEditId(user.id); };
  const handleDelete = (id)=> setUsers(users.filter(u=>u.id!==id));

  const total = users.length;
  const male = users.filter(u=>u.gender==="Male").length;
  const female = users.filter(u=>u.gender==="Female").length;
  const agreed = users.filter(u=>u.terms).length;

  return (

<div className="app-wrapper">

<style>{`

*{box-sizing:border-box;margin:0;padding:0}

.app-wrapper{
min-height:100vh;
width:100%;
background:#07090f;
display:flex;
align-items:center;
justify-content:center;
padding:15px;
font-family:'Segoe UI',Arial;
}

.shell{
width:100%;
max-width:1500px;
height:100%;
background: radial-gradient(ellipse at 60% 40%, #12183a 0%, #0a0c14 60%, #080a10 100%);
border-radius:28px;
border:1px solid #1e2238;
box-shadow:0 0 0 6px #0d0f1a;
padding:20px;
display:flex;
flex-direction:column;
overflow:hidden;
}

.header{
display:flex;
justify-content:space-between;
align-items:center;
margin-bottom:15px;
flex-wrap:wrap;
gap:10px;
}

.title{
display:flex;
align-items:center;
gap:12px;
}

.grid{
display:grid;
grid-template-columns:300px 1fr;
gap:14px;
flex:1;
min-height:0;
}

.inner-card{
background:#10131e;
border:1px solid #1e2238;
border-radius:14px;
padding:16px;
display:flex;
flex-direction:column;
}

.section-head{
display:flex;
align-items:center;
gap:10px;
margin-bottom:12px;
}

.section-icon{
width:28px;
height:28px;
background:#1c2348;
border-radius:8px;
display:flex;
align-items:center;
justify-content:center;
}

.section-title{
font-size:14px;
font-weight:700;
}

.field{margin-bottom:10px}

.field-label{
font-size:10px;
color:#4a5272;
font-weight:700;
margin-bottom:4px;
display:block;
}

.inp{
width:100%;
background:#181c2e;
border:1px solid #232740;
border-radius:8px;
padding:8px;
color:#c8d0e8;
font-size:13px;
}

.radio-group{
display:flex;
gap:6px;
flex-wrap:wrap;
}

.radio-label{
background:#181c2e;
border:1px solid #232740;
padding:6px 10px;
border-radius:8px;
font-size:12px;
display:flex;
align-items:center;
gap:4px;
}

.save-btn{
width:100%;
margin-top:10px;
padding:10px;
border:none;
border-radius:9px;
color:white;
font-weight:700;
background:linear-gradient(90deg,#3b5bdb,#6c63ff);
cursor:pointer;
}

.table-wrap{
flex:1;
overflow:auto;
}

table{
width:100%;
border-collapse:collapse;
font-size:13px;
min-width:650px;
}

th{
text-align:left;
padding:8px;
font-size:10px;
color:#3a4260;
border-bottom:1px solid #181c2e;
}

td{
padding:9px;
border-bottom:1px solid #161928;
}

.badge-male{background:#12203e;color:#60a5fa;padding:3px 10px;border-radius:20px;font-size:11px}
.badge-female{background:#22103a;color:#c084fc;padding:3px 10px;border-radius:20px;font-size:11px}
.badge-other{background:#0e2420;color:#34d399;padding:3px 10px;border-radius:20px;font-size:11px}

.edit-btn{
background:#1c2348;
color:#7090ff;
border:1px solid #2a3468;
padding:5px 10px;
border-radius:7px;
font-size:11px;
cursor:pointer;
}

.del-btn{
background:#22100e;
color:#ef4444;
border:1px solid #3a1c18;
padding:5px 8px;
border-radius:7px;
font-size:11px;
cursor:pointer;
margin-left:4px;
}

/* RESPONSIVE BREAKPOINTS */

@media(max-width:1100px){
.grid{
grid-template-columns:260px 1fr;
}
}

@media(max-width:900px){
.grid{
grid-template-columns:1fr;
}
}

@media(max-width:600px){

.shell{
padding:14px;
border-radius:18px;
}

.title h1{
font-size:18px;
}

table{
font-size:12px;
}

}

`}</style>

<div className="shell">

{/* HEADER */}

<div className="header">

<div className="title">
<div style={{width:40,height:40,borderRadius:"50%",background:"linear-gradient(135deg,#4f6ef7,#6c63ff)",display:"flex",alignItems:"center",justifyContent:"center"}}>👤</div>
<h1 style={{color:"#fff"}}>User <span style={{color:"#4f72ff"}}>Management</span></h1>
</div>

<div style={{background:"#10131e",border:"1px solid #20243c",borderRadius:"20px",padding:"6px 16px"}}>
{total} Users
</div>

</div>

{/* GRID */}

<div className="grid">

{/* FORM */}

<div className="inner-card">

<div className="section-head">
<div className="section-icon">✏️</div>
<div className="section-title">Add User</div>
</div>

<form onSubmit={handleSubmit}>

<div className="field">
<label className="field-label">NAME</label>
<input className="inp" name="name" value={form.name} onChange={handleChange}/>
</div>

<div className="field">
<label className="field-label">EMAIL</label>
<input className="inp" name="email" value={form.email} onChange={handleChange}/>
</div>

<div className="field">
<label className="field-label">PASSWORD</label>
<input type="password" className="inp" name="password" value={form.password} onChange={handleChange}/>
</div>

<div className="field">
<label className="field-label">AGE</label>
<input className="inp" name="age" value={form.age} onChange={handleChange}/>
</div>

<div className="field">
<label className="field-label">GENDER</label>

<div className="radio-group">
{["Male","Female","Other"].map(g=>(
<label key={g} className="radio-label">
<input type="radio" name="gender" value={g} checked={form.gender===g} onChange={handleChange}/>
{g}
</label>
))}
</div>

</div>

<div style={{marginTop:"8px"}}>
<label style={{fontSize:"12px"}}>
<input type="checkbox" name="terms" checked={form.terms} onChange={handleChange}/> Accept Terms
</label>
</div>

<button className="save-btn">
{editId ? "Update User" : "Save User"}
</button>

</form>

</div>

{/* TABLE */}

<div className="inner-card">

<div className="section-head">
<div className="section-icon">📋</div>
<div className="section-title">All Users</div>
</div>

<div className="table-wrap">

<table>

<thead>
<tr>
<th>#</th>
<th>Name</th>
<th>Email</th>
<th>Password</th>
<th>Age</th>
<th>Gender</th>
<th>Actions</th>
</tr>
</thead>

<tbody>

{users.map((u,i)=>(

<tr key={u.id}>

<td>{i+1}</td>

<td style={{display:"flex",alignItems:"center",gap:"8px"}}>
<div style={{width:30,height:30,borderRadius:"50%",background:getColor(u.name),display:"flex",alignItems:"center",justifyContent:"center",fontSize:"11px",color:"#fff"}}>
{getInitials(u.name)}
</div>
{u.name}
</td>

<td>{u.email}</td>

<td>••••••</td>

<td>{u.age}</td>

<td>
<span className={u.gender==="Male"?"badge-male":u.gender==="Female"?"badge-female":"badge-other"}>
{u.gender}
</span>
</td>

<td>
<button className="edit-btn" onClick={()=>handleEdit(u)}>Edit</button>
<button className="del-btn" onClick={()=>handleDelete(u.id)}>🗑</button>
</td>

</tr>

))}

</tbody>
</table>

</div>

</div>

</div>

</div>
</div>
);
}