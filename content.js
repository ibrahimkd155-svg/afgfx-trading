
const CATS = {
  "analysis": {title:"Market Analysis", sub:"Structured market views, scenarios and key levels."},
  "education": {title:"Trading Education", sub:"Build your process with risk-aware learning."},
  "insights": {title:"Market Insights", sub:"Focused observations on market themes and events."},
  "community": {title:"Trading Community", sub:"A place for market-minded people to learn and connect."}
};
const cat = document.body.dataset.category;
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
async function getClient(){
  if(!window.supabase || !window.AFGFX_SUPABASE_URL || !window.AFGFX_SUPABASE_PUBLISHABLE_KEY) throw new Error("Supabase config not loaded.");
  return window.supabase.createClient(window.AFGFX_SUPABASE_URL, window.AFGFX_SUPABASE_PUBLISHABLE_KEY);
}
async function loadPosts(){
  const target=document.querySelector("#posts");
  try{
    const sb=await getClient();
    let q=sb.from("posts").select("*").eq("status","published").order("created_at",{ascending:false});
    if(cat!=="all") q=q.eq("category",cat);
    const {data,error}=await q;
    if(error) throw error;
    if(!data || !data.length){target.innerHTML='<p class="muted">No published posts yet. New content will appear here after the admin publishes it.</p>';return;}
    target.innerHTML=data.map(p=>`<article class="post"><span class="tag">${esc((p.category||"").toUpperCase())}</span><h3>${esc(p.title)}</h3><p>${esc(p.body||"").replace(/\n/g,"<br>")}</p>${p.image_url?`<img src="${esc(p.image_url)}" alt="">`:""}<div class="muted">${p.created_at?new Date(p.created_at).toLocaleDateString():""}</div></article>`).join("");
  }catch(e){target.innerHTML='<p class="muted">Could not load posts. Check the Supabase configuration and database policies.</p>';console.error(e);}
}
if(document.querySelector("#posts")) loadPosts();
