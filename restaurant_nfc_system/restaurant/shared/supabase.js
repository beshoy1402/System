// ═══════════════════════════════════════════════════
//  SUPABASE CONFIGURATION
// ═══════════════════════════════════════════════════
const SUPABASE_URL = 'https://ddjmhwjefduddcocapgz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRkam1od2plZmR1ZGRjb2NhcGd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY3MTUzNjksImV4cCI6MjA5MjI5MTM2OX0.ZMQzOT9D6_Lfo62oLnOBLtxXmZpM6jbZVSse8nOwU58';

// Init Supabase client (loaded via CDN)
let _sb = null;
function getSB() {
  if (!_sb) _sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  return _sb;
}

// ═══════════════════════════════════════════════════
//  API LAYER
// ═══════════════════════════════════════════════════
const DB = {

  // ── MENU ──────────────────────────────────────────
  async getMenuItems(categoryId = null) {
    let q = getSB()
      .from('menu_items')
      .select('*, categories(name, name_ar, icon)')
      .order('sort_order', { ascending: true });
    if (categoryId) q = q.eq('category_id', categoryId);
    const { data, error } = await q;
    if (error) throw error;
    return data;
  },

  async getCategories() {
    const { data, error } = await getSB()
      .from('categories')
      .select('*')
      .order('sort_order');
    if (error) throw error;
    return data;
  },

  async upsertMenuItem(item) {
    const { data, error } = await getSB()
      .from('menu_items')
      .upsert(item)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async deleteMenuItem(id) {
    const { error } = await getSB()
      .from('menu_items')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },

  async toggleMenuItemAvailability(id, available) {
    const { error } = await getSB()
      .from('menu_items')
      .update({ available })
      .eq('id', id);
    if (error) throw error;
  },

  // ── ORDERS ─────────────────────────────────────────
  async insertOrder(order) {
    const { data, error } = await getSB()
      .from('orders')
      .insert(order)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async getOrders(limit = 100) {
    const { data, error } = await getSB()
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);
    if (error) throw error;
    return data;
  },

  async updateOrderStatus(id, status) {
    const { error } = await getSB()
      .from('orders')
      .update({ status })
      .eq('id', id);
    if (error) throw error;
  },

  async getOrderById(id) {
    const { data, error } = await getSB()
      .from('orders')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  // ── SETTINGS ───────────────────────────────────────
  async getSettings() {
    const { data, error } = await getSB()
      .from('restaurant_settings')
      .select('*');
    if (error) throw error;
    const map = {};
    data.forEach(r => map[r.key] = r.value);
    return map;
  },

  async updateSetting(key, value) {
    const { error } = await getSB()
      .from('restaurant_settings')
      .upsert({ key, value }, { onConflict: 'key' });
    if (error) throw error;
  },

  // ── COUPONS ────────────────────────────────────────
  async validateCoupon(code) {
    const { data, error } = await getSB()
      .from('coupons')
      .select('*')
      .eq('code', code.toUpperCase())
      .eq('active', true)
      .single();
    if (error) return null;
    if (data.max_uses && data.uses >= data.max_uses) return null;
    if (data.expires_at && new Date(data.expires_at) < new Date()) return null;
    return data;
  },

  async incrementCouponUse(id) {
    await getSB().rpc('increment_coupon_use', { coupon_id: id }).catch(() => {});
  },

  // ── AUTH ───────────────────────────────────────────
  async signIn(email, password) {
    const { data, error } = await getSB().auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  },

  async signOut() {
    await getSB().auth.signOut();
  },

  async getSession() {
    const { data } = await getSB().auth.getSession();
    return data.session;
  },

  // ── REALTIME ───────────────────────────────────────
  subscribeToOrders(callback) {
    return getSB()
      .channel('orders-channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, callback)
      .subscribe();
  },

  subscribeToMenu(callback) {
    return getSB()
      .channel('menu-channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'menu_items' }, callback)
      .subscribe();
  },

  unsubscribe(channel) {
    getSB().removeChannel(channel);
  }
};

// Export for use in other scripts
window.DB = DB;
window.getSB = getSB;
