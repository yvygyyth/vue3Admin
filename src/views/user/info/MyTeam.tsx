import useLoading from '@/hooks/loading'
import { Avatar, Card, Grid, List, Skeleton } from '@arco-design/web-vue'
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  name: 'MyTeam',
  setup() {
    const { t } = useI18n()
    const fillList: unknown[] = new Array(4).fill(undefined)
    const { loading } = useLoading(true)

    return () => (
      <Card class="general-card" title={t('userInfo.tab.title.team')}>
        <List bordered={false}>
          {loading.value
            && fillList.map(() => (
                <Skeleton loading={loading.value} animation>
                  <Grid.Row gutter={6}>
                    <Grid.Col span={18}>
                      <Skeleton.Shape shape="circle"></Skeleton.Shape>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Skeleton.Line widths={['100%', '40%']} rows={2}></Skeleton.Line>
                    </Grid.Col>
                  </Grid.Row>
                </Skeleton>
              ))
            }
        </List>
      </Card>
    )
  }
})
