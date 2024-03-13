export default ({ router }) => {
  router.beforeEach((to, from, next) => {
    if (to.path === '/') {
      return next('/guide/intro')
    }
    next()
  })
}