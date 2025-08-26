import { useAppStore } from '@/store'
import { layoutStyleConfig } from '@/types/constants'
import { Layout } from '@arco-design/web-vue'
import { computed, defineComponent } from 'vue'
import BreadcrumbComponent from './BreadcrumbComponent'
import FooterComponent from './FooterComponent'
import MenuComponent from './MenuComponent'
import Navbar from './Navbar'
import PageComponent from './PageComponent'
import TabBar from './TabBar'
import styles from './style.module.scss'
import AppSetting from './AppSetting'
export default defineComponent({
  name: 'LayoutComponent',
  setup() {
    const appStore = useAppStore()
    const paddingStyle = computed(() => {
      const paddingLeft = appStore.menu ? { paddingLeft: `${siderWidth.value}px` } : {}
      const paddingTop = appStore.navbar
        ? { paddingTop: layoutStyleConfig.navbarHeight + 'px' }
        : {}

      return { ...paddingLeft, ...paddingTop }
    })
    const siderWidth = computed(() => {
      return appStore.menuCollapse ? 48 : appStore.menuWidth
    })

    return () => {
      return (
        <>
          <Layout>
            {appStore.navbar && <Navbar />}
            <Layout>
              {appStore.menu && (
                <Layout.Sider
                  class={[styles.sider]}
                  style={{
                    paddingTop: paddingStyle.value.paddingTop
                  }}
                  width={siderWidth.value}
                  breakpoint="xl"
                  collapsible
                  hideTrigger
                  collapsed={appStore.menuCollapse}
                  onCollapse={(val) => (appStore.menuCollapse = val)}
                >
                  <MenuComponent></MenuComponent>
                </Layout.Sider>
              )}
              <Layout class={[styles.main]} style={paddingStyle.value}>
                <TabBar />
                <BreadcrumbComponent class={['px-5']} />
                <Layout.Content>
                  <PageComponent class={['px-5']} />
                </Layout.Content>
                <FooterComponent />
              </Layout>
            </Layout>
          </Layout>
          <AppSetting />
        </>
      )
    }
  }
})
