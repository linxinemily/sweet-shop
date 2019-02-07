export default function(context) {
  console.log('[middleware]just auth')
  if (!context.store.getters.isAuthenticate) {
    context.redirect('/admin/auth')
  }
}
