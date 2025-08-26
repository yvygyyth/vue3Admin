
import useLoading from '@/hooks/loading'
import { Card, Grid, Link, List, Skeleton } from '@arco-design/web-vue'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'LatestActivities', 
  setup() {
    const { t } = useI18n()
    const { loading } = useLoading(true)
    const fillList = new Array(7).fill(undefined)

    return () => (
      <Card class="general-card" title={t('userInfo.title.latestActivity')}>
        {{
          extra: () => <Link>{t('userInfo.viewAll')}</Link>,
          default: () => (
            <List bordered={false}>
              {loading.value
              && fillList.map(() => (
                    <Skeleton loading={loading.value} animation class="mb-4">
                      <Grid.Row gutter={6}>
                        <Grid.Col span={2}>
                          <Skeleton.Shape shape="circle"></Skeleton.Shape>
                        </Grid.Col>
                        <Grid.Col span={22}>
                          <Skeleton.Line widths={['40%', '100%']} rows={2}></Skeleton.Line>
                        </Grid.Col>
                      </Grid.Row>
                    </Skeleton>
                  ))
               }
            </List>
          )
        }}
      </Card>
    )
  }
})
